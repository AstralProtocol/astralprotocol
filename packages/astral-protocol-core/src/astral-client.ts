//import { fetchJson } from './utils'
import Document from './document'
import { GeoDocState } from './document'
import { Context } from "./context/context"
import { Powergate } from "./pinning/powergate"
import { GeoDoctypeUtils } from "./geo-did-utils/utils"
import { Transformer } from "./transformer/transformer"
//import Geo from './geo-document/geo-did-resolver'

import { DID } from 'dids'

// The Astral API Interface
export interface AstralAPI {
    createGeoDID(stacjson:Object, ethereumAddress: string): Promise<any>;
    loadDocument(docId: string): Promise<Document>;
}

export interface SampleStac{
    stacitem: any;
}

export class AstralClient implements AstralAPI{
    // The Mapping of the Documents for storing
    private readonly _docmap: Record<string, Document>
    // The GeoDoctypeHandler -- we only have one as of right now 
    //public readonly _doctypeHandlers: Record<string, GeoDoctypeHandler>

    // Manaages the Geo Document State 
    public readonly state:GeoDocState
    // Manages the Context of the Astral Instance, GeoDocType Instance, and the Powergate Instance
    public readonly context: Context

    private token: any

    constructor(){ 
        this.context = { astral: this }
        this._docmap = {}
    }

    // get the from the Context 
    get(): DID | undefined {
        return this.context.did
    }

    // astral.createGeoDID(stacitem)
    async createGeoDID(stacjson:Object, ethereumAddress: string): Promise<any> {
        // create powergate instance 
        let powergate = await Powergate.build();

        // create the Document with the assets (CIDS) and the stacmetadata (Document instance)
        let document = new Document(this.state, stacjson, ethereumAddress, powergate)

        await document.scrapeStac()
        
        // map the document

        // return the making identifier ( the geo did string )

        // 4) map the document in a Record for the Doctype Instance 

        // 5) return the document mapping
        
    }

    async loadDocument(docId: string): Promise<Document> {
        throw new Error('Method not implemented.')
    }


}
