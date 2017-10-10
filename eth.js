
var rpc = require("ethrpc");

var config = require("./config.js");

var gethAddr = config.geth.host;
var gethPort = config.geth.port;

console.log("Connecting to geth node", gethAddr, gethPort);

var eth = {};

var connectionConfiguration = {
  httpAddresses: ["http://" + gethAddr + ":" + gethPort],
  wsAddresses: [],
  ipcAddresses: [],
  connectionTimeout: 10000,
  errorHandler: function (err) {
    console.log("Connection error handler", err);
  },
};

rpc.connect(connectionConfiguration, function (err) {
  if (err) {
    console.error("Failed to connect to Ethereum node.", err);
  }
  else {
    console.log("Connected to Ethereum node!");
    eth.checkBalance("HOLYSHIT", function (a, b, c) {
      console.log("CheckBalance", "HOLYSHIT", a, b, c);
    });
    eth.checkBalance("0xe54007d15BF14E558D250538c84B8a2C5919bDe7", function (a, b, c) {
      console.log("CheckBalance", "0xe54007d15BF14E558D250538c84B8a2C5919bDe7", a, b, c);
    });
    eth.checkBalance("e54007d15BF14E558D250538c84B8a2C5919bDe7", function (a, b, c) {
      console.log("CheckBalance", "e54007d15BF14E558D250538c84B8a2C5919bDe7", a, b, c);
    });
  }
});

eth.checkBalance = function (key, next) {
  var payload = {
    to: "0x97CA8108064eB2a90428ED6f407AE583eE7C3fd8",
    name: "balanceOf",
    signature: ["address"],
    params: [key],
    send: false,
    returns: "uint256"
  };
  try {
    var response = rpc.callOrSendTransaction(payload);
    var results = parseInt(response, 16);
    if (results) {
      return next(true, results);
    }
    return next(false, results, "invalid balance");
  }
  catch (error) {
    return next(false, null, error);
  }
};

module.exports = eth;
