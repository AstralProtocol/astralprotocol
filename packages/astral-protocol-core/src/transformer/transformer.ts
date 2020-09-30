import { Powergate } from "../pinning/powergate"
import { plainToClass } from "class-transformer"
import { GeoDoctypeUtils } from "../utils/utils"
import { IStacItemMetadata, IGeometry, IProperties, IService, IAssetList} from "../geo-document/geo-did-spec"
import { fetchAsset } from "../scripts/fetch"
import { RootObject, AssetType, Assets, Properties } from "./stac-item-spec"
import CID from "cids"
import { Context } from "../context/context"
import fs from "fs"

export class Transformer {
    private stacjsonObj: any
    private token: string

    // TODO: We need to get the GeoDIDid into this instance
    private geoDIDid: string
    private stacID: string

    stacItemMetadata: IStacItemMetadata
    geometry: IGeometry
    properties: IProperties
    private assets: Assets

    powergate: Powergate

    //listOfservice: any
    
    services: IService[] = new Array(5)
    assetList: IAssetList[] = new Array(5)

    
    constructor(jsonObj: Object, powergate: Powergate, _context: Context){

        this.powergate = powergate


        this.stacjsonObj = plainToClass(RootObject, jsonObj);
        this.stacID = this.stacjsonObj.getId()

        this.assets = this.stacjsonObj.getAssets()
        this.createAssetList()

        this.setGeometry()
        this.setProperties()

        this.setStacItemMetadata()
    }

    // TODO: Figure out a more effective way to create the AssetList
    async createAssetList(){  
        this.assetList[0] = this.assets.getThumbnail()
        this.assetList[1] = this.assets.getAnalytic()
        this.assetList[2] = this.assets.getAnalyticXml()
        this.assetList[3] = this.assets.getUdm()
        this.assetList[4] = this.assets.getVisual() 
    }

    /*
    async fetchAssetsAndPin(){
        try{
            await fetchAssets(this.assetList, this.context)
            .then()
        }catch(err){
            console.log(err)
        }

        console.log(this.listOfservice)
    }*/


    async getAssetList(): Promise<IAssetList[]>{
        return this.assetList
    }

    async getGeoDIDid(): Promise<string>{
        this.geoDIDid = await GeoDoctypeUtils.createGeodidIdFromGenesis(this.stacID)
        return this.geoDIDid
    }

    // setter for the Geometry
    async setGeometry(){
        this.geometry = await this.getGeometry()
    }

    async getGeometry(): Promise<IGeometry>{
        return this.geometry
    }

    // setter for the Properties
    async setProperties(){
        this.properties = await this.stacjsonObj.getProperties()
    }

    async getProperties(): Promise<IProperties>{
        return this.properties
    }

    // setter for the Assets 
    async setService(index: number, cid: any){
        this.services[index] = {
            // TODO: Please fix the service endpoint generator later
            id: this.geoDIDid + `/${this.assetList[index].roles[0]}`, // this will work for demo but not production
            type: this.assetList[index].type,
            serviceEndpoint: cid,
            description: this.assetList[index].title,
            role: this.assetList[index].roles,
            //'pl.type': serviceList[i].('pl:type')
        }
    }

    // use this to pin the services
    async getServices(): Promise<IService[]>{
        return this.services
    }

    // setter for the StacItemMetadata
    async setStacItemMetadata(){
        this.stacItemMetadata = {
            stac_version: await this.stacjsonObj.getStacVersion(),
            stac_extensions: await this.stacjsonObj.getStacExtensions(),
            type: await this.stacjsonObj.getType(),
            id: await this.stacjsonObj.getId(),
            bbox: await this.stacjsonObj.getBbox(),
            geometry: await this.getGeometry(),
            collection: await this.stacjsonObj.getCollection(),
            properties: await this.getProperties()
        }
    }

    // add to this the document later 
    async getStacItemMetadata(): Promise<IStacItemMetadata>{
        return this.stacItemMetadata
    }

    async getGeoDidId(): Promise<string>{
        return this.geoDIDid
    }


    async pinDocumentAssets(){
        for (let i = 0; i < this.assetList.length; i++){
            try {
                var blob = await fetchAsset(this.assetList[i].href)
                var buffer = await blob.arrayBuffer();
                let uint8 = await new Uint8Array(buffer);

                const cid = await this.powergate.getAssetCid(uint8)
                console.log(cid)

                await this.powergate.pin(cid)
                await this.setService(i, cid)
            }catch(err){
                console.log(err)
            }
            
        }
    }
}