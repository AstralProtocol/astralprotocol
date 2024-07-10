# Introduction

// TODO: Astral Logbook Logo

# Astral Logbook

The Astral Logbook is a decentralized application built on Astral's Location Proof Protocol. The Logbook empowers you to register geotagged
**log entries** onchain + on IPFS.

Log entries are location proofs with attached media — geotagged content built on the decentralized web. Recording details of important
events in your life lets you create a digital trail of your life, controlled by you.

:::warning

Blockchains are permanent — even though log entries can be 'revoked' and removed from view on Astral's front ends, the data stored is
public. **Be careful about what information you share!**

We recommend that you do NOT post your home location, or publish log entries of places you will be in the future.

:::

With the Logbook, you can:

- [record](./registering-entries.md) geotagged log entries onchain
- include a text memo in your entries
- attach content to an entry, stored on IPFS
- explore an interactive map of [entries posted around the world](./multi-entry-views.md) (soon!)
- verify friends' entries (soon!)
- share to decentralized social media (soon!)

:::tip

You can find documentation about the Location Proof Protocol [here](../location-proof-protocol/introduction).

:::

The Logbook was built using Scaffold-ETH 2 — huge thanks to the BuidlGuidl for this resource!

## The Stack

The Astral Logbook is built on the [Ethereum Attestation Service](https://attest.sh) running on [Celo](https://celo.org) and
[Arbitrum](https://arbitrum.io), and [IPFS](https://ipfs.io). The dapp is built using [Scaffold-eth 2](TODO) and
[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js), and is open source (TODO: which license?).

## Contributing

If you want to help us build new features for the Logbook, or fix bugs you find, you're very welcome to! To learn more about chipping in,
see our [contributing guidelines](https://github.com/AstralProtocol/astralprotocol/wiki/Contributing-guidelines).
