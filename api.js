
var bodyParser = require('body-parser')
var cors = require('cors');

var express = require("express");
var app = express();

var config = require("./config.js");

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
  extended: true
}));

var api = {};

api.respond = function (res, mode, success, results, error, inputs) {
    if (success) {
        res.status(200).json({
            success: true,
            results: results,
            error: error,
            inputs: inputs,
        });
    }
    else {
        res.status(500).json({
            success: false,
            results: results,
            error: error,
            inputs: inputs,
        });
    }
}

api.get = function (route, next) {
    return app.get(route, function (req, res) {
        next(req, function (success, results, error, inputs) {
            api.respond(res, "get", success, results, error, inputs);
        });
    });
};

api.post = function (route, next) {
    return app.post(route, function (req, res) {
        next(req, function (success, results, error, inputs) {
            api.respond(res, "post", success, results, error, inputs);
        });
    });
};

api.start = function () {
    app.listen(config.port, function () {
        console.log("Listening on port: ", config.port);
    });
};

module.exports = api;

