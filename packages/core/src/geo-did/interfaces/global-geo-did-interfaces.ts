import { DIDDocument } from 'did-resolver';
import { Powergate } from '../../pin/powergate';

export const enum GeoDidType{ Default = 'default', Item = 'item', Collection = 'collection' }
export const enum Relationship{ Root = 'root', Self = 'self', Parent = 'parent', Child = 'child' }
export const enum ServiceType{ Collection_Metadata = 'collection-metadata', Item_Metadata = 'item-metadata', GeoJSON = 'geojson', JSON = 'json', GeoTIFF = 'geotiff', Misc = 'misc'}

export interface ILoadInfo {
    documentInfo: IDocumentInfo;
    powergateInstance: Powergate 
}

export interface IAsset {
    name: string;
    type: string;
    data: any;
}

export interface IPinInfo {
    geodidid: string;
    cid: string;
    pinDate: Date;
    token: string
} 

export interface IDocumentInfo {
    geodidid: string;
    documentVal: any;
    parentid?: string;
}

export interface ILinks {
    id: string;
    type: GeoDidType;
    rel: Relationship;
}

export interface IMetadata {
    type: GeoDidType;
    created: Date;
    updated?: Date[];
}

export interface GeoDIDDocument extends DIDDocument {
    didmetadata?: IMetadata;
    links: ILinks[];
}
