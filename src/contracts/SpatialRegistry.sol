// SPDX-FileCopyrightText: ©️ 2024 Astral Protocol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ISpatialRegistry } from "@interface/ISpatialRegistry.sol";
import { Coordinates } from "@contracts/Coordinates.sol";

/**
 * @title SpatialRegistry
 * @author The Astral Protocol team
 */
contract SpatialRegistry is ISpatialRegistry, ERC721 {
    address owner;
    uint256 private currentAssetId = 0;
    /* All coords in the registry (of multiple registryAssets) */
    mapping(uint256 => registryAssets) spatialAssets;

    // TODO: add reentrancy, pausable, accessControl..
    Coordinates coordinates;
    constructor(address) ERC721("AstralRegistry", "AST") {
        owner = _msgSender();
        coordinates = new Coordinates();
    }

    /**
     * @inheritdoc ISpatialRegistry
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function mintGISPoint(bytes32 lat, bytes32 long) external onlyOwner {
        currentAssetId++;
        uint256 CoordinateId = coordinates.addCoordinate(lat, long);
        spatialAssets[currentAssetId] = registryAssets({ coordinateIdRange: [CoordinateId, CoordinateId] });
        _safeMint(owner, currentAssetId);
    }

    /**
     * @inheritdoc ISpatialRegistry
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function mintGISFeature(bytes32[8] calldata coords) external override {
        currentAssetId++;
        uint256[2] memory _coordinatesIdsRange = _iterateCoords(coords);
        spatialAssets[currentAssetId] = registryAssets({ coordinateIdRange: _coordinatesIdsRange });
        _safeMint(owner, currentAssetId);
    }

    /**
     * @inheritdoc ISpatialRegistry
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function mintGISFeature( bytes32[24] calldata coords) external override {
        currentAssetId++;
        uint256[2] memory _coordinatesIdsRange = _iterateCoords(coords);
        spatialAssets[currentAssetId] = registryAssets({ coordinateIdRange: _coordinatesIdsRange });
        _safeMint(owner, currentAssetId);
    }

    /**
     * @inheritdoc ERC721
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function _safeMint(address to, uint256 tokenId) internal override onlyOwner {
        _safeMint(to, tokenId);
    }

    /**
     * @inheritdoc ERC721
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function supportsInterface(bytes4 interfaceId) public view override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @inheritdoc ERC721
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */
    function totalSupply() public view override returns (uint256) {
        totalSupply();
    }
    /**
     * @inheritdoc ERC721
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */

    function tokenOfOwnerByIndex(address _owner, uint256 index) public view override returns (uint256) {
        tokenOfOwnerByIndex(_owner, index);
    }
    /**
     * @inheritdoc ERC721
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */

    function tokenByIndex(uint256 index) public view override returns (uint256) {
        tokenByIndex(index);
    }

    function _iterateCoords(bytes32[8] calldata _coords) private returns (uint256[2] memory _coordinatesIdsRange) {
        for (uint i = 0; i < _coords.length; i+=2) {
            uint256 _coordinateId = coordinates.addCoordinate(_coords[i], _coords[++i]);
            if(i == 0) _coordinatesIdsRange[0] = _coordinateId;
            if(i == _coords.length - 1) _coordinatesIdsRange[1] = _coordinateId;
        }
        return _coordinatesIdsRange;
    }
    function _iterateCoords(bytes32[24] calldata _coords) private returns (uint256[2] memory _coordinatesIdsRange) {
        for (uint i = 0; i < _coords.length; i+=2) {
            uint256 _coordinateId = coordinates.addCoordinate(_coords[i], _coords[++i]);
            if(i == 0) _coordinatesIdsRange[0] = _coordinateId;
            if(i == _coords.length - 1) _coordinatesIdsRange[1] = _coordinateId;
        }
        return _coordinatesIdsRange;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
