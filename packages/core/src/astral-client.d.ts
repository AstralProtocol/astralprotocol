import { Context } from './context/context';
interface AstralAPI {
    createGeoDID(stacjson: Object, ethereumAddress: string): Promise<any>;
    loadDocument(docId: string): Promise<any>;
}
declare class AstralClient implements AstralAPI {
    private docmap;
    readonly context: Context;
    constructor();
    createGeoDID(stacjson: Object, ethereumAddress: string): Promise<string>;
    loadDocument(docId: string): Promise<Object>;
}
export default AstralClient;
