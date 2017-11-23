var BigNumber = require('bignumber.js');
var rpc = require("ethrpc");
var config = require("./config.js");

var chainAddr = "matryx-platform-private-chain-node2";
var chainPort = 8550;

const Web3 = require("web3");
var websocketProvider = new Web3.providers.WebsocketProvider('ws://' + chainAddr + ':' + chainPort);
var web3 = new Web3(websocketProvider);

var gethAddr = config.geth.host;
var gethPort = config.geth.port;

var dns = require('dns');
dns.lookup(chainAddr, function(err, result) {
  console.log("chainAddr Name", chainAddr, "resolved to", result, err);
});
dns.lookup(gethAddr, function(err, result) {
  console.log("gethAddr Name", gethAddr, "resolved to", result, err);
});

var matryxContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tournamentList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"balanceIsNonZero","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tournamentId","type":"uint256"}],"name":"submissionCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"idx","type":"uint256"}],"name":"tournamentByIndex","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tournamentId","type":"uint256"}],"name":"tournamentByAddress","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tournamentCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tournaments","outputs":[{"name":"id","type":"uint256"},{"name":"title","type":"string"},{"name":"description","type":"string"},{"name":"bounty","type":"uint256"},{"name":"exists","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tournamentId","type":"uint256"},{"name":"title","type":"string"},{"name":"body","type":"string"},{"name":"references","type":"string"},{"name":"contributors","type":"string"}],"name":"createSubmission","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"_deployer","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_queryID","type":"uint256"},{"name":"_response","type":"uint256"}],"name":"storeQueryResponse","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tournamentId","type":"uint256"},{"name":"idx","type":"uint256"}],"name":"submissionByIndex","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tournamentId","type":"uint256"},{"name":"submissionId","type":"uint256"}],"name":"submissionByAddress","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_query","type":"bytes32"},{"name":"_sender","type":"address"}],"name":"Query","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"toIgnore","type":"uint256"}],"name":"prepareBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"title","type":"string"},{"name":"description","type":"string"},{"name":"bounty","type":"uint256"}],"name":"createTournament","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"sender","type":"address"}],"name":"QueryPerformed","type":"event"}]
var matryxPlatformAddress = '0x53347d9d9640410bbc392c2e4b2b352eb3a035ef';
var matryxContract = new web3.eth.Contract(matryxContractABI, matryxPlatformAddress);

var eth = {};

var connectionConfiguration = {
  httpAddresses: ["http://" + gethAddr + ":" + gethPort],
  wsAddresses: [],
  ipcAddresses: [],
  connectionTimeout: 20000,
  errorHandler: function (err) {
    console.log("Connection error handler", err);
  },
};

console.log("Connecting to geth node", gethAddr, gethPort);

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
    console.log("payload for balanceOfErc20: " + payload);
    var response = rpc.callOrSendTransaction(payload);
    console.log("response from balanceOfErc20: " + response);
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
  console.log("key (matryx address to check) in eth.checkBalance: " + key);
  eth.balanceOfErc20(mtxContract, mtxAddress, function (success, results, error) {
    // Failure
    if (!success) {
      return next(false, results, error);
    }
    var balanceMin = new BigNumber(0);
    var balanceValue = new BigNumber(results);
    console.log("balance results without modification: " + results);
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

web3.eth.getBlock(48, function(error, result){
    if(!error)
        console.log(result)
    else
        console.error(error);
})

console.log("about to set up query performed event callback");

matryxContract.events.QueryPerformed(null, (error, event) => 
  { 
    if(error)
    {
      console.log("Error with setting up event: " + error);
    }
    else
    {
      console.log("Set up queryPerformed event: " + event); 
    }
    
  })
.on('data', (event) => {
  var queryID = event.returnValues[0];
  var address = event.returnValues[1];

  console.log("got queryID from address " + address);
  
  eth.checkBalance(address, (success, results, error) => {
    // Failure
    if (!success) {
      console.log(error)
    }

    console.log("WORKING.");
    console.log("balance is: " + results);
    // Success, send balance back to MatryxPlatform
    var queryIDBytes = web3.utils.asciiToHex(queryID);
    var resultsBytes = web3.utils.asciiToHex(results);

    console.log("queryIDBytes" + queryIDBytes);
    console.log("resultsBytes" + resultsBytes);

    matryxContract.methods.storeQueryResponse(queryIDBytes, resultsBytes).send({from: "0x11f2915576dc51dffb246959258e8fe5a1913161", gas: 3000000, gasPrice: 3000000})
  });
}).on('changed', function(event){
    // remove event from local database
  }).on('error', function(error){
    console.log("error in ETH.JS: " + error);
});
