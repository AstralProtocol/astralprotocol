![Imgur](https://i.imgur.com/M5TRFYZ.png)
[![Twitter](https://img.shields.io/twitter/follow/astralprotocol?style=social)](https://twitter.com/astralprotocol)

# astral-protocol

Monorepo containing the implementation of the Astral Protocol.

## Project Status - `Ropsten testnet / Hosted Powergate`

## Project Structure

This repo is made up of several different packages.

| Package                           | Current Version                                                        | CI                                                                                                                                                                                                                                                                                                                                           | Description                              |
| --------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| @astralprotocol/core              | ![npm](https://img.shields.io/npm/v/@astralprotocol/core)              | --                                                                                                                                                                                                                                                                                                                                           | Core Astral Protocol Implementation      |
| @astralprotocol/contracts         | ![npm](https://img.shields.io/npm/v/@astralprotocol/contracts)         | [![Build Status](https://www.travis-ci.com/AstralProtocol/astralprotocol.svg?branch=master)](https://www.travis-ci.com/AstralProtocol/astralprotocol) [![Coverage Status](https://coveralls.io/repos/github/AstralProtocol/astralprotocol/badge.svg?branch=master)](https://coveralls.io/github/AstralProtocol/astralprotocol?branch=master) | Astral Smart Contracts - GeoDID Registry |
| @astralprotocol/subgraph          | ![npm](https://img.shields.io/npm/v/@astralprotocol/subgraph)          | --                                                                                                                                                                                                                                                                                                                                           | Subgraph for astral-protocol-contracts   |
| @astralprotocol/stac-validator-js | ![npm](https://img.shields.io/npm/v/@astralprotocol/stac-validator-js) | --                                                                                                                                                                                                                                                                                                                                           | Node validator for stac item files       |

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
