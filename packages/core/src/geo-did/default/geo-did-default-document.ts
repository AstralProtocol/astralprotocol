import { IAbstractGeoDIDDocument } from '../interfaces/factory-interfaces';
import { GeoDIDDocument, IMetadata, ILinks, GeoDidType, Relationship, IAsset } from '../interfaces/global-geo-did-interfaces';
import { GeoDoctypeUtils } from '../doctype-utils/geo-doctype-utils';
import { ServiceEndpoint, PublicKey } from 'did-resolver';


export class ConcreteDefaultGeoDIDDocument implements IAbstractGeoDIDDocument{

    public label: string;
    public geoDIDid: string;
    public doctype: string;

    protected publicKey: PublicKey[];
    protected didmetadata: IMetadata;
    protected links: ILinks[];
    protected serviceEndpoint: ServiceEndpoint[];
    protected geoDID: GeoDIDDocument;
    
    // Need a specific type later 
    constructor(){}

    buildDocument(){
        this.geoDID = {
                '@context':'https://w3id.org/did/v1',
                id: this.geoDIDid,
                publicKey: this.publicKey,
                didmetadata: this.didmetadata,
                links: this.links,
                service: this.serviceEndpoint
        };
    }

    // not implemented for the Base Class
    async prepChildGeoDID(_ethAddress: string, _parentid: string, _path: string, _token: string): Promise<void> {
        throw new Error('Method not implemented for Default.');
    }

    async prepRootGeoDID(_ethAddress: string, _token: string): Promise<void>{
        throw new Error('Method not implemented for Default.');
    }

    public getDocType(): string{
        return this.doctype;
    }

    public getDidDocument(): string {
        return JSON.stringify(this.geoDID);
    }

    public getGeoDIDid(): string {
        return this.geoDIDid;
    }

}