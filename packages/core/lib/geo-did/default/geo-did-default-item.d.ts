import { ConcreteDefaultGeoDIDDocument } from './geo-did-default-document';
export declare class ConcreteDefaultGeoDIDItem extends ConcreteDefaultGeoDIDDocument {
    constructor();
    prepRootGeoDID(ethAddress: string): Promise<void>;
    prepChildGeoDID(ethAddress: string, parentid: string, path: string): Promise<void>;
}
