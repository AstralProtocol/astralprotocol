# Introduction

The Location Proof Protocol aims to address the challenge of proving location on the decentralized web in a flexible, yet standardized way.

Given the diverse requirements and approaches for location proofs, our goal is to support innovation across a wide range of proof strategies
while providing a standard data model for creating and verifying these proofs.

:::tip

We're working on the Location Proof Protocol in a few places:

- most active work is happening in the Astral Logbook dapp (especially the
  [&lt;CheckinForm&gt; component](https://github.com/AstralProtocol/logbook/blob/83807d8e79fdac8c990dcb168d72b4bfd9a9607c/packages/nextjs/components/CheckinForm.tsx#L57))
- we're planning to store code in the astralprotocol monorepo, located
  [here on Github](https://github.com/AstralProtocol/astralprotocol/tree/main/src/contracts).

The structure is subject to change — these docs are the most current!

:::

This section of the monorepo currently contains:

- Specifications of the core [Ethereum Attestation Service (EAS) schema](./eas-schema.md) for the protocol, and UIDs of deployments on
  Arbitrum One mainnet, Celo mainnet and Ethereum Sepolia testnet.
- Details on how to create location proofs using different [location types](./location-types.md)
- A framework (in development) for building ["recipes"](./strategies-recipes.md) that allow for many different strategies for proving
  location to be added (WIP)
- Information on attaching differet types of [media](./media-types.md) to location proofs (WIP)

## Contributing

We welcome contributions to improve the protocol and tools. Please read our
[contributing guidelines](https://github.com/AstralProtocol/astralprotocol/wiki/Contributing-guidelines) for more details.
