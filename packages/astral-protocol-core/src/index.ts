import {  AstralClient } from "./astral-client";
import data from "./data/stacitem.json"
import fs from "fs"



let astral = new AstralClient()

async function runApp(){
    const geodidid = await astral.createGeoDID(data, '0xcF56B3442eBC30EDe0838334419b5a80eEa45da8');
    console.log(geodidid)
    const geodiddoc = await astral.loadDocument(geodidid);
    console.log(geodiddoc)
};

runApp();
//const buffer = fs.readFileSync(`./data/pic.png`)
//console.log(typeof(buffer))

//console.log(buffer)
