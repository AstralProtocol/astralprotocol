import { fetchJson } from "./utils"
import Document from './document'
import 

import { DID } from 'dids'

const ASTRAL_HOST = 'http://localhost:7007'

class AstralClient {
    // The API URL 
    private readonly _apiUrl: string
    // The Mapping of the Documents
    private readonly _docmap: Record<string, Document>

    //
    public readonly pin: PinApi
    public readonly context: Context

    constructor(){
        
    }

    // create GeoDID Document
    async createGeoDID(){

    }

    // 

}