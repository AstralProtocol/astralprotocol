import { Powergate } from './pin/powergate';
import { Document } from './docu/document';
import GeoDIDResolver from './resolver/geo-did-resolver';
import { Resolver, ServiceEndpoint } from 'did-resolver';
import { GeoDidType, IDocumentInfo, IPinInfo, IAsset, ILoadInfo } from './geo-did/interfaces/global-geo-did-interfaces';

export { GeoDidType, IDocumentInfo, IPinInfo, IAsset, ILoadInfo } from './geo-did/interfaces/global-geo-did-interfaces';

interface DocMap {
    [key: string]: InstanceInfo;
}

interface InstanceInfo {
    authToken: string;
    cid: string;
}

export class AstralClient {
    // geodidid -> cid
    docmap: DocMap;

    document: Document;

    powergate: Powergate;

    constructor(public _ethereumAddress: string, public _thegraphEndpoint = 'https://api.thegraph.com/subgraphs/name/astralprotocol/spatialassetsv06') {
        this.document = new Document(_ethereumAddress);
        this.docmap = {};
    }

    async getPowergateInstance(token?: string): Promise<Powergate> {
        let powergate: Powergate;

        if (token) {
            powergate = await Powergate.build(token);
        } else {
            powergate = await Powergate.build();
        }

        return powergate;
    }

    async createGenesisGeoDID(_typeOfGeoDID: string): Promise<IDocumentInfo> {
        let response: IDocumentInfo;

        try {
            // prints the geodidid of the genesis geodid
            response = await this.document.addGenesisDocument(_typeOfGeoDID);
        } catch (e) {
            console.log('Unable to initialize');
        }

        return response;
    }

    // Option to create Child GeoDID
    async createChildGeoDID(_typeOfGeoDID: string, _parentID: string, _path: string): Promise<IDocumentInfo> {
        let response: IDocumentInfo;

        try {
            response = await this.document.addChildDocument(_typeOfGeoDID, _parentID, _path);
        } catch (e) {
            console.log('Unable to initialize');
        }

        return response;
    }

    // must call getPowergateInstance before hand, in order to call pinDocument
    async pinDocument(documentInfo: IDocumentInfo, token?: string): Promise<IPinInfo> {
        let cid: string;
        let pinDate: Date = new Date();
        let powergate: Powergate;

        try {
            if (token) {
                powergate = await Powergate.build(token);
            } else {
                powergate = await Powergate.build();
            }
            token = await powergate.getToken();
            const stringdoc = JSON.stringify(documentInfo.documentVal);
            //console.log(stringdoc); // delete
            const uint8array = new TextEncoder().encode(stringdoc);
            //console.log(uint8array); // delete
            cid = await powergate.getAssetCid(uint8array);
            //console.log(cid); // delete
            await powergate.pin(cid);

            if (this.docmap[documentInfo.geodidid] === undefined) {
                this.docmap[documentInfo.geodidid] = {
                    authToken: token,
                    cid: cid,
                };
            } else {
                this.updateMapping(documentInfo.geodidid, cid);
            }

            console.log(this.docmap[documentInfo.geodidid]); // delete
        } catch (e) {
            console.log(e);
        }

        return { geodidid: documentInfo.geodidid, cid: cid, pinDate: pinDate, token: token };
    }

    updateMapping(docId: string, newCID: string): void {
        this.docmap[docId].cid = newCID;
    }

    async pinAsset(docId: string, powergate: Powergate, asset: IAsset): Promise<ServiceEndpoint> {
        let seCID: string;

        try {
            const uint8array = new TextEncoder().encode(asset.data);
            seCID = await powergate.getAssetCid(uint8array);
            await powergate.pin(seCID);
        } catch (e) {
            console.log(e);
        }

        return {
            id: docId.concat(asset.tag),
            type: asset.type,
            serviceEndpoint: seCID,
        };
    }

    // Add Assets to an item. Validation happens
    async addAssetsToItem(docId: string, assets: IAsset[], token?: string): Promise<IDocumentInfo> {
        let response: ILoadInfo;
        let service: ServiceEndpoint;

        try {
            response = await this.loadDocument(docId, token);
            let document_Info: IDocumentInfo = response.documentInfo;

            if ((response.documentInfo.documentVal.didmetadata.type).toLowerCase() == 'GeoDidType.Item') {
                for(let i = 0; i < assets.length; i++){
                    service = await this.pinAsset(docId, response.powergateInstance, assets[i]);
                    await document_Info.documentVal.service.push(service);
                }
            } else {
                throw new Error(
                    'Unfortunately the Document ID you provided is not of Item type, so you cannot add any Assets to this Document. Please try again with a valid GeoDID Item',
                );
            }

            return document_Info;
        } catch (e) {
            console.log(e);
        }
    }

    // TODO: Read/Load a GeoDID Document
    async loadDocument(docId: string, token: string): Promise<ILoadInfo> {
        let doc: any;
        const powergate: Powergate = await this.getPowergateInstance(token);

        try {
            const geoDidResolver = GeoDIDResolver.getResolver(this, powergate);
            const didResolver = new Resolver(geoDidResolver);
            doc = await didResolver.resolve(docId);

            return { documentInfo: { geodidid: docId, documentVal: doc }, powergateInstance: powergate };

        } catch (e) {
            console.log(e);
            throw e;
        }        
    }
}