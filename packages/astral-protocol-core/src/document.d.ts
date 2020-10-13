/// <reference types="node" />
import { EventEmitter } from "events";
import { IStacItemMetadata, IServiceEndpoint } from "./geo-did-utils/geo-did-spec";
import CID from "cids";
import { Powergate } from "./pinning/powergate";
export declare enum SignatureStatus {
    GENESIS = 0,
    PARTIAL = 1,
    SIGNED = 2
}
export declare enum AnchorStatus {
    NOT_REQUESTED = 0,
    PENDING = 1,
    PROCESSING = 2,
    ANCHORED = 3,
    FAILED = 4
}
export interface AnchorRecord {
    prev: CID;
    proof: CID;
    path: string;
}
export interface AnchorProof {
    chainId: string;
    blockNumber: number;
    blockTimestamp: number;
    txHash: CID;
    root: CID;
}
export interface DocMetadata {
    owners: Array<string>;
    schema?: string;
    tags?: Array<string>;
    isUnique?: boolean;
    [index: string]: any;
}
export interface DocParams {
    metadata?: DocMetadata;
    [index: string]: any;
}
export interface GeoDocState {
    doctype: string;
    content: any;
    metadata: DocMetadata;
    log: Array<CID>;
}
export default class Document extends EventEmitter {
    #private;
    private _state;
    private _stacjson;
    private _ethereumAddress;
    private powergate;
    constructor(_state: GeoDocState, _stacjson: Object, _ethereumAddress: string, powergate: Powergate);
    createGeoDIDDocument(): Promise<void>;
    loadcreateGeoDIDDocument(): Promise<any>;
    getStacItemMetadata(): Promise<IStacItemMetadata>;
    getServices(): Promise<IServiceEndpoint[]>;
    protected instantiateTransformer(): Promise<void>;
    getGeoDidId(): Promise<string>;
    scrapeStac(): Promise<void>;
    get doctype(): string;
    get metadata(): DocMetadata;
    get owners(): Array<string>;
    get state(): GeoDocState;
    set state(state: GeoDocState);
}
