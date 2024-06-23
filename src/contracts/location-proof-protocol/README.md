# 📍 Location Proof Protocol

The Location Proof Protocol aims to address the challenge of proving location on the decentralized web in a flexible, yet standardized way.

Given the diverse requirements and approaches for location proofs, our goal is to support innovation across a wide range of proof strategies
while providing a standard data model for creating and verifying these proofs.

This repository currently contains the code necessary to deploy the core Ethereum Attestation Service (EAS) schema for the protocol. The
standard includes a framework (in development) for building "recipes" that allow for many different strategies for proving location to be
added.

## The Challenge

### Broad Approaches to Location Proofs

- **Authority-based Strategies**: Authorized individuals attest to someone's presence. i.e. ticket checkers, event hosts
- **Social Strategies**: People verify each other's claims, confirming or challenging their validity. i.e. permissionless social
  confirmation, perhaps with sybil-resistant scoring of confirmer accounts; PIN exchange
- **Near-field Machine Strategies**: Hardware devices attest to the presence of another device through information exchange or cryptographic
  'endorsement' of a claim. i.e. RFID; NFC; Bluetooth
- **Network Machine Strategies**: Nodes on a local network or hardware wallets triangulate position and sign confirmation attestations. i.e.
  Time of Flight; Time Difference of Arrival
- **Sensor Data Strategies**: Where devices sense local networks, environmental conditions, images + audio, accelerometers, etc, and
  location is discerned from analysis of this evidence. i.e. radio frequency / optical / inertial / acoustic / magnetometer localization

In addition to these different categories of strategies, various verification schemes can be employed to endow location proof recipes with a
different attributes, such as privacy, game theoretic assurances of validity, etc.

- **Time-based Schemes**: Involves waiting or challenge periods.
- **Cryptographic Schemes**: Zero-knowledge proofs verified on-chain or in peer nodes.
- **AI-based Schemes**: Analyzing photos or contextual information.
- **Economic Schemes**: Requires payment or staking value for proof creation.

This is an incomplete list, and we hope to support a growing set of experiments in location proof design.

### Diverse Spatial Reference Systems

Location proofs may not always relate to Earth-based coordinates but could be relative to other objects or within different spatial
reference systems, such as:

- Being with a person at a particular time
- Location in a metaverse space
- Presence in a vehicle or a specific room

Astral's Location Proof Protocol aims to support location proofs within a wide range of different spatial reference systems, both global and
relative. However, initial development of the protocol will focus on positioning objects / events on Earth.

## Our Approach

### Generalized Location Proof Protocol

We are developing a protocol that accommodates various proof strategies while maintaining a standard data model and tools for creating and
verifying location proofs.

## Repository Contents

- **Contract Deployment Scripts**: Scripts to deploy the core EAS schema for the Location Proof Protocol
- **Proof Creation Documentation**: Detailed documentation on how to interact with the EAS schema
- **Location Proof Strategy Development Guides**: Detailed information on how to create and register recipes for creating location proofs
  based on different strategies

## Core Schema v0.1 (Sepolia Testnet)

The current working schema described [here](./schema/README.md) is deployed on Ethereum Sepolia testnet, UID
`0x9efcbaa4a39a233977a6db557fd81ba5adc9023ca731db86cfd562c4fbf4073e`
([view on EASScan](https://sepolia.easscan.org/schema/view/0x9efcbaa4a39a233977a6db557fd81ba5adc9023ca731db86cfd562c4fbf4073e)).

## Contributing

We welcome contributions to improve the protocol and tools. Please read our
[contributing guidelines](https://github.com/AstralProtocol/astralprotocol/wiki/Contributing-guidelines) for more details.
