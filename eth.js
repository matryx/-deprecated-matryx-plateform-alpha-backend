
var BigNumber = require('bignumber.js');
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
    eth.debugStates();
    /*
    var blockStream = rpc.getBlockStream();
    blockStream.subscribeToOnBlockAdded(function (block) {
      console.log("Found new block", block);
    })
    blockStream.subscribeToOnLogAdded(function (log) {
      console.log("Found new log", log);
    })
    */
  }
});

eth.balanceOfErc20 = function (contract, address, next) {
  var payload = {
    to: contract,
    name: "balanceOf",
    signature: ["address"],
    params: [address],
    send: false,
    returns: "uint256"
  };
  try {
    var response = rpc.callOrSendTransaction(payload);
    return next(true, response);
  }
  catch (error) {
    return next(false, null, error);
  }
};

eth.debugStates = function () {
  var states = {
    "syncing": rpc.eth.syncing(),
    "block": parseInt(rpc.eth.blockNumber(), 16),
    //"accounts": rpc.eth.accounts(),
    //"coinbase": rpc.eth.coinbase(),
    //"compilers": rpc.eth.getCompilers(),
    "peers": parseInt(rpc.net.peerCount(), 16),
    "version": rpc.net.version(),
    "listening": rpc.net.listening(),
  };
  for (var key in states) {
    console.log("Current state", key, states[key]);
  }
};

eth.checkBalance = function (key, next) {
  var mtxContract = "0x0af44e2784637218dd1d32a322d44e603a8f0c6a";
  var mtxAddress = key;
  eth.balanceOfErc20(mtxContract, mtxAddress, function (success, results, error) {
    // Failure
    if (!success) {
      return next(false, results, error);
    }
    var balanceMin = new BigNumber(0);
    var balanceValue = new BigNumber(results);
    var balanceCheck = balanceValue.greaterThan(balanceMin);
    // No mtx token available
    if (!balanceCheck) {
      return next(false, balanceValue, "invalid balance");
    }
    // Success
    console.log("Valid balance", mtxAddress, balanceValue.toString());
    return next(true, balanceValue);
  });
};

module.exports = eth;
