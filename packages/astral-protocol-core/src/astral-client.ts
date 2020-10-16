//import { fetchJson } from './utils'
import { GeoDocument, GeoDocState } from './geo-document';
import { Context } from './context/context';
import { Powergate } from './pin/powergate';

// The Astral API Interface
interface AstralAPI {
    createGeoDID(stacjson: Object, ethereumAddress: string): Promise<any>;
    loadDocument(docId: string): Promise<any>;
}

interface DocMap {
    [key: string]: Instance;
}

interface Instance {
    authToken: string;
    cid: string;
    document: Document;
}

class AstralClient implements AstralAPI {
    // GeoDID id -> Instance
    //private _docmap: Record<string, Instance>
    private _docmap: DocMap;

    
    //private geoDidDoc: Record<string, Object>
    // Manages the Context of the Astral Instance, GeoDocType Instance, and the Powergate Instance
    public readonly context: Context;

    constructor() {
        this.context = { astral: this };
        this._docmap = {};
    }

    // astral.createGeoDID(stacitem)
    async createGeoDID(stacjson: Object, ethereumAddress: string): Promise<any> {
        // create powergate instance
        const powergate = await Powergate.build();

        // create the Document with the assets (CIDS) and the stacmetadata (Document instance)
        const document = await GeoDocument.build(stacjson, ethereumAddress, powergate);
        console.log(document)
        // map the document
        await document.createGeoDIDDocument();

        const geodidid = await document.getGeoDidId();
        console.log(geodidid)
        const doc = await document.constructGeoDIDDocument();
        console.log(doc)
        const stringdoc = JSON.stringify(doc);
        console.log(stringdoc)

        const uint8array = new TextEncoder().encode(stringdoc);
        console.log(uint8array)
        const cid = await powergate.getAssetCid(uint8array);
        console.log(cid)
        await powergate.pin(cid);

        // pin it to powergate
        this._docmap[geodidid] = {
            authToken: await powergate.getToken(),
            cid: cid,
            document: document,
        };

        return geodidid;
    }

    async loadDocument(docId: string): Promise<any> {
        let geoDidDoc: Object = new Object();
        try {
            if (this._docmap[docId]) {
                const powergate = await Powergate.build(this._docmap[docId].authToken);
                console.log(powergate)
                const bytes: Uint8Array = await powergate.getGeoDIDDocument(this._docmap[docId].cid);
                console.log(bytes)
                const strj = new TextDecoder('utf-8').decode(bytes);
                console.log(strj)
                geoDidDoc = JSON.parse(strj);
                console.log(geoDidDoc)
            }
        } catch (err) {
            console.log(err);
        }
        return geoDidDoc;
    }
}

export default AstralClient;
