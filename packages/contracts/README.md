# `@astralprotocol/contracts`

[![Build Status](https://www.travis-ci.com/AstralProtocol/astralprotocol.svg?branch=master)](https://www.travis-ci.com/AstralProtocol/astralprotocol) [![Coverage Status](https://coveralls.io/repos/github/AstralProtocol/astralprotocol/badge.svg?branch=master)](https://coveralls.io/github/AstralProtocol/astralprotocol?branch=master)

## Usage

- Run ganache `yarn ganache`
- Deploy contracts with `yarn truffle`
- Run tests with `yarn truffle-test` or do coverage check up `yarn coverage`
- You can deploy an instance by running `yarn new-instance`. It builds a tree with some GeoDIDs with fake ids and cids.
- You can test the removal of some links by running `yarn remove-links`.
- Watch the changes in a locally deployed subgraph.

## Description

These contracts serve as the Registry for the Astral Protocol GeoDIDs. It allows binding of a GeoDID to an ethereum address and CID name resolving.

By registering a spatial asset Smart Contract events are triggered, which are picked up by the subgraph indexer to build the tree of relationships for easy querying.

The most important function is:

`function registerSpatialAsset(address owner, uint256 geoDIDId, uint256 parentGeoDIDId , uint256[] memory childrenGeoDIDIds, uint256 cid, bytes32 offChainStorage, uint256 geoDIDtype) public`

---

### Required parameters:

- Owner:

Owner of the geodid. Currently must be msg.sender.

- geoDIDId:

Id of the geodid generated after its creation

- cid:

CID of the GeoDID Document

- offChainStorage:

`Bytes32` encoded string of an approved offchain storage. Default `'FILECOIN'`, should be encoded with `web3.utils.asciiToHex()`.

- geoDIDtype:

Must be set to 0 for `'Collection'` type GeoDIDs, or 1 for `'Item'`type GeoDIDs.

---

Optional parameters:

- parentGeoDIDId:

Id of the GeoDID to be added as parent of `geoDIDId`. Must exist already. If no parent is to be added, `parentGeoDIDId`should be set to 0.

- childrenGeoDIDIds:

Ids of the children GeoDIDs to be added. Must exist already. If no children is to be added, `childrenGeoDIDIds`should be set to [].
