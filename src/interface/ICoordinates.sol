// SPDX-FileCopyrightText: ©️ 2024 Astral Protocol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

/**
 * @title ICoordinate.sol
 * @author The Astral Protocol team
 * @dev Coordinate contract store to be used by SpatialRegistry.sol
 * // TODO: Replace with SpatialAssets.sol.
 * https://github.com/AstralProtocol/astralprotocol/blob/main/legacy/packages/contracts/contracts/SpatialAssets.sol
 */

interface ICoordinate {
    /**
     * @dev Coordinate, used as strings [ATM], signed floating point representation typycally represents a geojson.
     */
    struct coordinate {
        bytes32 lat;
        bytes32 long;
    }

    // TODO: add contractsOnly or a stricter RegistiresOnly modifier.
    //       To be used only by the parent registry.
    function addCoordinate(bytes32 _lat, bytes32 _long) external;
}

/**
 * @dev [TBD] coordianteSingleDimension, signed floating point representation of x,y,(z). typycally represents a
 * geojson.ß
 * TODO: Add represantation format type for additional formats (geoJSON used as default).
 * TODO: Replace with bitwise operations, to be stored the leanest (uint64? [sign, exp, mantissa]
 *       OR [sign, precision, value] OR a better solution. )
 */
// struct coordianteSingleDimension {
//     uint8 sign;
//     uint8 precision;
//     uint8 value;
// }
