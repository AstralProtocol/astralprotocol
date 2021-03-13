import { ConcreteDefaultGeoDIDDocument } from './geo-did-default-document';
import { GeoDidType, Relationship } from '../interfaces/global-geo-did-interfaces';
import { GeoDoctypeUtils } from '../utils/utils';

export class ConcreteDefaultGeoDIDItem extends ConcreteDefaultGeoDIDDocument{

    constructor(){
        super();
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
                type: GeoDidType.Item,
                created: new Date()
            };
            
            this.links = [
                {
                    id: this.geoDIDid,
                    type: GeoDidType.Item, 
                    rel: Relationship.Root
                },
                {
                    id: this.geoDIDid,
                    type: GeoDidType.Item,
                    rel: Relationship.Self
                }
            ];

            this.serviceEndpoint = [];

            this.buildDocument();
        }
        catch(e){
            console.log(e);
        }
    }

    public async prepChildGeoDID(ethAddress: string, parentid: string, path: string){
        this.geoDIDid = parentid.concat('/' + path);
        const rootGeoDID = GeoDoctypeUtils.getBaseGeoDidId(parentid);
        
        this.publicKey = [
            {
                id: this.geoDIDid.concat('#controller'),
                type: 'Secp256k1VerificationKey2018',
                controller: this.geoDIDid,
                ethereumAddress: ethAddress
            }
        ];

        this.didmetadata = {
            type: GeoDidType.Item,
            created: new Date()
        };
        
        this.links = [
            {
                id: rootGeoDID,
                type: GeoDidType.Collection, 
                rel: Relationship.Root
            },
            {
                id: this.geoDIDid,
                type: GeoDidType.Item,
                rel: Relationship.Self
            },
            {
                id: parentid,
                type: GeoDidType.Collection,
                rel: Relationship.Parent
            }
        ];

        this.serviceEndpoint = [];

        this.buildDocument();
        
    }  

}