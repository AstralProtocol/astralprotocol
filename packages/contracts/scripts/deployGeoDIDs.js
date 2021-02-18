const { AstralClient } = require('@astralprotocol/core');
const SpatialAssets = require("../build/contracts/SpatialAssets.json")

module.exports = async function (callback) {

  try {

    const accounts = await web3.eth.getAccounts()
    const userAccount = accounts[0]

    // find contract in network 3 (Ropsten)
    const SpatialAssetsContract = new web3.eth.Contract(SpatialAssets.abi, SpatialAssets.networks['3'].address, {
      from: userAccount,
      data: SpatialAssets.deployedBytecode,
    });
  
    const astral = new AstralClient(userAccount);
  
    const storage = web3.utils.asciiToHex('FILECOIN');
    // Enable a storage first

    try {
      await SpatialAssetsContract.methods.enableStorage(storage).send()
      .on('receipt', function(receipt){
        // receipt example
        console.log(receipt);
  
      })
      .on('error', function(error) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log(error);
      });
    } 
    catch (err) {
      // Will throw an error if storage is already active
      console.log(err)
    }

  
    // Creates a Genesis GeoDID 
    
    const genDocRes = await astral.createGenesisGeoDID('collection')
    console.log(genDocRes);
  
    // With the returned IDocumentInfo from the last function, we can pin it.
    // Since no token was specified the client will assign a new auth Token to the user.
    
    const results = await astral.pinDocument(genDocRes);
    console.log(results);
    
    const token = results.token;
          
    // register the geodid id and cid obtained. Type 0 because it is a collection

    console.log(results.geodidid)
    console.log(results.cid)

    try {
      await SpatialAssetsContract.methods.registerSpatialAsset(userAccount, results.geodidid,0,[], results.cid, storage,0).send()    
      .on('receipt', function(receipt){
      // receipt example
      console.log(receipt);

      })
      .on('error', function(error) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log(error);
      });
    } 
    catch (err) {
      // Will throw an error if tx reverts
      console.log(err)
    }

    
    // With the Auth Token and the GeoDID ID we can load the document with the loadDocument function

    const loadResults = await astral.loadDocument(results.geodidid, token);
    console.log(loadResults);

  }
  catch(error) {
    console.log(error)
  }

    callback()
};
