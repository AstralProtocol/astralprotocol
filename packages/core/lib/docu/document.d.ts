import { IDocumentInfo } from '../geo-did/interfaces/global-geo-did-interfaces';
export declare class Document {
    _ethereumAddress: string;
    constructor(_ethereumAddress: string);
    addGenesisDocument(_typeOfGeoDID: string): Promise<IDocumentInfo>;
    addChildDocument(_typeOfGeoDID: string, _parentID: string, _path: string): Promise<IDocumentInfo>;
}
