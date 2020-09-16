pragma solidity 0.6.12;

import "@openzeppelin/contracts/access/Ownable.sol";

// SPDX-License-Identifier: UNLICENSED

contract SpatialAssetRegistrar is Ownable {
    //----------------- Events ------------------

    event CreateGeoDID(address indexed caller, bytes32 hash, string cid);
    event UpdateGeoDID(address indexed caller, bytes32 hash, string cid);
    event DeleteGeoDID(bytes32 hash);

    //----------------- Storage -----------------

    /*
    struct assetProvider {
        address
        bytes32 did;
    }
    mapping 
    */

    // did:astral:3122bi312ibuo312gb31i23bi12 (hash: 3122bi312ibuo312gb31i23bi12)
    // an address (DID controller) can register multiple geoDIDs through a bytes32 hash
    mapping(address => mapping(bytes32 => string)) geoDIDs;

    mapping(bytes32 => bool) geoDidExists;


    //---------------- Modifiers -----------------

    modifier nonCreatedGeoDID(bytes32 _hash) {
        require(!geoDidExists[_hash], 'The geoDID hash was already created');
        _;
    }

    modifier onlyValidGeoDID(bytes32 _hash) {
        require(geoDidExists[_hash], "geoDID does not exist");
        _;
    }

    constructor() public {
    }

    //---------------- Public functions -----------------

    // make this function payable and require an amount
    function register(bytes32 _hash, string memory _cid) public nonCreatedGeoDID(_hash){
        createGeoDID(_hash, _cid);
    }

        // make this function payable and require an amount
    function update(bytes32 _hash, string memory _cid) public onlyValidGeoDID(_hash) {
        updateGeoDID(_hash, _cid);
    }


    function deregister(bytes32 _hash) public onlyOwner {
        deleteGeoDID(_hash);
    }

    // geoDID resolver that anyone in the internet can call to resolve the geoDID
    function geoDIDResolver(address _addr, bytes32 _hash) public view onlyValidGeoDID(_hash) returns (string memory) {
        return geoDIDs[_addr][_hash];
    }

    function checkExistence(bytes32 _hash) public view returns (bool) {
        return geoDidExists[_hash];
    }

    //---------------- Internal functions -----------------

    function createGeoDID(bytes32 _hash, string memory _cid) internal {
        geoDIDs[msg.sender][_hash] = _cid;
        geoDidExists[_hash] = true;
        emit CreateGeoDID(msg.sender, _hash, _cid);
    }

    function updateGeoDID(bytes32 _hash, string memory _cid) internal {
        geoDIDs[msg.sender][_hash] = _cid;
        emit UpdateGeoDID(msg.sender, _hash, _cid);
    }


    function deleteGeoDID(bytes32 _hash) internal {
        geoDidExists[_hash] = false;
        emit DeleteGeoDID(_hash);
    }

}