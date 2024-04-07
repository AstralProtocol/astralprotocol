// SPDX-FileCopyrightText: ©️ 2024 Astral Protocol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

/**
@title RegistryFactory
@author The Astral Protocol team
 */


contract RegistryFactory {
        /**
     * @dev Emitted when a new spatial registry is created
     * TODO: optionally, inforce specific contract or interface 👇
     * @param associatedContract attestation, dMRV data, custom contract.
     * @param owner Registry owner - data provider
     */
    event SpatialRegistryCreated(address associatedContract, address owner);

}
