export interface Geometry {
    type: string;
    coordinates: number[][][];
}

export interface Properties {
    datetime: Date;
    collection: string;
}

export interface Link {
    rel: string;
    href: string;
}

export interface Analytic {
    href: string;
    title: string;
}

export interface Assets {
    analytic: Analytic;
}

export interface RootObject {
    stac_version: string;
    stac_extensions: any[];
    type: string;
    id: string;
    bbox: number[];
    geometry: Geometry;
    properties: Properties;
    links: Link[];
    assets: Assets;
}

export class StacItem implements RootObject{
    stac_version: string
    stac_extensions: any[]
    type: string
    id: string
    bbox: number[]
    geometry: Geometry
    properties: Properties
    links: Link[]
    assets: Assets // This is be an Array later

    getStacVersion(){
        return this.stac_version;
    }

    getStacExtensions(){
        return this.stac_extensions;
    }

    getType(){
        return this.type;
    }

    getId(){
        return this.id;
    }

    getBbox(){
        return this.bbox;
    }

    async getGeometry(): Promise<Geometry>{
        return await this.geometry
    }

    async getProperties(): Promise<Properties>{
        return await this.properties
    }

    async getLinks(): Promise<Link[]>{
        return await this.links
    }

    async getAssets(): Promise<Assets>{
        return await this.assets
    }

    async getAssetMetadata(): Promise<Analytic>{
        return await this.assets.analytic
    }
}

