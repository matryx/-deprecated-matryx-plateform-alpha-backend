
var bodyParser = require('body-parser')
var cors = require('cors');

var express = require("express");
var app = express();

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
}));

var api = {};

api.get = function (route, next) {
    return app.get(route, function (req, res) {
        next(req, function (success, results, error, inputs) {
            res.json({
                success: success,
                results: results,
                error: error,
                inputs: inputs,
            });
        });
    });
};

api.post = function (route, next) {
    return app.post(route, function (req, res) {
        next(req, function (success, results, error, inputs) {
            res.json({
                success: success,
                results: results,
                error: error,
                inputs: inputs,
            });
        });
    });
};

api.start = function () {
    app.listen(8081, function () {
        console.log("Listening on port 8081");
    });
};

module.exports = api;

