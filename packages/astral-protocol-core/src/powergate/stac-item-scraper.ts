import { Powergate } from "./powergate-pinning"
import { plainToClass } from "class-transformer"
import { IStacItemMetadata, IGeometry, IProperties, IService, IServiceList } from "../temp-interfaces/interfaces"
import { RootObject, Assets, Properties } from "./stac-item"
import CID from "cids"
import { Context } from "../context/context"

export interface IMetadata{
    stacItemMetadata: IStacItemMetadata
}

export class StacItemExtension implements IMetadata{
    private stacjsonObj: any
    private token: string

    private geoDIDid: string

    stacItemMetadata: IStacItemMetadata
    geometry: IGeometry
    properties: IProperties
    services: IService[]
    //services: IServiceList

    powergate: Powergate
    
    constructor(jsonObj: Object, context: Context){
        this.stacjsonObj = plainToClass(RootObject, jsonObj);
        this.stacjsonObj.setAssetToAssestList()
        this.setGeometry()
        this.setProperties()
        this.setServices()
        this.setStacItemMetadata()

        // create a new Powergate instance
        this.powergate = new Powergate()
    }

    
    
    // setter for the Geometry
    async setGeometry(){
        this.geometry = await this.stacjsonObj.getGeometry()
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
    async setServices(){
        let serviceList = this.stacjsonObj.getAssetToAssetList()
        for(let i = 0; i < serviceList.length; i++){
            this.services[i] = {
                id: "",
                type: serviceList[i].type,
                serviceEndpoint: serviceList[i].href,
                description: serviceList[i].title,
                role: serviceList[i].roles,
                //'pl.type': serviceList[i].('pl:type')
            }
        }
    }

    // use this to pin and asign the
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

    
    async pinServices(): Promise<any>{
        await this.powergate.open()
        this.token = await this.powergate.getToken();

        // fetch the file from the URL 
        let assetmetadata = await this.stacjsonObj.getAssetMetadata() 
    }

}