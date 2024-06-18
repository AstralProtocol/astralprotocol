import { ConcreteDefaultGeoDIDDocument } from './geo-did-default-document';
import { GeoDidType, Relationship, IAsset } from '../interfaces/global-geo-did-interfaces';
import { GeoDoctypeUtils } from '../doctype-utils/geo-doctype-utils';
import { Powergate } from '../../pin/powergate';
import { ServiceEndpoint } from 'did-resolver';

export class ConcreteDefaultGeoDIDItem extends ConcreteDefaultGeoDIDDocument{

    constructor(){
        super();
    }
    
    public async prepRootGeoDID(_ethAddress: string, _host: string, _token: string, _assets?: IAsset[]): Promise<void>{
        
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

            if(_assets) this.serviceEndpoint = await this.addAssetsToGenesisItem(_assets, _host, _token); 
            else this.serviceEndpoint = [];

            this.buildDocument();
        }
        catch(e){
            throw e;
        }
    }

    public async prepChildGeoDID(_ethAddress: string, _parentid: string, _path: string, _host: string, _token: string, _assets?: IAsset[]): Promise<void>{
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
                id: _parentid,
                type: GeoDidType.Collection,
                rel: Relationship.Parent
            }
        ];

        if(_assets) try{ this.serviceEndpoint = await this.addAssetsToGenesisItem(_assets, _host, _token); }catch(e){ throw e; }
        else this.serviceEndpoint = [];

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
            throw e;
        }
    }

    async addAssetsToGenesisItem(_assets: IAsset[], _host: string, _token: string): Promise<any> {

        // by default creates new instance
        const powergate: Powergate = await Powergate.build(_host, _token);

        let services: ServiceEndpoint[] = [];

        try {
            for(let i = 0; i < _assets.length; i++){
                const service: ServiceEndpoint = await this.pinAsset(powergate, _assets[i]);
                services.push(service); 
            }
            return services;
        } catch (e) {
            throw e;
        }
    }

}