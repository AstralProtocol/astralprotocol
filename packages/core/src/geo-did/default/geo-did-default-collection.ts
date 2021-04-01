import { ConcreteDefaultGeoDIDDocument } from './geo-did-default-document';
import { GeoDidType, Relationship } from '../interfaces/global-geo-did-interfaces';
import { GeoDoctypeUtils } from '../doctype-utils/geo-doctype-utils';

export class ConcreteDefaultGeoDIDCollection extends ConcreteDefaultGeoDIDDocument {

    constructor(){super()}

    public getGeoDIDid(): string {
        return this.geoDIDid;
    }

    public async prepRootGeoDID(_ethAddress: string, _host: string, _token: string): Promise<void>{
        
        // create the GeoDID Identifier
        try{
            const geoId = await GeoDoctypeUtils.createGeodidIdFromGenesis(_ethAddress);
            this.geoDIDid = GeoDoctypeUtils.normalizeDocId(geoId);

            this.publicKey = [
                {
                    id: this.geoDIDid.concat('#controller'),
                    type: 'Secp256k1VerificationKey2018',
                    controller: this.geoDIDid,
                    ethereumAddress: _ethAddress
                }
            ];

            this.didmetadata = {
                type: GeoDidType.Collection,
                created: new Date()
            };
            
            this.links = [
                {
                    id: this.geoDIDid,
                    type: GeoDidType.Collection, 
                    rel: Relationship.Root
                },
                {
                    id: this.geoDIDid,
                    type: GeoDidType.Collection,
                    rel: Relationship.Self
                }
            ]

            this.serviceEndpoint = []

            this.buildDocument();
        }
        catch(e){
            throw e;
        }
    }

    public async prepChildGeoDID(_ethAddress: string, _parentid: string, _path: string, _host: string, _token: string): Promise<void>{
        this.geoDIDid = _parentid.concat('/' + _path);
        const rootGeoDID = GeoDoctypeUtils.getBaseGeoDidId(_parentid);
        
        this.publicKey = [
            {
                id: this.geoDIDid.concat('#controller'),
                type: 'Secp256k1VerificationKey2018',
                controller: this.geoDIDid,
                ethereumAddress: _ethAddress
            }
        ];

        this.didmetadata = {
            type: GeoDidType.Collection,
            created: new Date()
        };
        
        this.links = [
            {
                id: this.geoDIDid,
                type: GeoDidType.Collection, 
                rel: Relationship.Root
            },
            {
                id: this.geoDIDid,
                type: GeoDidType.Collection,
                rel: Relationship.Self
            },
            {
                id: _parentid,
                type: GeoDidType.Collection,
                rel: Relationship.Parent
            }
        ];

        this.serviceEndpoint = [];

        this.buildDocument();
    }
    
}