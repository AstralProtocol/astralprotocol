//import { fetchJson } from './utils'
import Document from './document'
import { GeoDocState } from './document'
import { Context } from "./context/context"
import { Powergate } from "./pinning/powergate"

// The Astral API Interface
export interface AstralAPI {
    createGeoDID(stacjson:Object, ethereumAddress: string): Promise<any>;
    loadDocument(docId: string): Promise<any>;
}

export interface DocMap{
    [key: string]: Instance
}

export interface Instance {
    authToken: string;
    cid: string;
    document: Document;
}

export interface SampleStac{
    stacitem: any;
}


class AstralClient implements AstralAPI{

    // GeoDID id -> Instance
    //private _docmap: Record<string, Instance>
    private _docmap: DocMap

    // Manaages the Geo Document State 
    public readonly state:GeoDocState
    // Manages the Context of the Astral Instance, GeoDocType Instance, and the Powergate Instance
    public readonly context: Context

    private token: any

    constructor(){ 
        this.context = { astral: this }
        this._docmap = {}
    }

    // astral.createGeoDID(stacitem)
    async createGeoDID(stacjson:Object, ethereumAddress: string): Promise<any> {
        // create powergate instance 
        let powergate = await Powergate.build();

        // create the Document with the assets (CIDS) and the stacmetadata (Document instance)
        let document = new Document(this.state, stacjson, ethereumAddress, powergate)

        await document.scrapeStac()
        
        // map the document
        await document.createGeoDIDDocument()

        const geodidid = await document.getGeoDidId()

        let doc = await document.loadcreateGeoDIDDocument()
        let stringdoc = JSON.stringify(doc)
        
        var uint8array = new TextEncoder().encode(stringdoc)
        const cid = await powergate.getAssetCid(uint8array)
        await powergate.pin(cid)

        // pin it to powergate
        this._docmap[geodidid] = {
                authToken: await powergate.getToken(),
                cid: cid,
                document: document
            }

        return geodidid
    }

    async loadDocument(docId: string): Promise<any> {
        let geoDidDoc: Object;
        try{
            if(this._docmap[docId]){
                let powergate = await Powergate.build(this._docmap[docId].authToken)
                let bytes: Uint8Array = await powergate.getGeoDIDDocument(this._docmap[docId].cid)
                var strj = new TextDecoder("utf-8").decode(bytes);
                geoDidDoc = JSON.parse(strj)
            }
        }
        catch(err){
            console.log(err)
        }
        return geoDidDoc
    }


}

export default AstralClient
