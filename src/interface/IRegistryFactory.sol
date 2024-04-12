// SPDX-FileCopyrightText: ©️ 2024 Astral Protocol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

/**
 * @title RegistryFactory
 * @author The Astral Protocol team
 * @notice RegistryFactory contract is used to deploy spatial registries.
 *         RegistryFactory contract is operated by AstralProtocol, SpatialRegistries
 *         are operated by deployer - data provider - registry owner (organization).
 */
interface IRegistryFactory {
    /**
     * @dev DeployRegistry add deploy a new SpatialRegistry.
     * @param owner registry owner.
     */
    function DeployRegistry(address owner) external;

    // /**
    //  * @dev Emitted when a new spatial registry is created
    //  * TODO: optionally, inforce specific contract or interface 👇
    //  * @param associatedContract attestation, dMRV data, custom contract.
    //  * @param owner Registry owner - data provider
    //  */
    // // event SpatialRegistryDeployed(address associatedContract, address owner);
}
