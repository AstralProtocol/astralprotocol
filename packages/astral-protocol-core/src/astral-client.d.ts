import Document from './document';
import { GeoDocState } from './document';
import { Context } from "./context/context";
export interface AstralAPI {
    createGeoDID(stacjson: Object, ethereumAddress: string): Promise<any>;
    loadDocument(docId: string): Promise<any>;
}
export interface DocMap {
    [key: string]: Instance;
}
export interface Instance {
    authToken: string;
    cid: string;
    document: Document;
}
export interface SampleStac {
    stacitem: any;
}
export declare class AstralClient implements AstralAPI {
    private _docmap;
    readonly state: GeoDocState;
    readonly context: Context;
    private token;
    constructor();
    createGeoDID(stacjson: Object, ethereumAddress: string): Promise<any>;
    loadDocument(docId: string): Promise<any>;
}
