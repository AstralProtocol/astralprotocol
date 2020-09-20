import type { DIDDocument } from "did-resolver"

export interface StacItemMetadata {
    stac_version: string;
    stac_extensions: string[];
    type: string;
    id: string;
    bbox: number[];
    geometry: Geometry;
    properties: Properties;
    //links: Link[];
}

export interface Geometry {
    type: string;
    coordinates: number[][][];
}

export interface Provider {
    name: string;
    roles: string[];
    url: string;
}

export interface Properties {
    datetime: Date;
    title: string;
    license: string;
    providers: Provider[];
    created: Date;
    updated: Date;
}

/*
export interface Link {
    rel: string;
    href: string;
    type: string;
}*/

export interface GeoDIDDocument extends DIDDocument {
    stac_item_metadata: StacItemMetadata;
}
