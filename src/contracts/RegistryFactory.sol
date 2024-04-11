// SPDX-FileCopyrightText: ©️ 2024 Astral Protocol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { Context } from "@openzeppelin/contracts/utils/Context.sol";
import { SpatialRegistry } from "@contracts/SpatialRegistry.sol";
import { IRegistryFactory } from "@interface/IRegistryFactory.sol";

/**
 * @title RegistryFactory
 * @author The Astral Protocol team
 * @notice RegistryFactory contract is used to deploy spatial registries.
 *         RegistryFactory contract is operated by AstralProtocol, SpatialRegistries
 *         are operated by deployer - data provider - registry owner (organization).
 */

// TODO: Add view functions OPT using ERC721Enumerable by oz.
contract RegistryFactory is IRegistryFactory, Context {
    // TODO: (OPT) Restrict further, to allowed address list, is order to aviod malicious
    //       contract presenting themselves as Astral.
    address[] public deployedRegistries;
    address AstralProtocolOwner;

    constructor() {
        // TODO: possibly redundant, can utilize "owner" on erc721 from oz.
        AstralProtocolOwner = _msgSender();
    }
    /**
     * @inheritdoc IRegistryFactory
     * @dev (needed for compiler https://github.com/ethereum/solidity/issues/14397)
     */

    function DeployRegistry(address owner) public {
        SpatialRegistry newRegistry = new SpatialRegistry(owner);
        deployedRegistries.push(address(newRegistry));
    }
}
