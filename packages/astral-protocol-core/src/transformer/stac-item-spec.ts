import { Type } from "class-transformer"
import "reflect-metadata"

// TODO: Review later with the STAC Spec to validate required fields

export abstract class AssetType {
    href: string;
    title: string;
    roles: string[];
    'pl:type'?: string;
    type: string;
}

export class Geometry {
    type: string;
    coordinates: number[][][];
}

export class Properties {

    @Type(() => Date)
    datetime: Date;

    instruments: string[];
    platform: string;
    constellation: string;

    @Type(() => Date)
    created: Date;

    @Type(() => Date)
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

    getDatetime(): Date {
        return this.datetime
    }

    getCreated(): Date {
        return this.created
    }

    getUpdated(): Date {
        return this.updated
    }
}

export class Link {
    rel: string;
    href: string;
}

export class Thumbnail extends AssetType{}

export class Analytic extends AssetType{}

export class AnalyticXml extends AssetType{}

export class Udm extends AssetType{}

export class Visual extends AssetType{}

export class Assets {
    
    @Type(() => Thumbnail)
    thumbnail: Thumbnail;

    @Type(() => Analytic)
    analytic: Analytic;

    @Type(() => AnalyticXml)
    analytic_xml: AnalyticXml;

    @Type(() => Udm)
    udm: Udm;

    @Type(() => Visual)
    visual: Visual;
    
    getThumbnail(): Thumbnail {
        return this.thumbnail
    }

    getAnalytic(): Analytic {
        return this.analytic
    }

    getAnalyticXml(): AnalyticXml {
        return this.analytic_xml
    }

    getUdm(): Udm {
        return this.udm
    }

    getVisual(): Visual {
        return this.visual
    }

}

export class RootObject {
    stac_version: string;
    stac_extensions: string[];
    type: string;
    id: string;
    bbox: number[];

    @Type(() => Geometry)
    geometry: Geometry;

    collection: string;

    @Type(() => Properties)
    properties: Properties;

    @Type(() => Link)
    links: Link[]

    @Type(() => Assets)
    assets: Assets

    getStacVersion(): string{
        return this.stac_version;
    }

    getStacExtensions(): string[]{
        return this.stac_extensions;
    }

    getType(): string{
        return this.type;
    }

    getId(): string{
        return this.id;
    }

    getBbox(): number[]{
        return this.bbox;
    }

    getCollection(): string{
        return this.collection;
    }

    getGeometry(): Geometry {
        return this.geometry
    }

    getProperties(): Properties {
        return this.properties
    }

    getLinks(): Link[] {
        return this.links
    }
    
    getAssets(): Assets {
        return this.assets
    }

}




