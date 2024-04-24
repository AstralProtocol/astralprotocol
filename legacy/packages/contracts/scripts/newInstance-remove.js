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

  const geoDID2 = 'did:geo:QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL';

  const geoDID3 = 'did:geo:QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKd';

  const geoDID4 = 'did:geo:QmYA2fn8cMbVWo4v95RwcwJVyQsNtnEwHerfWR8UNtEwoE';

  const geoDID5 = 'did:geo:QmV9tSDx9UiPeWExXEeH6aoDvmihvx6jD5eLb4jbTaKGps';

  const geoDID6 = 'did:geo:QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd';

  const geoDID7 = 'did:geo:QmdiA1atSBgU178s5rsWont8cYns3fmwHxELTpiP9uFfLW';

  const geoDIDError = 'did:geo:QmYS4JAwG45SvDEC5AM9Hzv1dfzPoXoBq1N9aTbT3bEs86';

  const bytes32GeoDID1= getBytes32FromIpfsHash(geoDID1.substring(8));
  const bytes32GeoDID2= getBytes32FromIpfsHash(geoDID2.substring(8));
  const bytes32GeoDID3= getBytes32FromIpfsHash(geoDID3.substring(8));
  const bytes32GeoDID4= getBytes32FromIpfsHash(geoDID4.substring(8));
  const bytes32GeoDID5= getBytes32FromIpfsHash(geoDID5.substring(8));
  const bytes32GeoDID6= getBytes32FromIpfsHash(geoDID6.substring(8));
  const bytes32GeoDID7= getBytes32FromIpfsHash(geoDID7.substring(8));
  const bytes32GeoDIDError= getBytes32FromIpfsHash(geoDIDError.substring(8));


  try {

      const SpatialAssetsContract = await SpatialAssets.deployed();
      let tx
        
        // geodid id 4 remove parent 3
      tx = await SpatialAssetsContract.removeParentGeoDID(bytes32GeoDID4,bytes32GeoDID3)

        console.log(
          " geodid id 4 remove parent 3 ",
          tx.tx )

          
        // geodid id 6 remove children 1 and 5
        tx = await SpatialAssetsContract.removeChildrenGeoDIDs(bytes32GeoDID6,[bytes32GeoDID1,bytes32GeoDID5])

        console.log(
          " geodid id 6 remove children 1 and 5",
          tx.tx
          );

        

        tx = await SpatialAssetsContract.deactivateSpatialAsset(bytes32GeoDID2,[bytes32GeoDID7])

        console.log(
          " geodid id 2 delete",
          tx.tx
          );

        // should emit an error that children to be added does not exist
        tx = await SpatialAssetsContract.removeChildrenGeoDIDs(bytes32GeoDID1,[bytes32GeoDIDError])

        console.log(
          " geodid id 1 remove error child does not exist",
          tx.tx
          );

        // should emit an error in 6 that children already has a parent
        tx = await SpatialAssetsContract.addChildrenGeoDIDs(bytes32GeoDID6,[bytes32GeoDID3])

        console.log(
          " geodid id 6 remove error 3 already has a parent",
          tx.tx
          );

        // should emit an error that children to be removed does not have a parent
        tx = await SpatialAssetsContract.removeChildrenGeoDIDs(bytes32GeoDID1,[bytes32GeoDID4])

        console.log(
          " geodid id 1 remove error 4 does not have a parent",
          tx.tx
          );

          
    
      
      }
    catch(error) {
      console.log(error)
    }
  
    callback()
};
