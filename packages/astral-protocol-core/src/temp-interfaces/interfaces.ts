export interface IStacItemMetadata {
    stac_version: string;
    stac_extensions: string[];
    type: string;
    id: string;
    bbox: number[];
    geometry: IGeometry;
    collection?: string;
    properties: IProperties;
}

export interface IGeometry {
    type: string;
    coordinates: number[][][];
}

export interface IProperties {
    datetime: string;
    collection: string;
}

export interface IService {
    id: string
    type?: string
    serviceEndpoint: string
    description?: string
    role?: string[]
    'pl.type'?: string
}

export interface IServiceList {
    services: IService[]
}




