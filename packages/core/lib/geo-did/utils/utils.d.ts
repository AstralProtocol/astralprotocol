export declare class GeoDoctypeUtils {
    static validator: any;
    static getBaseGeoDidId(docId: string): string;
    static createGeodidIdFromGenesis(_id: string): Promise<string>;
    static normalizeDocId(docId: string): string;
    static getGenesis(docId: string): string;
    static createCID(_id: string): Promise<string>;
}
