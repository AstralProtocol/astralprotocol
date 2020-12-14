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
    event SpatialAssetRegistered(address indexed to, uint256 indexed id, bytes32 offChainStorage);

    /**
     * @dev Emitted when Spatial Assets of id `id` are deactivated.
     */
    event SpatialAssetDeactivated(uint256 indexed id);


    bytes32 public constant DATA_SUPPLIER = keccak256("DATA_SUPPLIER");

    string private _uri;

    // Mapping from token ID to registrant
    mapping (uint256 => address) private _owners;

    // Mapping from id to spatial asset external storage
    mapping (uint256 => bytes32) private _externalStorage;

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
     * @dev Registers a new user with the ability to register a spatial asset.
     */
    function enableStorage(bytes32 offChainStorage) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "SpatialAssets: must have admin role to edit allowed offchain storages");
        require(_allowedStorages[offChainStorage]== false, "SpatialAssets: storage must not be active yet");
        _allowedStorages[offChainStorage] = true;
    }

    /**
     * @dev Registers a new user with the ability to register a spatial asset.
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
    function registerSpatialAsset(address owner, uint256 id, bytes32 offChainStorage) public {
        require(hasRole(DATA_SUPPLIER, _msgSender()), "SpatialAssets: must have data supplier role to register");
        require(allowedStorages(offChainStorage), "SpatialAssets: storage must be allowed");
        _owners[id] = owner;
        _externalStorage[id] = offChainStorage;

        emit SpatialAssetRegistered(owner, id, offChainStorage);
    }

    /**
     * @dev De-registers a spatial asset
     */
     function deactivateSpatialAsset(uint256 id) public {
        require(
            _owners[id] == _msgSender(),"SpatialAssets: caller is not owner of the Spatial Asset"
        );
        _owners[id] = address(0);
        _externalStorage[id] = "";
        emit SpatialAssetDeactivated(id);
    }
  
    /**
     * @dev Sets a new URI for all the spatial asset types
     */
    function _setURI(string memory newuri) internal {
        _uri = newuri;
    }

    function idToOwner(uint256 id) public view returns (address) {
        return _owners[id];
    }

    function idToExternalStorage(uint256 id) public view returns (bytes32) {
        return _externalStorage[id];
    }

    function allowedStorages(bytes32 offChainStorage) public view returns (bool) {
        return _allowedStorages[offChainStorage];
    }

    function uri() public view returns (string memory) {
        return _uri;
    }
}
