import {  AstralClient } from "./astral-client";
import data from "./data/stacitem.json"
import fs from "fs"



let astral = new AstralClient()

astral.createGeoDID(data, '0xcF56B3442eBC30EDe0838334419b5a80eEa45da8');

//const buffer = fs.readFileSync(`./data/pic.png`)
//console.log(typeof(buffer))

//console.log(buffer)
