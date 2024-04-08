// SPDX-FileCopyrightText: ©️ 2024 Astral Protocol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { SpatialRegistry } from "@contracts/SpatialRegistry.sol";

/**
* @title RegistryFactory
* @author The Astral Protocol team
* @notice RegistryFactory contract in order to deploy spatial registries.
*         RegistryFactory contract is operated by AstralProtocol, SpatialRegistries
*         are operated by deployer - data provider - registry owner (organization).
 */

// TODO: Add view functions OPT using ERC721Enumerable by oz.
contract RegistryFactory  {
    // TODO: (OPT) Restrict further, to allowed address list, is order to aviod malicious
    //       contract presenting themselves as Astral.
    address[] public deployedRegistries public;
    address AstralProtocolOwner;

    constructor () {
        // TODO: possibly redundant, can utilize "owner" on erc721 from oz.
        AstralProtocolOwner = _msgSender();
    }
    function DeployRegistry public (){
        deployedRegistries.push(new spatialRegistry(_msgSender()))
    }

}
