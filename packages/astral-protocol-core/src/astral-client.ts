//import { fetchJson } from './utils'
import Document from './document'
import { Context } from "./context/context"
import data from './data/stacitem.json'
import { GeoDocState, GeoDoctype } from "./geo-doctype/geo-tile-doctype"

import { DID } from 'dids'

const ASTRAL_HOST = 'http://localhost:7007'

// The Astral API Interface
export interface AstralAPI {
    createGeoDID(): Promise<Document>;
    loadGeoDocument(): Promise<Document>;
}

export interface SampleStac{
    stacitem: any;
}

export class AstralClient implements AstralAPI{
    // The Mapping of the Documents
    private readonly _docmap: Record<string, Document>

    // Manaages the Geo Document State 
    public readonly geodocstate:GeoDocState
    // Manages the Context of the Astral Instance, GeoDocType Instance, and the Powergate Instance
    public readonly context: Context

    constructor(context: Context, sampledata: SampleStac){ 
        this.context.astral = this
        sampledata = <any>data; // initialize the sample data 
    }

    // get the from the Context 
    get(): DID | undefined {
        return this.context.did
    }

    async createGeoDID<T extends GeoDoctype>(): Promise<T> {
        // 1) DoctypeUtil fucntion that will make the GeoDID Specific Id
    
        // 2) call the createFromGenesis Function in Document to create the Document (param: geo_id )
        const doc = await Document.createFromGenesis(this._apiUrl, genesis, this.context, opts)

        // 3) Normalize the GeoDID ID 
        const normalizedId = DoctypeUtils.normalizeDocId(doc.id)
        if (!this._docmap[normalizedId]) {
            this._docmap[normalizedId] = doc
        }
        // 4) map the document in a Record for the Doctype Instance 

        // 5) return the document mapping
        //return this._docmap[normalizedId] as unknown as T
    }

    async loadGeoDocument(): Promise<Document> {
        // call the load function in document.ts
        throw new Error("Method not implemented.")
    }

}

// TODO: 

// script 1: scrape the sampledata for the metadata that we will push to the geoDID

// script 2: Pin the Assets to Powergate

// Keep Record of the Asset to CID

// Then create the final GeoDID Document 

// Upload the GeoDID Document to FFS and keep record of the GeoDIDs CID (GeoDID -> CID)