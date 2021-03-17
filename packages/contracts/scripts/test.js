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

    // Return base58 encoded ipfs hash from bytes32 hex string,
  // E.g. "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
  // --> "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL"
  
  function getIpfsHashFromBytes32(bytes32Hex) {
    // Add our default ipfs values for first 2 bytes:
    // function:0x12=sha2, size:0x20=256 bits
    // and cut off leading "0x"
    const hashHex = "1220" + bytes32Hex.slice(2)
    const hashBytes = Buffer.from(hashHex, 'hex');
    const hashStr = bs58.encode(hashBytes)
    return hashStr
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

  
  console.log("GeoDID1: ", geoDID1)

  console.log("Bytes32 GeoDID1: ", bytes32GeoDID1)

  console.log("Calculated GeoDID1: ", getIpfsHashFromBytes32(bytes32GeoDID1))

    }
    catch(error) {
      console.log(error)
    }
  
    callback()
};
