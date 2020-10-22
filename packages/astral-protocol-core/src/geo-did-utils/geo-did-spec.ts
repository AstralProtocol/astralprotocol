import { ServiceEndpoint } from 'did-resolver';
import { Geometry, Properties } from '../transformer/stac-item-spec';

export interface IStacItemMetadata {
    stac_version: string;
    stac_extensions: string[];
    type: string;
    id: string;
    bbox: number[];
    geometry: Geometry;
    collection?: string;
    properties: Properties;
}

export interface IServiceEndpoint extends ServiceEndpoint {
    id: string;
    type: string;
    serviceEndpoint: string;
    description?: string;
    role?: string[];
    'pl.type'?: string;
}

export interface IAssetList {
    href?: string;
    title?: string;
    roles?: string[];
    'pl:type'?: string;
    type?: string;
}
