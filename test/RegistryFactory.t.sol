// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.25;

import { RegistryFactory } from "@contracts/RegistryFactory.sol";

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

/// @dev If this is your first time with Forge, read this tutorial in the Foundry Book:
/// https://book.getfoundry.sh/forge/writing-tests
contract RegistryFactoryTest {
    RegistryFactory internal registryFactory;

    /// @dev A function invoked before each test case is run.
    function setUp() public virtual {
        // Instantiate the contract-under-test.
        registryFactory = new RegistryFactory();
    }

    /// @dev Basic test. Run it with `forge test -vvv` to see the console log.
    function test_Example() external {
        registryFactory.DeployRegistry(address(this));
    }
}
