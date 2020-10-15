import 'reflect-metadata';
export declare abstract class AssetType {
    href: string;
    title: string;
    roles: string[];
    'pl:type'?: string;
    type: string;
}
export declare class Geometry {
    type: string;
    coordinates: number[][][];
}
export declare class Properties {
    datetime: Date;
    instruments: string[];
    platform: string;
    constellation: string;
    created: Date;
    updated: Date;
    gsd: number;
    'eo:cloud_cover': number;
    'view:sun_azimuth': number;
    'view:sun_elevation': number;
    'view:off_nadir': number;
    'proj:epsg': number;
    'pl:anomalous_pixels': number;
    'pl:columns': number;
    'pl:ground_control': boolean;
    'pl:item_type': string;
    'pl:origin_x': number;
    'pl:origin_y': number;
    'pl:pixel_resolution': number;
    'pl:quality_category': string;
    'pl:rows': number;
    'pl:strip_id': string;
    'pl:usable_data': number;
    getDatetime(): Date;
    getCreated(): Date;
    getUpdated(): Date;
}
export declare class Link {
    rel: string;
    href: string;
}
export declare class Thumbnail extends AssetType {}
export declare class Analytic extends AssetType {}
export declare class AnalyticXml extends AssetType {}
export declare class Udm extends AssetType {}
export declare class Visual extends AssetType {}
export declare class Assets {
    thumbnail: Thumbnail;
    analytic: Analytic;
    analytic_xml: AnalyticXml;
    udm: Udm;
    visual: Visual;
    getThumbnail(): Thumbnail;
    getAnalytic(): Analytic;
    getAnalyticXml(): AnalyticXml;
    getUdm(): Udm;
    getVisual(): Visual;
}
export declare class RootObject {
    stac_version: string;
    stac_extensions: string[];
    type: string;
    id: string;
    bbox: number[];
    geometry: Geometry;
    collection: string;
    properties: Properties;
    links: Link[];
    assets: Assets;
    getStacVersion(): string;
    getStacExtensions(): string[];
    getType(): string;
    getId(): string;
    getBbox(): number[];
    getCollection(): string;
    getGeometry(): Geometry;
    getProperties(): Properties;
    getLinks(): Link[];
    getAssets(): Assets;
}
