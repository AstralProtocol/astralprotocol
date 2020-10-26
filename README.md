
![Imgur](https://i.imgur.com/M5TRFYZ.png)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Twitter](https://img.shields.io/twitter/follow/astraldao?style=social)](https://twitter.com/astraldao)

# astral-protocol
Monorepo containing the Typescript implementation of the Astral Protocol.

## Project Status - `Ropsten testnet / Hosted Powergate`

## Project Structure

This repo is made up of several different packages.

| Package | Current Version | Description |
| -- | -- | -- |
| @astralprotocol/astral-protocol-core | -- | Core Astral Protocol Implementation |
| @astralprotocol/astral-protocol-contracts | -- | Astral Smart Contracts - GeoNFT Registry |
| @astralprotocol/astral-protocol-subgraph | -- | Subgraph for astral-protocol-contracts |
| @astralprotocol/stac-validator-js | -- | node validator for stac item files |

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
