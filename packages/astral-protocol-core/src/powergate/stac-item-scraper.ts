import { Powergate } from "./powergate-pinning"
import { plainToClass } from "class-transformer"
import { IStacItemMetadata, IGeometry, IProperties, IService } from "../temp-interfaces/interfaces"
import { StacItem } from "./stacitem"
import { Context } from "../context/context"

export interface IMetadata{
    stacItemMetadata: IStacItemMetadata
}

export class StacItemExtension implements IMetadata{
    private stacjsonObj:any

    stacItemMetadata: IStacItemMetadata
    geometry: IGeometry
    properties: IProperties
    service: IService
    
    constructor(jsonObj: Object){
        this.stacjsonObj = plainToClass(StacItem, jsonObj);
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
        let assetmetadata = await this.stacjsonObj.getAssetMetadata()
        this.service = {
            id: "", // we need to create geoDID for the endpoint
            type: assetmetadata.name,
            serviceEndpoint: assetmetadata.href,
            description: "Geotiff"
        }
    }

    // use this to pin and asign the
    async getServices(): Promise<IService>{
        return this.service
    }

    // setter for the StacItemMetadata
    async setStacItemMetadata(){
        this.stacItemMetadata = {
            stac_version: this.stacjsonObj.stac_version,
            stac_extensions: this.stacjsonObj.stac_extensions,
            type: this.stacjsonObj.type,
            id: this.stacjsonObj.id,
            bbox: this.stacjsonObj.bbox,
            geometry: await this.getGeometry(),
            properties: await this.getProperties()
        }
    }

    // add to this the document later 
    async getStacItemMetadata(): Promise<IStacItemMetadata>{
        return this.stacItemMetadata
    }
}