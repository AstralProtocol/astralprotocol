import { Powergate } from './pin/powergate';
import { Document } from './docu/document';
import { GeoUtils } from './utils/geo-utils';
import GeoDIDResolver from './resolver/geo-did-resolver';
import { DIDDocument, Resolver, ServiceEndpoint } from 'did-resolver';
import { GeoDidType, IDocumentInfo, IPinInfo, IAsset, ILoadInfo, IAssetInfo } from './geo-did/interfaces/global-geo-did-interfaces';

export { GeoDidType, IDocumentInfo, IPinInfo, IAsset, ILoadInfo } from './geo-did/interfaces/global-geo-did-interfaces';

export class AstralClient {
    document: Document;

    constructor(public _ethereumAddress: string, public _thegraphEndpoint: string, public _token: string) {
        this.document = new Document(_ethereumAddress);
    }

    static async build(_ethereumAddress: string, _thegraphEndpoint = 'https://api.thegraph.com/subgraphs/name/astralprotocol/spatialassetsfinalv1', _token?: string): Promise<AstralClient> {
        try{
            const powergate = await Powergate.build(_token);
            let token: string = '';
            if(_token) token = _token;
            else token = await powergate.getToken();

            return new AstralClient(_ethereumAddress, _thegraphEndpoint, token);
        }catch(e){
            throw e;
        }
    }

    getInstanceToken(): string {
        return this._token;
    }

    async createGenesisGeoDID(_typeOfGeoDID: string, assets?: IAsset[]): Promise<IDocumentInfo> {
        try {
            const response: IDocumentInfo = await this.document.addGenesisDocument(_typeOfGeoDID, this._token, assets);
            return response;
        } catch (e) {
            console.log('Unable to initialize');
            throw e;
        }
    }

    async createChildGeoDID(_typeOfGeoDID: string, _parentID: string, _path: string, assets?: IAsset[]): Promise<IDocumentInfo> {
        try {
            const response: IDocumentInfo = await this.document.addChildDocument(_typeOfGeoDID, _parentID, _path, this._token, assets);
            return response;
        } catch (e) {
            console.log('Unable to initialize');
            throw e;
        }
    }

    async pinDocument(documentInfo: IDocumentInfo): Promise<IPinInfo> {
        try {
            const pinDate: Date = new Date();
            const powergate: Powergate = await GeoUtils.getPowergateInstance(this._token);
            const stringdoc = JSON.stringify(documentInfo.documentVal);
            const uint8array = new TextEncoder().encode(stringdoc);
            const cid: string = await powergate.getAssetCid(uint8array);
            await powergate.pin(cid);

            return { geodidid: documentInfo.geodidid, cid: cid, pinDate: pinDate, token: this._token };
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async pinAsset(docId: string, powergate: Powergate, asset: IAsset): Promise<ServiceEndpoint> {
        try {
            const uint8array = new TextEncoder().encode(asset.data);
            const seCID: string = await powergate.getAssetCid(uint8array);
            await powergate.pin(seCID);

            return {
                id: docId.concat(`#${asset.tag}`),
                type: asset.type,
                serviceEndpoint: seCID,
            };

        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    // Add Assets to an item. Validation happens
    async addAssetsToItem(docId: string, assets: IAsset[]): Promise<IDocumentInfo> {
        let response: ILoadInfo;
        let service: ServiceEndpoint;

        try {
            response = await this.loadDocument(docId);
            let document_Info: IDocumentInfo = response.documentInfo;

            if ((document_Info.documentVal.didmetadata.type).toLowerCase() == GeoDidType.Item ) {
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
            throw e;
        }
    }

    // TODO: Read/Load a GeoDID Document
    async loadDocument(docId: string): Promise<ILoadInfo> {

        try {
            const powergate: Powergate = await GeoUtils.getPowergateInstance(this._token);
            const geoDidResolver = GeoDIDResolver.getResolver(this, powergate);
            const didResolver = new Resolver(geoDidResolver);
            const doc: DIDDocument = await didResolver.resolve(docId);

            return { documentInfo: { geodidid: docId, documentVal: doc }, powergateInstance: powergate };

        } catch (e) {
            console.log(e);
            throw e;
        }        
    }

    // must have a fragment and token of the
    async loadAsset(doc: DIDDocument, docId: string): Promise<IAssetInfo> {

        try {
            const powergate: Powergate = await GeoUtils.getPowergateInstance(this._token);
            
            const services: Array<ServiceEndpoint> = doc.service;
            
            for(let i = 0; i < services.length; i++){
                if(services[i].id == docId){
                    const asset_cid = services[i].serviceEndpoint; 
                    var bytes: Uint8Array = await powergate.getFromPowergate(asset_cid);
                    var type = services[i].type;

                    break;
                } 
            }

            return {id: docId, type: type, data: bytes};

        } catch (e) {
            console.log(e);
            throw e;
        }        
    }
}