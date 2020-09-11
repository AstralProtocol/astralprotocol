![Imgur](https://i.imgur.com/M5TRFYZ.png)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)
[![Twitter](https://img.shields.io/twitter/follow/ceramicnetwork?label=Follow&style=social)](https://twitter.com/astraldao)

# astral-protocol
Monorepo containing the Typescript implementation of the Astral protocol.

## Project Status - `Localnet`

## Project Structure

This repo is made up of several different packages.

| Package | Current Version | Description |
| -- | -- | -- |
| @astralprotocol/astral-core | -- | Core Astral Protocol Implementation |
| @astralprotocol/astral-contracts | -- | Astral Smart Contracts |

## Development

### Project setup
This project uses npm and lerna to manage packages and dependencies. To install dependencies for all packages in this repo:
```
$ yarn run bootstrap
```
Then build all packages:
```
$ yarn run build
```
