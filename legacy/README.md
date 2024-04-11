![astralDAO](https://github.com/astralDAO/overview/blob/master/brand-identity/Transparent-Logo-Only-Astral.png?raw=true)
[![Twitter](https://img.shields.io/twitter/follow/astralprotocol?style=social)](https://twitter.com/astralprotocol)

# Research

Monorepo containing early research into Web3-native geospatial technologies.

!!! Note that this is NOT the current implementation of the Astral Protocol, and all references to the protocol in this directory are deprecated. 

## Project Status - `Ropsten testnet / Hosted Powergate` | [![Build Status](https://www.travis-ci.com/AstralProtocol/astralprotocol.svg?branch=master)](https://www.travis-ci.com/AstralProtocol/astralprotocol)

## Project Structure

This monorepo is made up of several different packages.

| Package                              | Current Version                                                           | Coverage                                                                                                                                                                                                                                                                                                                                           | Description                              |
| ------------------------------------ | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| @astralprotocol/core                 | ![npm](https://img.shields.io/npm/v/@astralprotocol/core)                 | --                                                                                                                                                                                                                                                                                                                                           | Core Astral Protocol Implementation      |
| @astralprotocol/contracts            | ![npm](https://img.shields.io/npm/v/@astralprotocol/contracts)            | [![Coverage Status](https://coveralls.io/repos/github/AstralProtocol/astralprotocol/badge.svg?branch=master)](https://coveralls.io/github/AstralProtocol/astralprotocol?branch=master) | Astral Smart Contracts - GeoDID Registry |
| @astralprotocol/subgraph             | ![npm](https://img.shields.io/npm/v/@astralprotocol/subgraph)             | --                                                                                                                                                                                                                                                                                                                                           | Subgraph for astral-protocol-contracts   |
| @astralprotocol/stac-validator-js    | ![npm](https://img.shields.io/npm/v/@astralprotocol/stac-validator-js)    | --                                                                                                                                                                                                                                                                                                                                           | Node validator for stac item files       |
| @astralprotocol/ipld-encoded-geotiff | ![npm](https://img.shields.io/npm/v/@astralprotocol/ipld-encoded-geotiff) | --                                                                                                                                                                                                                                                                                                                                           | IPLD Encoded GeoTIFFs                    |

## Development

### Project setup

This project uses yarn and lerna to manage packages and dependencies. To install dependencies for all packages in this repo, go to root dir and run:

```
$ yarn install
```

Then build all packages:

```
$ yarn run build
```
