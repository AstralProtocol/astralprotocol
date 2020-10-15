import { GeoDocState } from './document';
import { Context } from "./context/context";
interface AstralAPI {
    createGeoDID(stacjson: Object, ethereumAddress: string): Promise<any>;
    loadDocument(docId: string): Promise<any>;
}
export default class AstralClient implements AstralAPI {
    private _docmap;
    readonly state: GeoDocState;
    readonly context: Context;
    private token;
    constructor();
    createGeoDID(stacjson: Object, ethereumAddress: string): Promise<any>;
    loadDocument(docId: string): Promise<any>;
}
export {};
