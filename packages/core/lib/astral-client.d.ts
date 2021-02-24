import { Powergate } from './pin/powergate';
import { Document } from './docu/document';
import { ServiceEndpoint } from 'did-resolver';
import { IDocumentInfo, IPinInfo, IAsset, ILoadInfo } from './geo-did/interfaces/global-geo-did-interfaces';
import { GraphQLClient } from 'graphql-request';
export { GeoDidType, IDocumentInfo, IPinInfo, IAsset, ILoadInfo } from './geo-did/interfaces/global-geo-did-interfaces';
interface DocMap {
    [key: string]: InstanceInfo;
}
interface InstanceInfo {
    authToken: string;
    cid: string;
}
export declare class AstralClient {
    _ethereumAddress: string;
    docmap: DocMap;
    document: Document;
    powergate: Powergate;
    graphQLClient: GraphQLClient;
    constructor(_ethereumAddress: string);
    getPowergateInstance(token?: string): Promise<Powergate>;
    createGenesisGeoDID(_typeOfGeoDID: string): Promise<IDocumentInfo>;
    createChildGeoDID(_typeOfGeoDID: string, _parentID: string, _path: string): Promise<IDocumentInfo>;
    pinDocument(documentInfo: IDocumentInfo, token?: string): Promise<IPinInfo>;
    updateMapping(docId: string, newCID: string): void;
    pinAsset(docId: string, powergate: Powergate, asset: IAsset): Promise<ServiceEndpoint>;
    addAssetsToItem(docId: string, assets: IAsset[], token?: string): Promise<IDocumentInfo>;
    loadDocument(docId: string, token: string): Promise<ILoadInfo>;
}
