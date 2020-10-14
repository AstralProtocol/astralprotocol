export declare class GeoDoctypeUtils {
    static validator: any;
    static encodeGeoIdentifier(_stacid: string, _ethereumAddress: string): Promise<any>;
    static createGeodidIdFromGenesis(_stacid: string, _ethereumAddress: string): Promise<string>;
    static normalizeDocId(docId: string): string;
    static getGenesis(docId: string): string;
    static createCID(_stacid: string, _ethereumAddress: string): Promise<string>;
}
