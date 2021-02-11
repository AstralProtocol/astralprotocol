export const enum GeoDidType{ Default = 'default', Item = 'item', Collection = 'collection' }
export const enum Relationship{ Root = 'root', Self = 'self', Parent = 'parent', Child = 'child' }
export const enum ServiceType{ Metadata = 'metadata', GeoJSON = 'geojson', JSON = 'json', GeoTIFF = 'geotiff', Misc = 'misc'}
import { DIDDocument } from 'did-resolver';

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
