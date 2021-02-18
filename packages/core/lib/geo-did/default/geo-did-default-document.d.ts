import { IAbstractGeoDIDDocument } from '../interfaces/factory-interfaces';
import { GeoDIDDocument, IMetadata, ILinks } from '../interfaces/global-geo-did-interfaces';
import { ServiceEndpoint, PublicKey } from 'did-resolver';
export declare class ConcreteDefaultGeoDIDDocument implements IAbstractGeoDIDDocument {
    label: string;
    geoDIDid: string;
    doctype: string;
    protected publicKey: PublicKey[];
    protected didmetadata: IMetadata;
    protected links: ILinks[];
    protected serviceEndpoint: ServiceEndpoint[];
    protected geoDID: GeoDIDDocument;
    constructor();
    buildDocument(): void;
    prepChildGeoDID(ethAddress: string, parentid: string, path: string): void;
    prepRootGeoDID(ethAddress: string): Promise<void>;
    getDocType(): string;
    getDidDocument(): string;
    getGeoDIDid(): string;
}
