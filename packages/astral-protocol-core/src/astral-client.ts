//import { fetchJson } from './utils'
//import Document from './document'
import { Context } from "./context/context"
import { Powergate } from "./pinning/powergate"
import { GeoDocState, GeoDoctype} from "./geo-document/geo-did-doc"
import { GeoDoctypeUtils } from "./utils/utils"
import { Transformer } from "./transformer/transformer"
import fs from "fs"
import { DIDResolver } from 'did-resolver'
import { IStacItemMetadata, IGeometry, IProperties, IService, IAssetList} from "./geo-document/geo-did-spec"
//import Geo from './geo-document/geo-did-resolver'

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
    async createGeoDID(stacjson:Object): Promise<any> {
        
        // create powergate instance 
        let powergate = await Powergate.build();

        // scrape the sampledata and pin perform the pinning 
        let stac = new Transformer(stacjson, powergate, this.context)

        // return the normalized GeoDID
        const normalizedGeoDidId = await stac.getGeoDIDid();
        console.log(normalizedGeoDidId + '\n')

        // should return the metadata from the Stac Item (StacItem Instance)
        const stacmetadata = await stac.getStacItemMetadata();
        console.log(stacmetadata)

        // Pin the assets in the STAC Item
        await stac.pinDocumentAssets()
        
        // return a list of the assets (StacItem Instance)
        const services = stac.getServices();
        console.log(services)

        // create the Document with the assets (CIDS) and the stacmetadata (Document instance)
        //let document = new Document(stacmetadata, services)
        
        // map the document

        // return the making identifier ( the geo did string )

        // 4) map the document in a Record for the Doctype Instance 

        // 5) return the document mapping
        
    }

    async loadGeoDocument(geodid: string): Promise<Document> {
        // call the load function in document.ts
        throw new Error("Method not implemented.") 
        
        //const geoResolver = Geo.getResolver()
        //const resolver = new DIDResolver(geoResolver)

        //const doc = await resolver.resolve('did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123')
    }

}
