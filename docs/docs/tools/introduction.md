# Astral Tools

We've been building at the intersection of Web3 and geospatial for several years now, and have compiled a set of tools — some we've built,
some have been developed by friends and collaborators.

:::note
These repositories are often experimental and unsupported. They may need work to get up and running and are not production-ready,
lacking extensive tests, comments, and stability guarantees. Be aware that APIs, implementations, and functionality may change as we iterate
and improve upon these tools.
:::

## Decentralized Location Proofs

### Location Proof Protocol

A protocol for proving location on the decentralized web in a flexible, standardized way (v0.1 deployed) — [**documentation**](../location-proof-protocol/introduction.md).

- Core schema for location proofs, built on EAS, deployed on Arbitrum, Celo, Ethereum Sepolia
- Extensions for diverse location types and media types
- Option to develop location proof “strategies”, and define recipes that specify which data needs to be attached to a proof as supporting
  evidence
- Client libraries for location proof creation and verification (wip)

### Astral Logbook

A client application built on the Location Proof Protocol for creating and visualizing location proofs (v0.1 deployed) — [**logbook.astral.global**](https://logbook.astral.global/) / [**repository**](https://github.com/AstralProtocol/logbook).

- Register Entry workflow to select a location, attach media, type a memo, and register onchain
- Log Entry Details page to fetch and visualize location proof data on a map and table
- TODO: Address View, Token Holder View, Tag View, Collections etc, i.e. multi-proof visualizations for individuals and groups
- Open source, boilerplate UI to easily be extended by teams wanting to build with location proofs for their own purposes (i.e. easy to fork
  and extend as a dMRV surveying app, for example)

### zkMaps

Zero knowledge location proofs, developed by zkMaps — [**code**](https://github.com/zkMaps/zkMaps).

- Verify whether a point is within a geographic area without revealing the point and or the polygon.

## Onchain GIS

### Spatial.sol

Geospatial data structures and algorithms in the EVM (in R+D) — [**proposal**](https://ens.questbook.app/dashboard/?proposalId=66995ce114d9718cd08f1d65&grantId=6619151a3a7a91313846ed80&role=community&isRenderingProposalBody=true&chainId=10).

- Geospatial primitives for onchain location-based services — GeoJSON + GDAL, for Ethereum
- Data structures: points, linestrings, polygons, volumes, raster cells, discrete global grids, all optimized for the EVM
- Algorithms: common geospatial operations like distance, bearing, length, area, intersects etc, leveraging geospatial data structures to
  run in the EVM
- Purpose: onchain geospatial databases, onchain geospatial computations for decentralized location-based services

## Decentralized Geospatial Data

### IPFS STAC

Python client for interfacing with EASIER’s STAC server — [**post**](https://easierdata.org/updates/2022/2022-12-02-a-new-way-to-reference-and-retrieve-geographic-data) / [**code**](https://github.com/easierdata/ipfs-stac).

- SpatioTemporal Asset Catalogs organize satellite imagery sets
- EASIER adapted STAC to use IPFS + Filecoin as the storage medium

### Web3 Geospatial Dashboard

Dashboard to discover Landsat 9 imagery stored on IPFS, developed by EASIER Data Initiative — [**post**](https://easierdata.org/updates/2024/2024-01-24-dashboard-showcase) / [**code**](https://github.com/easierdata/web3-geo-dashboard) /
[**dashboard**](https://dashboard.easierdata.org/).

- A UI to interact with EASIER’s STAC server
- View, pin, fetch Landsat images via a mapping dashboard

### IPFS geospatial querying proof of concept

Spatial queries on satellite imagery stored on IPFS, developed by EASIER Data Initiative — [**post**](https://easierdata.org/notebooks/geohash-ipfs-blog-post) / [**Jupyter Notebook**](https://github.com/easierdata/geohash-cid).

- Experiments with spatial indexing and querying for satellite imagery stored on IPFS
