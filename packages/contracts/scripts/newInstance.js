const SpatialAssets = artifacts.require("./SpatialAssets.sol");
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
        
  const geoDID1 = 'did:geo:QmQ747r7eLfsVtBFBSRwfXsPK6tADJpQzJxz4uFdoZb9XJ';
  const cid1 = 'QmQ747r7eLfsVtBFBSRwfXsPK6tADJpQzJxz4uFdoZb9XJ';

  const geoDID2 = 'did:geo:QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL';
  const cid2 = 'QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL';

  const geoDID3 = 'did:geo:QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKd';
  const cid3 = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKd';

  const geoDID4 = 'did:geo:QmYA2fn8cMbVWo4v95RwcwJVyQsNtnEwHerfWR8UNtEwoE';
  const cid4 = 'QmYA2fn8cMbVWo4v95RwcwJVyQsNtnEwHerfWR8UNtEwoE';

  const geoDID5 = 'did:geo:QmV9tSDx9UiPeWExXEeH6aoDvmihvx6jD5eLb4jbTaKGps';
  const cid5 = 'QmV9tSDx9UiPeWExXEeH6aoDvmihvx6jD5eLb4jbTaKGps';

  const geoDID6 = 'did:geo:QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd';
  const cid6 = 'QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd';

  const geoDID7 = 'did:geo:QmdiA1atSBgU178s5rsWont8cYns3fmwHxELTpiP9uFfLW';
  const cid7 = 'QmdiA1atSBgU178s5rsWont8cYns3fmwHxELTpiP9uFfLW';


  const bytes32GeoDID1= getBytes32FromIpfsHash(geoDID1.substring(8));
  const bytes32Cid1 = getBytes32FromIpfsHash(cid1);

  const bytes32GeoDID2= getBytes32FromIpfsHash(geoDID2.substring(8));
  const bytes32Cid2 = getBytes32FromIpfsHash(cid2);

  const bytes32GeoDID3= getBytes32FromIpfsHash(geoDID3.substring(8));
  const bytes32Cid3 = getBytes32FromIpfsHash(cid3);

  const bytes32GeoDID4= getBytes32FromIpfsHash(geoDID4.substring(8));
  const bytes32Cid4 = getBytes32FromIpfsHash(cid4);

  const bytes32GeoDID5= getBytes32FromIpfsHash(geoDID5.substring(8));
  const bytes32Cid5 = getBytes32FromIpfsHash(cid5);

  const bytes32GeoDID6= getBytes32FromIpfsHash(geoDID6.substring(8));
  const bytes32Cid6 = getBytes32FromIpfsHash(cid6);

  const bytes32GeoDID7= getBytes32FromIpfsHash(geoDID7.substring(8));
  const bytes32Cid7 = getBytes32FromIpfsHash(cid7);



  try {

  const accounts = await web3.eth.getAccounts()

  const SpatialAssetsContract = await SpatialAssets.deployed();
  
  let tx = await SpatialAssetsContract.enableStorage(stringToBytes('FILECOIN'));

  console.log(
    "Storage enabled. Tx: ",
    tx.tx
  );

  tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0], bytes32GeoDID1, stringToBytes(''),[], bytes32Cid1,stringToBytes('FILECOIN'),0);
  
  
  console.log(
    "geodid ",
    tx.tx
  );

  tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0],bytes32GeoDID2,bytes32GeoDID1,[],bytes32Cid2, stringToBytes("FILECOIN"),0)

  
  console.log(
    "geodid  ",
    tx.tx
  );

  tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0],bytes32GeoDID3,bytes32GeoDID1,[],bytes32Cid3, stringToBytes("FILECOIN"),0)
 
  console.log(
    "geodid  ",
    tx.tx
  );

  tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0],bytes32GeoDID4,bytes32GeoDID3,[],bytes32Cid4, stringToBytes("FILECOIN"),1)

  console.log(
    "geodid ",
    tx.tx
  );

  tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0],bytes32GeoDID5,stringToBytes(''),[],bytes32Cid5, stringToBytes("FILECOIN"),1)

  console.log(
    "geodid 1",
    tx.tx
  );

  tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0],bytes32GeoDID6,stringToBytes(''),[],bytes32Cid6, stringToBytes("FILECOIN"),0)

  console.log(
    "geodid ",
    tx.tx
  );
  tx = await SpatialAssetsContract.addChildrenGeoDIDs(bytes32GeoDID6,[bytes32GeoDID1,bytes32GeoDID5])

  console.log(
    "geodid  ",
    tx.tx
  );

    tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0],bytes32GeoDID7,stringToBytes(''),[],bytes32Cid7, stringToBytes("FILECOIN"),1)

    console.log(
      "geodid  ",
      tx.tx
      );


    tx = await SpatialAssetsContract.addParentGeoDID(bytes32GeoDID7,bytes32GeoDID2)

    console.log(
      " geodid ",
      tx.tx
      );

    }
    catch(error) {
      console.log(error)
    }
  
    callback()
};
