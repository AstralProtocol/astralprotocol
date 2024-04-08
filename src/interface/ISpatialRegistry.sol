// SPDX-FileCopyrightText: ©️ 2024 Astral Protocol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { IERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";

/**
 * @title ISpatialRegistry
 * @author The Astral Protocol team
 */
interface ISpatialRegistry is IERC721Enumerable {
    // // Address of the associated contract to the registry, i.e EAS attestation, zkMaps
    // address associatedContract;

    /**
     * @dev GIS asset on the registry (point, line, polygon, etc)
     * @notice ❗Limited to 12 coordinates of a polygon until IPFS integration
     */
    struct registryAssets {
        uint256[2] coordinateIdRange;
    }
    // TODO: add geoDID, projection format, and whatever needs TBD.
    // TODO: input IPFS hashes, as a light weight alternative to storing on the registry contract.abi
    // to be used with RegistryAsset.sol (legacy).

    /**
     * @notice mintGISPoint add a new GIS record to the registry
     * @dev multiple function for different number of coords
     * @dev inherits tokenId from ERC721Enumerable
     * @param lat latitude coordinate
     * @param long longitude coordinate
     */
    function mintGISPoint(bytes32 lat, bytes32 long) external;

    /**
     * @notice mintGISFeature add a new GIS record to the registry
     * @dev multiple function for different number of coords
     * @param coords array of 4 coordinate (8 => x & y)
     */
    function mintGISFeature(bytes32[8] calldata coords) external;

    /**
     * @notice mintGISFeature add a new GIS record to the registry
     * @dev multiple function for different number of coords
     * @param coords array of 12 coordinate (24 => x & y)
     */
    function mintGISFeature(bytes32[24] calldata coords)
        external;
}
