// SPDX-License-Identifier: APACHE OR MIT
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/GSN/Context.sol";

/**
 * @dev {SpatialAssets} registry
 * This contract uses {AccessControl} to lock permissioned functions using the
 * different roles - head to its documentation for details.
 *
 * The account that deploys the contract will be granted the 'DATA_SUPPLIER' as well as the default admin role, which will let it grant
 * 'DATA_SUPPLIER' roles to other accounts
 */
contract SpatialAssets is Context, AccessControl {
    /**
     * @dev Emitted when Spatial Assets of id `id` are transferred to `to``.
     */
    event SpatialAssetRegistered(address indexed to, bytes32 indexed geoDIDId, bytes32 indexed cid, bytes32 offChainStorage, bytes32 root, bool canBeParent);

    /**
     * @dev Emitted when Spatial Assets of id `id` are deactivated.
     */
    event SpatialAssetDeactivated(bytes32 indexed geoDIDId, bytes32[] childrenToRemove);

    /**
     * @dev Emitted when a parent geodid is added to a node
     */
    event ParentAdded(bytes32 indexed geoDIDId, bytes32 indexed parentGeoDIDId);

    /**
     * @dev Emitted when a children geodid is added to a node
     */
    event ChildrenAdded(bytes32 indexed geoDIDId, bytes32 indexed childrenGeoDIDId);

    /**
     * @dev Emitted when a parent geodid is removed from a node
     */
    event ParentRemoved(bytes32 indexed geoDIDId, bytes32 indexed parentGeoDIDId);

    /**
     * @dev Emitted when a children geodid is removed from a node
     */
    event ChildrenRemoved(bytes32 indexed geoDIDId, bytes32 indexed childrenGeoDIDId);

    bytes32 public constant DATA_SUPPLIER = keccak256("DATA_SUPPLIER");

    string private _uri;

    // Mapping from GeodidID to registrant
    mapping (bytes32 => address) private _owners;
    
    // Mapping from GeodidID to Cid
    mapping (bytes32 => bytes32) private _cids;

    // Mapping from GeodidID to parenthood status
    mapping (bytes32 => bool) private _hasParent;

    // Mapping from GeodidID to parenthood type
    mapping (bytes32 => bool) private _canBeParent;
    
    // Mapping from GeodidID to root GeoDID
    mapping (bytes32 => bytes32) private _root;

    // Mapping from id to spatial asset external storage
    mapping (bytes32 => bytes32) private _externalStorage;

    // Allowed external storages signatures
    mapping (bytes32 => bool) private _allowedStorages;


    /**
     * @dev Grants `DEFAULT_ADMIN_ROLE`, `DATA_SUPPLIER` to the account that
     * deploys the contract.
     */
    constructor(string memory uri) public {
        _setURI(uri);
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(DATA_SUPPLIER, _msgSender());

    }

    /**
     * @dev Registers a new user with the ability to register a spatial asset.
     */
    function registerRole() public {
        require(!hasRole(DATA_SUPPLIER, _msgSender()), "SpatialAssets: must not have a DATA_SUPPLIER role yet");
        _setupRole(DATA_SUPPLIER, _msgSender());
    }

    /**
     * @dev Registers a new storage that can accept GeoDID document creation
     */
    function enableStorage(bytes32 offChainStorage) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "SpatialAssets: must have admin role to edit allowed offchain storages");
        require(_allowedStorages[offChainStorage]== false, "SpatialAssets: storage must not be active yet");
        _allowedStorages[offChainStorage] = true;
    }

    /**
     * @dev Disables an existing storage
     */
    function disableStorage(bytes32 offChainStorage) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "SpatialAssets: must have admin role to edit allowed offchain storages");
        _allowedStorages[offChainStorage] = false;
    }


    /**
     * @dev Registers one spatial asset with external storage 'data' and assigns them to `account`.
     *
     * Emits a {SpatialAssetRegistered} event.
     */
    function registerSpatialAsset(address owner, bytes32 geoDIDId, bytes32 parentGeoDIDId , bytes32[] memory childrenGeoDIDIds, bytes32 cid, bytes32 offChainStorage, uint256 geoDIDtype) public {
        require(hasRole(DATA_SUPPLIER, _msgSender()), "SpatialAssets: must have data supplier role to register");
        require(allowedStorages(offChainStorage), "SpatialAssets: storage must be allowed");
        require(_owners[geoDIDId] == address(0), "SpatialAssets: id must not have an owner yet");
        require(geoDIDtype  == 0 || geoDIDtype == 1, "Spatial Assets: wrong geodidtype");

        _cids[geoDIDId] =cid;
        _owners[geoDIDId] = owner;
        _externalStorage[geoDIDId] = offChainStorage;

        if (geoDIDtype == 0) {
            _canBeParent[geoDIDId] = true;
        } else if (geoDIDtype == 1) {
            _canBeParent[geoDIDId] = false;
        }

        if (parentGeoDIDId == bytes32(0)) {
            _hasParent[geoDIDId] = false;
            _root[geoDIDId] = geoDIDId;
        emit SpatialAssetRegistered(owner, geoDIDId, cid, offChainStorage, geoDIDId, _canBeParent[geoDIDId]);
        } else {
            _hasParent[geoDIDId] = true;
            emit SpatialAssetRegistered(owner, geoDIDId, cid, offChainStorage, _root[parentGeoDIDId], _canBeParent[geoDIDId]);
            emit ParentAdded(geoDIDId, parentGeoDIDId);
        }

        uint256 childrensLen = childrenGeoDIDIds.length;

        if (childrensLen > 0 && _canBeParent[geoDIDId]){
            for(uint256 j=0; j < childrensLen; j++) {
                bytes32 childrenGeoDID = childrenGeoDIDIds[j];
                _hasParent[childrenGeoDID] = true;
                emit ChildrenAdded(geoDIDId, childrenGeoDID);
            }
        }
    }


    /**
     * @dev Adds children GeoDIDs to an already existent geoDID
     *
     * Emits a {ChildrenAdded} event.
     */
    function addChildrenGeoDIDs(bytes32 geoDIDId, bytes32[] memory childrenGeoDIDIds) public {
        require(hasRole(DATA_SUPPLIER, _msgSender()), "SpatialAssets: must have data supplier role to register");
        require(_owners[geoDIDId] == _msgSender(), "SpatialAssets: geoDIDId must be owned by its creator");
        require(_canBeParent[geoDIDId], "SpatialAssets: geoDIDId must be able to be parent (a Collection)");

        uint256 childrensLen = childrenGeoDIDIds.length;

        if (childrensLen > 0){
            for(uint256 j=0; j < childrensLen; j++) {
                bytes32 childrenGeoDID = childrenGeoDIDIds[j];
                if (_owners[childrenGeoDID] != address(0) && !_hasParent[childrenGeoDID]) {
                    _hasParent[childrenGeoDID] = true;
                    _root[childrenGeoDID] = _root[geoDIDId];
                    emit ChildrenAdded(geoDIDId, childrenGeoDID);
                }
            }
        }
    }

    /**
     * @dev Adds a parent GeoDID to an already existent geoDID
     *
     * Emits a {ParentAdded} event.
     */
    function addParentGeoDID(bytes32 geoDIDId, bytes32 parentGeoDIDId) public {
        require(hasRole(DATA_SUPPLIER, _msgSender()), "SpatialAssets: must have data supplier role to register");
        require(_owners[geoDIDId] == _msgSender(), "SpatialAssets: geoDIDId must be owned by its creator");
        require(_owners[parentGeoDIDId] != address(0), "SpatialAssets: parentGeoDIDId does not exist");
        require(!_hasParent[geoDIDId], "SpatialAssets: geoDIDId already has a parent");
        require(_canBeParent[parentGeoDIDId], "SpatialAssets: parentGeoDIDId must be able to be parent (a Collection)");

        _hasParent[geoDIDId] = true;
        _root[geoDIDId] = _root[parentGeoDIDId];
        emit ParentAdded(geoDIDId, parentGeoDIDId);
    }

    
    /**
     * @dev Removes childrenGeoDIDs from a geoDID
     *
     * Emits a {ChildrenRemoved} event.
     */
    function removeChildrenGeoDIDs(bytes32 geoDIDId, bytes32[] memory childrenGeoDIDIds) public {
        require(hasRole(DATA_SUPPLIER, _msgSender()), "SpatialAssets: must have data supplier role to register");
        require(_owners[geoDIDId] == _msgSender(), "SpatialAssets: id must not have an owner yet");

        uint256 childrensLen = childrenGeoDIDIds.length;

        if (childrensLen > 0){
            for(uint256 j=0; j < childrensLen; j++) {
                bytes32 childrenGeoDID = childrenGeoDIDIds[j];
                if (_owners[childrenGeoDID] != address(0) && _hasParent[childrenGeoDID]) {
                    _hasParent[childrenGeoDID] = false;
                    _root[childrenGeoDID] = childrenGeoDID;
                    emit ChildrenRemoved(geoDIDId, childrenGeoDID);
                }
            }
        }
    }


     /**
     * @dev Removes a parent GeoDID from an already existent geoDID
     *
     * Emits a {ParentAdded} event.
     */
    function removeParentGeoDID(bytes32 geoDIDId, bytes32 parentGeoDIDId) public {
        require(hasRole(DATA_SUPPLIER, _msgSender()), "SpatialAssets: must have data supplier role to register");
        require(_owners[geoDIDId] == _msgSender(), "SpatialAssets: id must not have an owner yet");
        require(_owners[parentGeoDIDId] != address(0), "SpatialAssets: GeoDID to be removed as parent does not exist");
        require(_hasParent[geoDIDId], "SpatialAssets: GeoDID does not have a parent to remove");

        _hasParent[geoDIDId] = false;
        _root[geoDIDId] = geoDIDId;
        
        emit ParentRemoved(geoDIDId, parentGeoDIDId);
    }

    /**
     * @dev De-registers a spatial asset
     */
     function deactivateSpatialAsset(bytes32 geoDIDId, bytes32[] memory childrenToRemove) public {
        require(
            _owners[geoDIDId] == _msgSender(),"SpatialAssets: caller is not owner of the Spatial Asset"
        );
        _owners[geoDIDId] = address(0);
        _externalStorage[geoDIDId] = "";
        _cids[geoDIDId] = "";
        _hasParent[geoDIDId] = false;
        _root[geoDIDId] = "";

        uint256 childrensLen = childrenToRemove.length;

        if (childrensLen > 0){
            for(uint256 j=0; j < childrensLen; j++) {
                bytes32 childrenGeoDID = childrenToRemove[j];
                if (_owners[childrenGeoDID] != address(0) && _hasParent[childrenGeoDID]) {
                    _root[childrenGeoDID] = childrenGeoDID;
                    _hasParent[childrenGeoDID] = false;
                }
            }
        }

        emit SpatialAssetDeactivated(geoDIDId, childrenToRemove);
    }
  
    /**
     * @dev Sets a new URI for all the spatial asset types
     */
    function _setURI(string memory newuri) internal {
        _uri = newuri;
    }

    function idToOwner(bytes32 id) public view returns (address) {
        return _owners[id];
    }

    function idToCid(bytes32 id) public view returns (bytes32) {
        return _cids[id];
    }

    function idToCanBeParent(bytes32 id) public view returns (bool) {
        return _canBeParent[id];
    }

    function idToHasParent(bytes32 id) public view returns (bool) {
        return _hasParent[id];
    }

    function idToExternalStorage(bytes32 id) public view returns (bytes32) {
        return _externalStorage[id];
    }

    function allowedStorages(bytes32 offChainStorage) public view returns (bool) {
        return _allowedStorages[offChainStorage];
    }

    function uri() public view returns (string memory) {
        return _uri;
    }
}
