import {  AstralClient } from "./astral-client";
import data from "./data/stacitem.json"
import { createPow } from "@textile/powergate-client"


//const host = "http://40.114.81.87:6002"

//const pow = createPow({ host })

let astral = new AstralClient()

async function runApp(){
    /**
     * @params data - STAC Item
     * @params ethereum address
     */
    const geodidid = await astral.createGeoDID(data, '0xcF56B3442eBC30EDe0838334419b5a80eEa45da8');
    console.log(geodidid)

    //pow.setToken(token)

    
    // did:geo:0xcF56B3442eBC30EDe0838334419b5a80eEa45da8
    // did:geo:0xcF56B3442eBC30EDe0838334419b5a80eEa45da8#analytics
    const geodiddoc = await astral.loadDocument(geodidid);
    console.log(geodiddoc)
    /*
    let cid = geodiddoc.service[0].serviceEndpoint
    const bytes = await this.pow.ffs.get(cid)
    let strj = new TextDecoder("utf-8").decode(bytes);
    const file = JSON.parse(strj)*/

    // powergate get the service endpoints
};

runApp()


