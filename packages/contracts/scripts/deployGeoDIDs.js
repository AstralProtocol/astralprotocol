const { AstralClient } = require('@astralprotocol/core');
const SpatialAssets = artifacts.require("./SpatialAssets.sol");

module.exports = async function (callback) {

  try {

    const accounts = await web3.eth.getAccounts()
    const userAccount = accounts[0]
    const SpatialAssetsContract = await SpatialAssets.deployed();
  
    const astral = new AstralClient(userAccount);
  
    // Enable a storage first
    let tx = await SpatialAssetsContract.enableStorage(web3.utils.asciiToHex('FILECOIN'));
  
    console.log(
      "Storage enabled. Tx: ",
      tx.tx
    );
    
    // Creates a Genesis GeoDID 
    
    const genDocRes = await astral.createGenesisGeoDID('collection')
    console.log(genDocRes);
  
    // With the returned IDocumentInfo from the last function, we can pin it.
    // Since no token was specified the client will assign a new auth Token to the user.
    
    const results = await astral.pinDocument(genDocRes);
    console.log(results);
    
    const token = results.token;
          
    // register the geodid id and cid obtained. Type 0 because it is a collection
    tx = await SpatialAssetsContract.registerSpatialAsset(userAccount,results.geodidid,0,[], results.cid,web3.utils.asciiToHex('FILECOIN'),0);
    
    
    console.log(
      "GeoDID succesfuly created. Tx: ",
      tx.tx
    );
    
   
    // With the Auth Token and the GeoDID ID we can load the document with the loadDocument function
    const loadResults = await astral.loadDocument(results.geodidid, token);
    console.log(loadResults);

  }
  catch(error) {
    console.log(error)
  }

    callback()
};
