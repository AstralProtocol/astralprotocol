import { IAbstractGeoDIDDocument } from '../interfaces/factory-interfaces';
import { GeoDIDDocument, IMetadata, ILinks, GeoDidType, Relationship } from '../interfaces/global-geo-did-interfaces';
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
    prepChildGeoDID(ethAddress: string, parentid: string, path: string) {
        throw new Error('Method not implemented.');
    }

    public async prepRootGeoDID(ethAddress: string){
        
        // create the GeoDID Identifier
        try{
            const geoId = await GeoDoctypeUtils.createGeodidIdFromGenesis(ethAddress);
            this.geoDIDid = GeoDoctypeUtils.normalizeDocId(geoId);
    
            this.publicKey = [
                {
                    id: this.geoDIDid.concat('#controller'),
                    type: 'Secp256k1VerificationKey2018',
                    controller: this.geoDIDid,
                    ethereumAddress: ethAddress
                }
            ];
            
            this.didmetadata = {
                type: GeoDidType.Default,
                created: new Date()
            };
            
            this.links = [
                {
                    id: this.geoDIDid,
                    type: GeoDidType.Default,
                    rel: Relationship.Root
                },
                {
                    id: this.geoDIDid,
                    type: GeoDidType.Default,
                    rel: Relationship.Self
                }
            ]

            this.serviceEndpoint = []

            this.buildDocument();
        }
        catch(e){
            console.log(e);
        }
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