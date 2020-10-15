//import { fetchJson } from './utils'
import { Document, GeoDocState } from './document';
import { Context } from './context/context';
import { Powergate } from './pinning/powergate';

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
        const document = await Document.build(stacjson, ethereumAddress, powergate);

        // map the document
        await document.createGeoDIDDocument();

        const geodidid = await document.getGeoDidId();

        const doc = await document.loadcreateGeoDIDDocument();
        const stringdoc = JSON.stringify(doc);

        const uint8array = new TextEncoder().encode(stringdoc);
        const cid = await powergate.getAssetCid(uint8array);
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
                const bytes: Uint8Array = await powergate.getGeoDIDDocument(this._docmap[docId].cid);
                const strj = new TextDecoder('utf-8').decode(bytes);
                geoDidDoc = JSON.parse(strj);
            }
        } catch (err) {
            console.log(err);
        }
        return geoDidDoc;
    }
}

export default AstralClient;
