pragma solidity 0.6.12;

import "@openzeppelin/contracts/access/Ownable.sol";

// SPDX-License-Identifier: UNLICENSED

contract SpatialAssetRegistrar is Ownable {
    //----------------- Events ------------------

    event CreateGeoDID(address caller, bytes32 hash, string cid);
    event UpdateHash(address caller, bytes32 hash);
    event UpdateCID(address caller, string cid);
    event DeleteGeoDID(address caller);

    //----------------- Storage -----------------

    struct geoDID {
        bool exist;
        // 32 bytes hash after the did method name
        bytes32 hash;
        // content id on IPFS
        string cid;
    }

    // an address (DID controller) registers a geoDID
    mapping(address => geoDID[]) geoDIDs;
    // current Id of the array in the mapping
    mapping(address => uint256) currentGeoDIDId;

    //---------------- Modifiers -----------------

    modifier nonCreatedGeoDID(bytes32 hash) {
        require(geoDIDs[msg.sender][currentGeoDIDId[msg.sender]].hash != hash, 'The geoDID hash was created in the past and was deactivated');
        _;
    }

    modifier onlyValidGeoDID(address _addr, bytes32 hash) {
        require(geoDIDs[_addr][currentGeoDIDId[_addr]].exist, "geoDID does not exist");
        require(geoDIDs[msg.sender][currentGeoDIDId[msg.sender]].hash == hash, 'The geoDID hash does not match the registry');
        _;
    }

    constructor() public {
    }

    //---------------- Public functions -----------------

    // make this function payable and require an amount
    function register(bytes32 _hash, string memory _cid) public {
        if (geoDIDs[msg.sender][currentGeoDIDId[msg.sender]].exist) {
            updateHash(_hash);
            updateCID(_cid);
        } else {
            createGeoDID(_hash, _cid);
        }
    }

    function deregister(address _toBeDeleted) public onlyOwner {
        deleteGeoDID(_toBeDeleted);
    }

    // geoDID resolver that anyone in the internet can call to resolve the geoDID
    function geoDIDResolver(address _addr, bytes32 _hash) public view onlyValidGeoDID(_addr, _hash) returns (string memory) {
        return geoDIDs[_addr][currentGeoDIDId[msg.sender]].cid;
    }

    //---------------- Internal functions -----------------

    function createGeoDID(bytes32 _hash, string memory _cid) internal nonCreatedGeoDID(_hash) {
        geoDIDs[msg.sender][currentGeoDIDId[msg.sender]] = geoDID(true, _hash, _cid);

        emit CreateGeoDID(msg.sender, _hash, _cid);

        currentGeoDIDId[msg.sender]++;
    }

    function updateHash(bytes32 _hash) internal {
        geoDIDs[msg.sender][currentGeoDIDId[msg.sender]].hash = _hash;
        emit UpdateHash(msg.sender, _hash);
    }

    function updateCID(string memory _cid) internal {
        geoDIDs[msg.sender][currentGeoDIDId[msg.sender]].cid = _cid;
        emit UpdateCID(msg.sender, geoDIDs[msg.sender][currentGeoDIDId[msg.sender]].cid);
    }

    function deleteGeoDID(address _addr) internal {
        geoDIDs[_addr][currentGeoDIDId[_addr]].exist = false;
        emit DeleteGeoDID(_addr);
    }

}