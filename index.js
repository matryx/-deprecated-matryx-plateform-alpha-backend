
var eth = require("./eth.js");
var sql = require("./sql.js");
var api = require("./api.js");

// Say hello
api.get("/", function (req, next) {
    return next(true, "Basic API endpoint MTX-POC", null, {});
});

// Check if valid token
api.get("/logged", function (req, next) {
    var token = req.query.token || "";
    sql.session(token, next);
});

// Count all submissions
api.get("/count", function (req, next) {
    sql.count(next);
});

// Get one submission
api.get("/get", function (req, next) {
    var id = req.query.id || 0;
    sql.get(id, next);
});

api.get("/list", function (req, next) {
    var id = req.query.id || 0;
    var size = req.query.size || 10;
    sql.list(id, size, next);
});

api.post('/upload', function (req, next) {
    var token = req.body.token || "";
    var title = req.body.title;
    var desc = req.body.desc;
    var data = req.body.data;
    sql.session(token, function (success, user, error) {
        if (!success) {
            return next(false, null, error);
        }
        sql.push(user.id, title, desc, data, next);
    });
});


api.get("/auth", function (req, next) {
//api.post("/auth", function (req, next) {
    // Read some info
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || "Unknown";
    var agent = req.headers['user-agent'] || "Unknown";
    var key = req.body.key || req.query.key || "";
    // Check if user exists with that key
    sql.getUser(key, function (success, results, error) {
        // On failure
        if (!success) {
            return next(false, null, error);
        }
        // Login ang stop if user already exists
        if (results.length > 0) {
            var user = results[0];
            return sql.makeToken(user.id, ip, agent, next);
        }
        // Signup if user does not exist
        // TODO CHECK ETH BALANCE
        sql.makeUser(key, function (success, results, error) {
            if (!success) {
                return next(false, null, error);
            }
            sql.getUser(key, function (success, results, error) {
                // On failure
                if (!success) {
                    return next(false, null, error);
                }
                if (results.length <= 0) {
                    return next(false, null, "user not created");
                }
                // Done
                var user = results[0];
                return sql.makeToken(user.id, ip, agent, next);
            });
        });
    });
});

api.start();
