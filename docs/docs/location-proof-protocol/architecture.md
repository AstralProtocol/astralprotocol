# Architecture

We are designing the overall architecture of the onchain component of the generalized location proof protocol. If you'd like to weigh in —
or help us build it! — reach out on [Telegram](https://t.me/+UkTOSXnDcDM5ZTBk).

Here's the top-level abstract of the work we're doing:

## Abstract

This spike examines two approaches of extensible contracts, managed by a `*RecipeCoordinator.sol*` contract that controls the addition and
upgrade of multiple implementation contracts. These implementation contracts each hold a _recipe_ for a “proof-of-location” strategy.

The primary purpose of this design is to coordinate the addition, use and upgrade of these recipes / strategies, through one coordinating
contract — `RecipeCoordinator.sol`. Adding recipes is a **permissionless**, public action taken through the `RecipeCoordinator`. Upgrade
functionality is required for both the RecipeCoordinator and, optionally, on recipe implementation contracts.

In this spike, we consider two architectural design patterns to serve this purpose: the Diamond pattern and ERC-165 interface matching.

:::note

For example, a team developing a proof-of-location strategy that requires users to scan NFC devices would implement the Solidity code to
record and verify location proofs, then register the implementation with the `RecipeCoordinator`.

The “recipe” would describe the shape + content of the data that needs to be included in a location proof for it to adhere to that strategy.
The implementation contract developed by the strategy designers would include a `verify` method.

:::

:::warning

This is all work in progress, we'd love input!

:::
