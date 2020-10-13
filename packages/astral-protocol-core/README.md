# `astral-protocol-core`

> TODO: description

## Usage

```
import {  AstralClient } from "./astral-client";
import data from "./data/stacitem.json"
import { createPow } from "@textile/powergate-client"


//const host = "http://40.114.81.87:6002"

//const pow = createPow({ host })

let astral = new AstralClient()

async function runApp(){

    // create GeoDIDDoc and receive the geodid id 
    const geodidid = await astral.createGeoDID(data, '0xcF56B3442eBC30EDe0838334419b5a80eEa45da8');
    
    // Use the resolver to obtain the did document itself 
    // did:geo:0xcF56B3442eBC30EDe0838334419b5a80eEa45da8
    const geodiddoc = await astral.loadDocument(geodidid);    

};

runApp()

```
