import {  AstralClient } from "./astral-client";
import data from "./data/stacitem.json"
import fs from "fs"



let astral = new AstralClient()


astral.createGeoDID(data);

//const buffer = fs.readFileSync(`./data/pic.png`)
//console.log(typeof(buffer))

//console.log(buffer)
