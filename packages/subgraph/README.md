# astral-protocol-subgraph

## Running the subgraph locally

For more information see the docs on https://thegraph.com/docs/

### Prerequisites

- Run `sudo apt-get install libsecret-1-dev`
- [Docker Instalation](https://docs.docker.com/install/linux/docker-ce/debian/)
- Run `git clone https://github.com/graphprotocol/graph-node/` (check setup instructions for docker version)

### Deployment

1. Run a blockchain, e.g. ganache, in a separate terminal with the script in package.json (root folder): `yarn ganache`
2. Deploy contracts from `contracts`with `yarn truffle` in the root folder. Update addresses in the subgraph configuration if needed
3. In a third terminal, inside the graph-node folder, run `cd docker && docker-compose up`. If using Docker for WSL, Docker must be running on Windows. If graph-node throws an error try clearing the `data/postgres` folder, within the docker directory of graph-node, with `sudo rm -rf data/postgres`. Restart docker if needed (WSL)
4. Generate subgraph typescript files with `yarn codegen`, then create and deploy the subgraph to the graph-node with `yarn create-local && yarn deploy-local`
