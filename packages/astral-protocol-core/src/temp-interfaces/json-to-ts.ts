declare module namespace {

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

}
