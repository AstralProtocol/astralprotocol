# @astralprotocol/subgraph

## Description

The @astralprotocol/subgraph serves as the indexing engine of the protocol, capturing the registration and modification events of GeoDIDs in the @astralprotocol/contracts. It acts like a decentralized querying database where it is substantially easier to make complex queries to the Spatial Assets registry. It is used to create the tree of GeoDID nodes that represents their relationships and groupings.

The current version of the subgraph (v02) is indexing the Ethereum Roptsten network at the following graphql endpoints:

- `https://api.thegraph.com/subgraphs/name/astralprotocol/spatialassetsv02`
- `wss://api.thegraph.com/subgraphs/name/astralprotocol/spatialassetsv02`

You can connect to these with your GraphQL client of choice.

## To get started with the Astral Protocol Subgraph package:

`yarn add @astralprotocol/subgraph`

### Prerequisites

- Run `sudo apt-get install libsecret-1-dev`
- [Docker Instalation](https://docs.docker.com/install/linux/docker-ce/debian/)
- Run `git clone https://github.com/graphprotocol/graph-node/` (check setup instructions for docker version on https://thegraph.com/docs/)

### Deployment

1. Run ganache, in a separate terminal with the script in package.json (root folder): `yarn ganache`
2. Deploy contracts from `contracts`with `yarn truffle` in the root folder. Update addresses in the subgraph configuration if needed and ensure the correct file is named according to the network of deployment (for ganache it should read as mainnet - backup the current subgraph.yaml file and rename subgraphLocal.yaml).
3. In a third terminal, inside the graph-node folder, run `cd docker && docker-compose up`. If using Docker for WSL, Docker must be running on Windows. If graph-node throws an error try clearing the `data/postgres` folder, within the docker directory of graph-node, with `sudo rm -rf data/postgres`. Restart docker if needed (WSL)
4. Generate subgraph typescript files with `yarn codegen`, then create and deploy the subgraph to the graph-node with `yarn create-local && yarn deploy-local`
5. You can query the subgraph and view the GeoDID tree in the local provided endpoint.

### Testing

The query within the 'docs' folder can be provided to view the Tree (after creating an instance in `contracts`)
