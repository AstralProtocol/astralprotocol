// SPDX-FileCopyrightText: ©️ 2024 Astral Protocol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { ICoordinate } from "@interface/ICoordinates.sol";
import { Context } from "@openzeppelin/contracts/utils/Context.sol";

/**
 * @title Coordinate.sol
 * @author The Astral Protocol team
 * @dev Coordinate contract store to be used by SpatialRegistry.sol
 * // TODO: Replace with SpatialAssets.sol.
 * https://github.com/AstralProtocol/astralprotocol/blob/main/legacy/packages/contracts/contracts/SpatialAssets.sol
 */
contract Coordinates is ICoordinate, Context {
    address registryAddress;
    uint256 coordinateId = 0;
    mapping(uint256 => Coordiante) public coordinates;

    constructor() {
        registryAddress = _msgSender();
    }

    function addCoordinate(bytes32 _lat, bytes32 _long) public registryOnly returns (uint256 _coordinateId){
        coordinateId++;
        coordinates[coordinateId] = Coordiante({ lat: _lat, long: _long, coordinateId: coordinateId});
        return coordinateId;
    }

    modifier registryOnly() {
        // TODO: (OPT) Throw custom Error()
        require(
            _msgSender() == registryAddress, "Coordinates.sol: Can only be called by Parent SpatialRegistry contract."
        );
        _;
    }
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
