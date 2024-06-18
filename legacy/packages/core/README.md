# `@astralprotocol/core`

## Description

The @astralprotocol/core package is a Typescript NPM package that is responsible for any CRUD operations performed on the DID Documents. This includes the creation of DID Documents, loading the DID Documents, as well as updating them. The package also has utilities that enable the creation of the collision resistant GeoDID IDs, a custom did-resolver that enables DID Resolution, as well as pinning features for storing the Documents on IPFS or FFS. This package is meant to be used in conjunction with the @astralprotocol/contracts and @astralprotocol/subgraph packages. However, the package can also be used independently if the user does not want to rely on the Ethereum network.

## Setting up Powergate Locally with Localnet Mode

In order to store the GeoDIDs created by the core package, you will need to start up a local Powergate client or connect to an existing hosted client. Below will be a brief overview on how to setup a local Powergate client on your system. Further information is available at: https://github.com/textileio/powergate.

In order to setup the Powergate Client locally on your system you must have [Docker](https://docs.docker.com/engine/install/), [Docker-Compose](https://docs.docker.com/compose/install/), and [Go 1.16](https://golang.org/dl/) installed. 


In your terminal, create a new directory and clone the Powergate repo into it:

```git clone https://github.com/textileio/powergate.git```


After you clone the repo, enter the following commands:

```cd powergate/docker```

```make localnet```


More information regarding Powergate's Localnet mode, please refer to their documentation: https://github.com/textileio/powergate#localnet-mode

## To add Astral Protocol Core to your application

```yarn add -D @astralprotocol/core ```
OR
```npm install -D @astralprotocol/core```

```import AstralClient from '@astralprotocol/core';```
OR
```const AstralClient = require('@astralprotocol/core');```

## To develop or try the Astral Protocol Core locally

```
import AstralClient from '@astralprotocol/core';

async function run(){

    // Create a new Astral Client Instance with the user's ethAddress
    let astral = new AstralClient('0xa3e1c2602f628112E591A18004bbD59BDC3cb512');

    try{

        // Creates a Genesis GeoDID
        const genDocRes = await astral.createGenesisGeoDID('collection')
        console.log(genDocRes);

        // With the returned IDocumentInfo from the last function, we can pin it.
        // Since no token was specified the client will assign a new auth Token to the user.
        const results = await astral.pinDocument(genDocRes);
        console.log(results);

        const token = results.token;

        // With the Auth Token and the GeoDID ID we can load the document with the loadDocument function
        const loadResults = await astral.loadDocument(results.geodidid, token);
        console.log(loadResults);

        console.log('\n');
        console.log('\n');

        // Creates a Child GeoDID Item of the priviously created Genesis GeoDID
        const itemres = await astral.createChildGeoDID('item', results.geodidid, 'item1');
        console.log(itemres)

        console.log('\n');

        // With the returned IDocumentInfo from the last function, we can pin it.
        // This time we reuse the same token that was created earlier to pin the child document to the same instance.
        const itemresults = await astral.pinDocument(itemres, token);
        console.log(itemresults);

        console.log('\n');

        // With the Auth Token and the GeoDID ID we can load the document with the loadDocument function
        const loadItemResults = await astral.loadDocument(itemresults.geodidid, token);
        console.log(loadItemResults);

        console.log('\n');

        // Here we can display the string representation of the DID Document
        console.log(JSON.stringify(loadItemResults.documentInfo.documentVal));

    }catch(e){
        console.log(e);
    }

}

```
