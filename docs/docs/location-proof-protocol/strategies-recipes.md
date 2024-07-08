# Strategies + Recipes

The generalized location proof protocol is designed as it is to accommodate the wide range of strategies for proving location on the
decentralized web, while also provided a standard way of representing these proofs.

In this section of the documentation, we will define these different location proof strategies, and document how to contribute a new
strategy to the protocol. (For a clearer idea of our design, see the [Architecture](./architecture.md) page).

:::note

A contributing guide, along with documentation on specific strategies, is in the work. If you want to help us develop this, reach out!

:::

## Broad Approaches to Location Proofs

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
