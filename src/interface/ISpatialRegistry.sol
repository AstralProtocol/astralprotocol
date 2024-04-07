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
     * @dev Representaion of GeoJSON floating point coordiante
     * @notice ❗Limited to 12 coordinates of a polygon until IPFS integration
     *
    struct geoJsonCoord {
        uint64 geoJsonCoordValue;
        uint8 geoJsonCoordFloatingPoint;
    }

    /**
     * @notice mintGISPoint add a new GIS record to the registry
     * @dev multiple function for different number of coords
     * @dev inherits tokenId from ERC721Enumerable
     * @param lat latitude coordinate
     * @param long longitude coordinate
     */
    function mintGISPoint(geoJsonCoord calldata lat, geoJsonCoord calldata long) external;

    /**
     * @notice mintGISFeature add a new GIS record to the registry
     * @dev multiple function for different number of coords
     * @param coordsCount number of coords, counting both lan & long
     * @param lat1 latitude coordinate
     * @param long1 longitude coordinate
     * @param lat2 latitude coordinate
     * @param long2 longitude coordinate
     * @dev ..and so on
     */
    function mintGISFeature(
        uint256 coordsCount,
        geoJsonCoord calldata lat1,
        geoJsonCoord calldata long1,
        geoJsonCoord calldata lat2,
        geoJsonCoord calldata long2,
        geoJsonCoord calldata lat3,
        geoJsonCoord calldata long3,
        geoJsonCoord calldata lat4,
        geoJsonCoord calldata long4
    )
        external;

    /**
     * @notice mintGISFeature add a new GIS record to the registry
     * @dev multiple function for different number of coords
     * @param coordsCount number of coords, counting both lan & long
     * @param lat1 latitude coordinate
     * @param long1 longitude coordinate
     * @param lat2 latitude coordinate
     * @dev ..and so on
     */
    function mintGISFeature(
        uint256 coordsCount,
        geoJsonCoord calldata lat1,
        geoJsonCoord calldata long1,
        geoJsonCoord calldata lat2,
        geoJsonCoord calldata long2,
        geoJsonCoord calldata lat3,
        geoJsonCoord calldata long3,
        geoJsonCoord calldata lat4,
        geoJsonCoord calldata long4,
        geoJsonCoord calldata lat5,
        geoJsonCoord calldata long5,
        geoJsonCoord calldata lat6,
        geoJsonCoord calldata long6,
        geoJsonCoord calldata lat7,
        geoJsonCoord calldata long7,
        geoJsonCoord calldata lat8,
        geoJsonCoord calldata long8,
        geoJsonCoord calldata lat9,
        geoJsonCoord calldata long9,
        geoJsonCoord calldata lat10,
        geoJsonCoord calldata long10,
        geoJsonCoord calldata lat11,
        geoJsonCoord calldata long11,
        geoJsonCoord calldata lat12,
        geoJsonCoord calldata long12
    )
        external;
}
