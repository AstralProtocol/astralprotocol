// SPDX-FileCopyrightText: ©️ 2024 Astral Protocol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { ERC721, IERC165 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { ISpatialRegistry } from "@interface/ISpatialRegistry.sol";
import { Coordinates } from "@contracts/Coordinates.sol";

/**
 * @title SpatialRegistry
 * @author The Astral Protocol team
 * @notice SpatialRegistry contract is used to manage spatial assets.
 *         It is created by the RegistryFactory.sol contract,
 *         Restrict state change (adding assets) to the deployer - data provider - registry organization.
 */
contract SpatialRegistry is ISpatialRegistry, ERC721 {
    address owner;
    uint256 private currentAssetId = 0;
    /* All coords in the registry (of multiple registryAssets) */
    mapping(uint256 => registryAssets) spatialAssets;

    // TODO: add reentrancy, pausable, accessControl..
    // TODO: restrict to RegistryFactory contract.
    Coordinates coordinates;

    constructor(address _owner) ERC721("AstralRegistry", "AST") {
        owner = _owner;
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
    function mintGISFeature(bytes32[] calldata coords) external {
        // TODO: Limit number of coords to avoid an unbounded loop.
        currentAssetId++;
        uint256[2] memory _coordinatesIdsRange = _iterateCoords(coords);
        spatialAssets[currentAssetId] = registryAssets({ coordinateIdRange: _coordinatesIdsRange });
        _safeMint(owner, currentAssetId);
    }

    function _iterateCoords(bytes32[] calldata _coords) private returns (uint256[2] memory _coordinatesIdsRange) {
        for (uint256 i = 0; i < _coords.length; i += 2) {
            uint256 _coordinateId = coordinates.addCoordinate(_coords[i], _coords[++i]);
            if (i == 0) _coordinatesIdsRange[0] = _coordinateId;
            if (i == _coords.length - 1) _coordinatesIdsRange[1] = _coordinateId;
        }
        return _coordinatesIdsRange;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}
