import { ConcreteDefaultGeoDIDDocument } from './geo-did-default-document';
import { GeoDidType, Relationship, IAsset } from '../interfaces/global-geo-did-interfaces';
import { GeoDoctypeUtils } from '../doctype-utils/geo-doctype-utils';
import { GeoUtils } from '../../utils/geo-utils';
import { Powergate } from '../../pin/powergate';
import { ServiceEndpoint } from 'did-resolver';

export class ConcreteDefaultGeoDIDItem extends ConcreteDefaultGeoDIDDocument{

    constructor(){
        super();
    }
    
    public async prepRootGeoDID(ethAddress: string, assets?: IAsset[]){
        
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

            if(assets){
                this.serviceEndpoint = await this.addAssetsToGenesisItem(assets);
            }
            else{
                this.serviceEndpoint = [];
            }

            this.buildDocument();
        }
        catch(e){
            console.log(e);
        }
    }

    public async prepChildGeoDID(ethAddress: string, parentid: string, path: string,  assets?: IAsset[]){
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

        if(assets){
            this.serviceEndpoint = await this.addAssetsToGenesisItem(assets);
        }
        else{
            this.serviceEndpoint = [];
        }

        this.buildDocument();
        
    }

    async pinAsset(_powergate: Powergate, _asset: IAsset): Promise<ServiceEndpoint> {
        try {
            const uint8array = new TextEncoder().encode(_asset.data);
            const seCID: string = await _powergate.getAssetCid(uint8array);
            await _powergate.pin(seCID);

            return {
                id: this.geoDIDid.concat(`#${_asset.tag}`),
                type: _asset.type,
                serviceEndpoint: seCID,
            };

        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async addAssetsToGenesisItem(assets: IAsset[]): Promise<any> {

        // by default creates new instance
        const powergate: Powergate = await GeoUtils.getPowergateInstance();
        this.token = await powergate.getToken();

        let services: ServiceEndpoint[] = [];

        try {
            for(let i = 0; i < assets.length; i++){
                const service: ServiceEndpoint = await this.pinAsset(powergate, assets[i]);
                services.push(service); 
            }
            return services;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

}