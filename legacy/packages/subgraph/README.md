# @astralprotocol/subgraph

## Description

The @astralprotocol/subgraph serves as the indexing engine of the protocol, capturing the registration and modification events of GeoDIDs in the @astralprotocol/contracts. It acts like a decentralized querying database where it is substantially easier to make complex queries to the Spatial Assets registry. It is used to create the tree of GeoDID nodes that represents their relationships and groupings.

The current version of the subgraph (v06) is indexing the Ethereum Roptsten network at the following graphql endpoints:

- `https://api.thegraph.com/subgraphs/name/astralprotocol/spatialassetsv06`
- `wss://api.thegraph.com/subgraphs/name/astralprotocol/spatialassetsv06`

You can connect to these with your GraphQL client of choice.

## To add Astral Protocol Subgraph to your application

```
yarn add @astralprotocol/subgraph
```

## To develop or try the Astral Protocol Subgraph locally

### Prerequisites

- Clone the astralprotocol repository and go to packages/subgraph
- Run `sudo apt-get install libsecret-1-dev`
- [Docker Instalation](https://docs.docker.com/install/linux/docker-ce/debian/)
- Run `git clone https://github.com/graphprotocol/graph-node/` (check setup instructions for docker version on https://thegraph.com/docs/)
- Have the development steps of @astralprotocol/contracts done previously (with Ganache)

### Deployment

1. Ensure you have ganache running with the contracts deployed from packages/contracts
2. Update the SpatialAssets contract address that you got from the previous step in the subgraph.yaml (if needed and ensure the correct file is named according to the network of deployment - for ganache it should read as mainnet: backup the current subgraph.yamlfile and rename it to subgraphRopsten.yaml).
3. In another terminal, inside the graph-node folder, run `cd docker && docker-compose up`. If using Docker for WSL, Docker must be running on Windows. If graph-node throws an error try clearing the `data/postgres` folder, within the docker directory of graph-node, with `sudo rm -rf data/postgres`. Restart docker if needed and you are using WSL.
4. Generate subgraph typescript files with `yarn codegen`, then create and deploy the subgraph to the graph-node with `yarn create-local && yarn deploy-local`
5. You can query the subgraph and view the GeoDID tree in the local provided endpoint.

### Testing

The following query can be provided to the graphql endpoint to view the GeoDIDs tree (after doing the deployment steps above):

```
{
  geoDIDs {
    id
    owner
    cid
    storage
    root
    parent
    edges {
      id
      childGeoDID {
        id
      }
    }
    active
    type
  }
}
```
