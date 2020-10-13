/**
 * [A1] Fetch the json from the STAC Collection or Catalog
 * 
 * [A2] If STAC Collection or Catalog != root
 *      then -> Fetch the json of the ROOT STAC Collection or Catalog
 * 
 * [B] if STAC_Collection or STAC_Catalog
 *      1) obtain metadata 
 *      2) iterate through the links
 *      3) fetch-json the link at index
 *          3a) if child STAC_Collection or  child STAC_Catalog 
 *              3aa) recuresively call [B]
 *          3b) if STAC_Item
 *              3ba) call [C]
 *      4) obtain the DID metadata (public keys, id, authentication, proofs, etc.)
 *      5) build the GeoDID document through the geo-did-resolver's create did method 
 *      6) multihash the GeoDID document 
 *      7) create a CID from the GeoDID document multihash
 * 
 * 
 * [C] if STAC Item - STAC Item validation
 *      1) transform the json to class 
 *      2) fetch the data from asset's href url 
 *      3) multihash each of the pieces of the retrieved data
 *      4) create a CID from each multihash respectively (CID representing the file)
 *      5) obtain the DID metadata (public keys, id, authentication, proofs, etc.)
 *      6) build the GeoDID document through the geo-did-resolver's create did method 
 *      7) multihash the GeoDID document 
 *      8) create a CID from the GeoDID document multihash
 *      9) return CID
 * 
 * 
 *  [D] encode the root Catalog with a DAG-CBOR to create the Master/Root GeoDID Document's CID 
 *       
 */