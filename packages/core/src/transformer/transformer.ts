import { Powergate } from '../pin/powergate';
import { plainToClass } from 'class-transformer';
import { GeoDoctypeUtils } from '../geo-did-utils/utils';
import { IStacItemMetadata, IServiceEndpoint, IAssetList } from '../geo-did-utils/geo-did-spec';
import { fetchAsset } from '../scripts/fetch';
import { RootObject, AssetType, Assets, Properties, Geometry } from './stac-item-spec';
import { Context } from '../context/context';
import cliProgress from 'cli-progress';

export class Transformer {
    private _stacjsonObj: RootObject
    private geoDIDid: string;

    stacItemMetadata: IStacItemMetadata;
    private assets: Assets;

    services: IServiceEndpoint[] = new Array(5);
    assetList: IAssetList[] = new Array(5);

    constructor(private jsonObj: Object) {
        this._stacjsonObj = plainToClass(RootObject, jsonObj);
        this.assets = this._stacjsonObj.getAssets();
        this.createAssetList();
        this.setStacItemMetadata();
    }

    // TODO: Figure out a more effective way to create the AssetList
    async createAssetList() {
        this.assetList[0] = this.assets.getThumbnail();
        this.assetList[1] = this.assets.getAnalytic();
        this.assetList[2] = this.assets.getAnalyticXml();
        this.assetList[3] = this.assets.getUdm();
        this.assetList[4] = this.assets.getVisual();
    }

    async getAssetList(): Promise<IAssetList[]> {
        return this.assetList;
    }

    async getGeoDIDid(_id: string): Promise<string> {
        const geoId = await GeoDoctypeUtils.createGeodidIdFromGenesis(_id);
        this.geoDIDid = GeoDoctypeUtils.normalizeDocId(geoId);
        return this.geoDIDid;
    }

    // setter for the Assets
    async setService(index: number) {
        this.services[index] = {
            // TODO: Please fix the service endpoint generator later
            id: this.geoDIDid + `#${this.assetList[index].roles[0]}`, // this will work for demo but not production
            type: this.assetList[index].type,
            serviceEndpoint: this.assetList[index].href,
            description: this.assetList[index].title,
            role: this.assetList[index].roles,
            //'pl.type': serviceList[i].('pl:type')
        };
    }

    // use this to pin the services
    async getServices(): Promise<IServiceEndpoint[]> {
        return this.services;
    }

    // setter for the StacItemMetadata
    async setStacItemMetadata() {
        this.stacItemMetadata = {
            stac_version: this._stacjsonObj.getStacVersion(),
            stac_extensions: this._stacjsonObj.getStacExtensions(),
            type: this._stacjsonObj.getType(),
            id: this._stacjsonObj.getId(),
            bbox: this._stacjsonObj.getBbox(),
            geometry: this._stacjsonObj.getGeometry(),
            collection: this._stacjsonObj.getCollection(),
            properties: this._stacjsonObj.getProperties(),
        };
    }

    // add to this the document later
    async getStacItemMetadata(): Promise<IStacItemMetadata> {
        return this.stacItemMetadata;
    }

    async getGeoDidId(): Promise<string> {
        return this.geoDIDid;
    }

    async assetToService() {
        for (let i = 0; i < this.assetList.length; i++) {
            await this.setService(i);
        }
    }
}
