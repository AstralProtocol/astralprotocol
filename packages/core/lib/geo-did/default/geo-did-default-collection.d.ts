import { ConcreteDefaultGeoDIDDocument } from './geo-did-default-document';
export declare class ConcreteDefaultGeoDIDCollection extends ConcreteDefaultGeoDIDDocument {
    constructor();
    getGeoDIDid(): string;
    prepRootGeoDID(ethAddress: string): Promise<void>;
    prepChildGeoDID(ethAddress: string, parentid: string, path: string): Promise<void>;
}
