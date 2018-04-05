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

var matryxContractABI = [{"constant":true,"inputs":[],"name":"matryxTokenAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_sender","type":"address"}],"name":"isOwner","outputs":[{"name":"_isOwner","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"categoryIterator","outputs":[{"name":"name","type":"string"},{"name":"count","type":"uint128"},{"name":"prev","type":"bytes32"},{"name":"next","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"hashOfLastCategory","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"topCategoryByCount","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"_owner","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_queryID","type":"uint256"},{"name":"_response","type":"uint256"}],"name":"storeQueryResponse","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"hashOfTopCategory","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"categoryList","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"allTournaments","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_query","type":"bytes32"},{"name":"_sender","type":"address"}],"name":"Query","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_matryxTokenAddress","type":"address"},{"name":"_matryxPeerFactoryAddress","type":"address"},{"name":"_matryxTournamentFactoryAddress","type":"address"},{"name":"_matryxSubmissionTrustLibAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_discipline","type":"string"},{"indexed":false,"name":"_owner","type":"address"},{"indexed":false,"name":"_tournamentAddress","type":"address"},{"indexed":false,"name":"_tournamentName","type":"string"},{"indexed":false,"name":"_externalAddress","type":"bytes"},{"indexed":false,"name":"_MTXReward","type":"uint256"},{"indexed":false,"name":"_entryFee","type":"uint256"}],"name":"TournamentCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_owner","type":"address"},{"indexed":false,"name":"_tournamentAddress","type":"address"},{"indexed":false,"name":"_tournamentName","type":"string"},{"indexed":false,"name":"_externalAddress","type":"bytes"},{"indexed":false,"name":"_MTXReward","type":"uint256"},{"indexed":false,"name":"_entryFee","type":"uint256"}],"name":"TournamentOpened","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_tournamentAddress","type":"address"},{"indexed":false,"name":"_finalRoundNumber","type":"uint256"},{"indexed":false,"name":"_winningSubmissionAddress","type":"address"},{"indexed":false,"name":"_MTXReward","type":"uint256"}],"name":"TournamentClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_entrant","type":"address"},{"indexed":false,"name":"_tournamentAddress","type":"address"}],"name":"UserEnteredTournament","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"queryID","type":"string"}],"name":"QueryID","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"},{"indexed":false,"name":"sender","type":"address"}],"name":"QueryPerformed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"storedResponse","type":"uint256"}],"name":"StoredResponse","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"response","type":"uint256"}],"name":"ObtainedResponse","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newResponse","type":"uint256"},{"indexed":false,"name":"oldResponse","type":"uint256"}],"name":"FailedToStore","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"id","type":"uint256"}],"name":"QueryID","type":"event"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_tournamentAddress","type":"address"},{"name":"_tournamentName","type":"string"},{"name":"_externalAddress","type":"bytes"},{"name":"_MTXReward","type":"uint256"},{"name":"_entryFee","type":"uint256"}],"name":"invokeTournamentOpenedEvent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tournamentAddress","type":"address"},{"name":"_finalRoundNumber","type":"uint256"},{"name":"_winningSubmissionAddress","type":"address"},{"name":"_MTXReward","type":"uint256"}],"name":"invokeTournamentClosedEvent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_toIgnore","type":"uint256"}],"name":"prepareBalance","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"balanceIsNonZero","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_submissionAddress","type":"address"},{"name":"_references","type":"address[]"}],"name":"handleReferenceRequestsForSubmission","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_reference","type":"address"}],"name":"handleReferenceRequestForSubmission","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_reference","type":"address"}],"name":"handleCancelledReferenceRequestForSubmission","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_submission","type":"address"}],"name":"updateSubmissions","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_submissionAddress","type":"address"},{"name":"_tournamentAddress","type":"address"}],"name":"removeSubmission","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_category","type":"string"}],"name":"getTournamentsByCategory","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_category","type":"string"}],"name":"getCategoryCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getTopCategory","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"discipline","type":"string"}],"name":"switchTournamentCategory","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_tournamentAddress","type":"address"}],"name":"enterTournament","outputs":[{"name":"_success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_category","type":"string"},{"name":"_tournamentName","type":"string"},{"name":"_externalAddress","type":"bytes"},{"name":"_BountyMTX","type":"uint256"},{"name":"_entryFee","type":"uint256"}],"name":"createTournament","outputs":[{"name":"_tournamentAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"createPeer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_peerAddress","type":"address"}],"name":"isPeer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_sender","type":"address"}],"name":"hasPeer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_peer","type":"address"},{"name":"_reference","type":"address"}],"name":"peerExistsAndOwnsSubmission","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_sender","type":"address"}],"name":"peerAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_submissionAddress","type":"address"}],"name":"isSubmission","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_tournamentAddress","type":"address"}],"name":"getTournament_IsMine","outputs":[{"name":"_isMine","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_gratitude","type":"uint256"}],"name":"setSubmissionGratitude","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTokenAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSubmissionTrustLibrary","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRoundLibAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSubmissionGratitude","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"myTournaments","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"mySubmissions","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tournamentCount","outputs":[{"name":"_tournamentCount","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getTournamentAtIndex","outputs":[{"name":"_tournamentAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]
var matryxPlatformAddress = '0xae5183138a90acfc59876942c2c1010d6222bee9';
var matryxContract = new web3.eth.Contract(matryxContractABI, matryxPlatformAddress);

var tokenABI = [{"constant": false,"inputs": [{"name": "addr","type": "address"},{"name": "state","type": "bool"}],"name": "setTransferAgent","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "mintingFinished","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "name","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_spender","type": "address"},{"name": "_value","type": "uint256"}],"name": "approve","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "totalSupply","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_from","type": "address"},{"name": "_to","type": "address"},{"name": "_value","type": "uint256"}],"name": "transferFrom","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "addr","type": "address"}],"name": "setReleaseAgent","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "decimals","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_amount","type": "uint256"}],"name": "mint","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "value","type": "uint256"}],"name": "upgrade","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "upgradeAgent","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "releaseTokenTransfer","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "upgradeMaster","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "_owner","type": "address"}],"name": "balanceOf","outputs": [{"name": "balance","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [],"name": "finishMinting","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "getUpgradeState","outputs": [{"name": "","type": "uint8"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [{"name": "","type": "address"}],"name": "transferAgents","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "owner","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "symbol","outputs": [{"name": "","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "released","outputs": [{"name": "","type": "bool"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "_to","type": "address"},{"name": "_value","type": "uint256"}],"name": "transfer","outputs": [{"name": "success","type": "bool"}],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "totalUpgraded","outputs": [{"name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "releaseAgent","outputs": [{"name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "agent","type": "address"}],"name": "setUpgradeAgent","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [{"name": "_owner","type": "address"},{"name": "_spender","type": "address"}],"name": "allowance","outputs": [{"name": "remaining","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"name": "newOwner","type": "address"}],"name": "transferOwnership","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": false,"inputs": [{"name": "master","type": "address"}],"name": "setUpgradeMaster","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"inputs": [],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"name": "_from","type": "address"},{"indexed": true,"name": "_to","type": "address"},{"indexed": false,"name": "_value","type": "uint256"}],"name": "Upgrade","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"name": "agent","type": "address"}],"name": "UpgradeAgentSet","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "to","type": "address"},{"indexed": false,"name": "amount","type": "uint256"}],"name": "Mint","type": "event"},{"anonymous": false,"inputs": [],"name": "MintFinished","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "from","type": "address"},{"indexed": true,"name": "to","type": "address"},{"indexed": false,"name": "value","type": "uint256"}],"name": "Transfer","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"name": "owner","type": "address"},{"indexed": true,"name": "spender","type": "address"},{"indexed": false,"name": "value","type": "uint256"}],"name": "Approval","type": "event"}]
var tokenAddress = '0x89c81164a847fae12841c7d2371864c7656f91c9'
token = new web3.eth.Contract(tokenABI, tokenAddress)

var eth = {};

var connectionConfiguration = {
  httpAddresses: [],
  wsAddresses: ['ws://' + gethAddr + ":" + gethPort],
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
    console.log("response from balanceOfErc20: " + response.valueOf());
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
    resultsNoMod = results;
    console.log("balance results without modification: " + results);
    var balanceCheck = balanceValue.greaterThan(balanceMin);
    // No mtx token available
    if (!balanceCheck) {
      return next(false, balanceValue, "invalid balance");
    }
    // Success
    console.log("Valid balance", mtxAddress, balanceValue.toString());
    return next(true, balanceValue, resultsNoMod);
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
  
  eth.checkBalance(address, (success, results, resultsNoMod, error) => {
    // Failure
    if (!success) {
      console.log(error)
    }
    console.log("WORKING.");
    console.log("balance is: " + results);
    // Success, send balance back to MatryxPlatform
    // var queryIDBytes = web3.utils.asciiToHex(queryID);
    // var resultsBytes = web3.utils.asciiToHex(results);

    console.log("queryID" + queryID);
    console.log("results" + results);

    matryxContract.methods.storeQueryResponse(queryID, results).send({from: "0x11f2915576dc51dffb246959258e8fe5a1913161", gas: 3000000, gasPrice: 3000000})
    .then(function(receipt){
      console.log(receipt)
      // if(receipt.logs.length == 1)
      // {
      //   token.mint(address, resultsNoMod).then(function(receipt) {
      //     console.log("Minted " + resultsNoMod + " tokens for " + address);
      //   })
      // }
    })
  });
}).on('changed', function(event){
    // remove event from local database
  }).on('error', function(error){
    console.log("error in ETH.JS: " + error);
  });
