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
        
  const geoDID1 = 'did:geo:QmUZ4e5quBeXG5t38hGBgXweob5rat9mcix6qn9AsAMrsC';

  const geoDID2 = 'did:geo:QmZ9Mc8sPk6oASJz4g1cvgh5bvps6bp7s6B2seK9NyL5qj';

  const geoDID3 = 'did:geo:QmYgxdsHwArsZdActpg5APsTuYuFAYJY4gZxZkxAcCuDNN';


  const bytes32GeoDID1= getBytes32FromIpfsHash(geoDID1.substring(8));

  const bytes32GeoDID2= getBytes32FromIpfsHash(geoDID2.substring(8));

  const bytes32GeoDID3= getBytes32FromIpfsHash(geoDID3.substring(8));



  try {

  
  console.log("GeoDID1: ", geoDID1)

  console.log("Bytes32 GeoDID1: ", bytes32GeoDID1)

  console.log("Calculated GeoDID1: ", getIpfsHashFromBytes32(bytes32GeoDID1))
  console.log("Calculated GeoDID from subgraph: ", getIpfsHashFromBytes32("0x5c5426554833fdbd64d4041b07a49363a9275520839c88cb9d7d4b5957acbe73"))

  console.log("   ")

  console.log("GeoDID2: ", geoDID2)

  console.log("Bytes32 GeoDID2: ", bytes32GeoDID2)

  console.log("Calculated GeoDID2: ", getIpfsHashFromBytes32(bytes32GeoDID2))
  console.log("Calculated GeoDID from subgraph: ", getIpfsHashFromBytes32("0xa08bd4357eb3a3dbc6b8634c90ab033e51c7027c10468cb90550ad53429f1e32"))

  console.log("   ")

  console.log("GeoDI3: ", geoDID3)

  console.log("Bytes32 GeoDID3: ", bytes32GeoDID3)

  console.log("Calculated GeoDID3: ", getIpfsHashFromBytes32(bytes32GeoDID3))
  console.log("Calculated GeoDID3 from subgraph: ", getIpfsHashFromBytes32("0x99c8c166e8986ffd28f5f5b6438791fb030c406e6fb717cdf3e6a84888be47f7"))

    }
    catch(error) {
      console.log(error)
    }
  
    callback()
};
