//import { fetchJson } from './utils'
//import Document from './document'
import { Context } from "./context/context"
import { Powergate } from "./powergate/powergate-pinning"
import { GeoDocState, GeoDoctype} from "./geo-doctype/geo-tile-doctype"
import { GeoDoctypeUtils } from "./geo-doctype/utils/geo-tile-utils"
import { StacItemExtension } from "./powergate/stac-item-scraper"

import { DID } from 'dids'

// The Astral API Interface
export interface AstralAPI {
    createGeoDID(): Promise<any>;
    loadGeoDocument(): Promise<Document>;
}

export interface SampleStac{
    stacitem: any;
}

export class AstralClient {
    // The Mapping of the Documents for storing
    private readonly _docmap: Record<string, Document>
    // The GeoDoctypeHandler -- we only have one as of right now 
    //public readonly _doctypeHandlers: Record<string, GeoDoctypeHandler>

    // Manaages the Geo Document State 
    public readonly geodocstate:GeoDocState
    // Manages the Context of the Astral Instance, GeoDocType Instance, and the Powergate Instance
    public readonly context: Context

    
    constructor(context: Context){ 
        this.context = { astral: this }
        this._docmap = {}
    }

    // get the from the Context 
    get(): DID | undefined {
        return this.context.did
    }

    // astral.createGeoDID(stacitem)
    async createGeoDID(stacjson:Object): Promise<any> {

        // scrape the sampledata and pin perform the pinning 
        let stac = new StacItemExtension(stacjson, this.context)

        // should return the metadata from the Stac Item (StacItem Instance)
        const stacmetadata = stac.getStacItemMetadata();
        
        // return a list of the assets (StacItem Instance)
        const services = stac.getServices();

        // pin the assets (StacItem Instance)
        

        // create CID for Document identifier (Function in Utils)

        // create the Document with the assets (CIDS) and the stacmetadata (Document instance)

        // map the document

        // return the making identifier ( the geo did string )
        
        // 4) map the document in a Record for the Doctype Instance 

        // 5) return the document mapping
        
    }

    async loadGeoDocument(): Promise<Document> {
        // call the load function in document.ts
        throw new Error("Method not implemented.")
    }

    async createCID(){
        
    }

}
