// SPDX-FileCopyrightText: ©️ 2024 Astral Protocol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

/**
@title RegistryFactory
@author The Astral Protocol team
 */


contract RegistryFactory {

   /**
     * @function DeployRegistry add deploy a new SpatialRegistry.
     * @dev multiple function for different number of coords
     * @dev inherits tokenId from ERC721Enumerable
     * @param lat latitude coordinate
     * @param long longitude coordinate
     */
    function DeployRegistry public (){};

    //     /**
    //  * @dev Emitted when a new spatial registry is created
    //  * TODO: optionally, inforce specific contract or interface 👇
    //  * @param associatedContract attestation, dMRV data, custom contract.
    //  * @param owner Registry owner - data provider
    //  */
    // event SpatialRegistryDeployed(address associatedContract, address owner);

}
