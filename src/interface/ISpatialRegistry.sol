// SPDX-FileCopyrightText: ©️ 2024 Astral Protocol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { IERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

/**
 * @title SpatialRegistry
 * @author The Astral Protocol team
 * @notice SpatialRegistry contract is used to manage spatial assets.
 *         It is created by the RegistryFactory.sol contract,
 *         Restrict state change (adding assets) to the deployer - data provider - registry organization.
 */
interface ISpatialRegistry {
    // // Address of the associated contract to the registry, i.e EAS attestation, zkMaps.
    // address associatedContract;
    // TODO: (OPT) Add multiple associated contracts, or to a specific asset, TBD.

    /**
     * @dev GIS asset on the registry (point, line, polygon, etc)
     */
    struct RegistryAssets {
        uint256[2] coordinateIdRange;
    }
    // TODO: add geoDID, projection format, and whatever needs TBD.
    // TODO: input IPFS hashes, as a light weight alternative to storing on the registry contract.
    // TODO: (OPT) To be replaced with RegistryAsset.sol (legacy).

    /**
     * @dev mintGISPoint add a new GIS record to the registry
     * @dev multiple function for different number of coords
     * @dev inherits tokenId from ERC721Enumerable
     * @param lat latitude coordinate
     * @param long longitude coordinate
     * TODO: (opt) Remove method and use only a single coordinate array.
     */
    function mintGISPoint(bytes32 lat, bytes32 long) external;

    /**
     * @dev mintGISFeature add a new GIS record to the registry
     * @param coords array
     */
    function mintGISFeature(bytes32[] calldata coords) external;
}
