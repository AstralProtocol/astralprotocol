const { AstralClient } = require('@astralprotocol/core');
const SpatialAssets = require("../build/contracts/SpatialAssets.json")
const bs58 = require('bs58')

module.exports = async function (callback) {
  const stringToBytes = (string) => web3.utils.asciiToHex(string)

    // based on https://ethereum.stackexchange.com/questions/17094/how-to-store-ipfs-hash-using-bytes32
  // Return bytes32 hex string from base58 encoded ipfs hash,
  // stripping leading 2 bytes from 34 byte IPFS hash
  // Assume IPFS defaults: function:0x12=sha2, size:0x20=256 bits
  // E.g. "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL" -->
  // "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
  function getBytes32FromIpfsHash(ipfsListing) {
    return "0x"+bs58.decode(ipfsListing).slice(2).toString('hex')
  }

  try {

    const accounts = await web3.eth.getAccounts()
    const userAccount = accounts[0]

    // find contract in network 3 (Ropsten)
    const SpatialAssetsContract = new web3.eth.Contract(SpatialAssets.abi, SpatialAssets.networks['3'].address, {
      from: userAccount,
      data: SpatialAssets.deployedBytecode,
    });
  
    const astral = new AstralClient(userAccount);
  
    const storage = stringToBytes('FILECOIN');
    // Enable a storage first

    try {
      await SpatialAssetsContract.methods.enableStorage(storage).send()
      .on('receipt', function(receipt){
        // receipt example
        console.log(receipt);
  
      })
      .on('error', function() { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log('Already enabled storage: ' + storage);
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

    const bytes32GeoDID= getBytes32FromIpfsHash(results.geodidid.substring(8));
    const bytes32Cid = getBytes32FromIpfsHash(results.cid);
  
    try {
      await SpatialAssetsContract.methods.registerSpatialAsset(userAccount, bytes32GeoDID, stringToBytes(''),[], bytes32Cid, storage,0).send()    
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
