
var sha1 = require('sha1');
var moment = require("moment");

var config = require("./config.js");

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: config.pg.host,
    port: config.pg.port,
    user: config.pg.user,
    password: config.pg.password,
    database: config.pg.database,
  },
});

var sql = {};

sql.query = function (table) {
    return knex(table);
};

sql.run = function (query, next) {
    query
        .then(function(rows) {
            try {
                return next(true, rows, null);
            } catch (error) {
                console.log("Exception:", "" + error);
                return next(false, null, "Exception occured");
            }
        })
        .catch(function(error) {
            console.log("Database error:", "" + error);
            return next(false, null, "Database error");
        });
}

// Users query
sql.makeUser = function (publicKey, next) {
    var query = sql.query("User").insert({
        public_key: publicKey,
    });
    return sql.run(query, next);
};
sql.getUser = function (publicKey, next) {
    var query = sql.query("User").select("*").where("public_key", publicKey);
    return sql.run(query, next);
};

// Tokens query
sql.makeToken = function (userId, ip, agent, next) {
    var value = sha1("user:" + userId + ":" + moment().format());
    var query = sql.query("Token").insert({
        User_id: userId,
        value: value,
        ip: ip,
        agent: agent,
        expire_time: moment().add(1, "day").format(),
    });
    return sql.run(query, function (success, results, error) {
        if (!success) {
            return next(false, null, error);
        }
        return next(true, value);
    });
};
sql.getToken = function (value, next) {
    var query = sql.query("Token")
        .select("*")
        .where("value", value)
        .where("expire_time", ">", moment().format());
    return sql.run(query, next);
};

// Session getter
sql.session = function (value, next) {
    // Check the token
    sql.getToken(value, function (success, results, error) {
        // On failure
        if (!success) {
            return next(false, null, error);
        }
        if (results.length <= 0) {
            return next(false, null, "token not found");
        }
        var token = results[0];
        var query = sql.query("User")
            .select("*")
            .where("id", token.User_id);
        // Get associated user
        return sql.run(query, function (success, results, error) {
            // On failure
            if (!success) {
                return next(false, null, error);
            }
            if (results.length <= 0) {
                return next(false, null, "user not found");
            }
            // On success
            var user = results[0];
            return next(true, user);
        });
    });
};

// Routes Query
sql.count = function (next) {
    var query = sql.query("Submission").count("*");
    return sql.run(query, function (success, results, error) {
        if (!success) {
            return next(false, null, error);
        }
        if (results.length <= 0) {
            return next(false, null, "No count found");
        }
        return next(true, results[0].count);
    });
};

sql.get = function (id, next) {
    var query = sql.query("Submission").select("*").where("id", id);
    return sql.run(query, next);
};

sql.list = function (idx, size, next) {
    var query = sql.query("Submission").select("*").offset(idx).limit(size);
    return sql.run(query, next);
};

sql.upload = function (userId, title, desc, data, next) {
    var query = sql.query("Submission").insert({
        User_id: userId,
        title: title,
        desc: desc,
        data: data,
    });
    return sql.run(query, next);
};

module.exports = sql;
