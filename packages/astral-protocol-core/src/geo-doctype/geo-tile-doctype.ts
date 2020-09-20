import { EventEmitter } from "events"
import { Context } from "../context/context"
import CID from "cids"
import { GeoDoctypeUtils } from "./utils/geo-tile-utils"
import cloneDeep from "lodash.clonedeep"

export interface GeoDocMetadata {
    owners: Array<string>;
    schema?: string;
    tags?: Array<string>;
    isUnique?: boolean;

    [index: string]: any; // allow arbitrary properties
}

export interface GeoDocParams {
    metadata?: GeoDocMetadata;

    [index: string]: any; // allow arbitrary properties
}

// the instance of the Geo DID Document relative to this GeoDoctype instance
export interface GeoDocState {
    doctype: string;
    content: any;
    metadata: GeoDocMetadata;
    //signature: SignatureStatus;
    //anchorStatus: AnchorStatus;
    //anchorScheduledFor?: number; // only present when anchor status is pending
    //anchorProof?: AnchorProof; // the anchor proof of the latest anchor, only present when anchor status is anchored
    log: Array<CID>;
}

export class GeoDoctype extends EventEmitter {
    constructor(private _state: GeoDocState, private _context: Context) {
        super()
    }

    get id(): string {
        return GeoDoctypeUtils.createDocIdFromGenesis(this._state.log[0])
    }

    get geodoctype(): string {
        return this._state.doctype
    }

    get content(): any {
        const { content } = this._state
        return cloneDeep(content)
    }

    get metadata(): GeoDocMetadata {
        const { metadata } = this._state
        return cloneDeep(metadata)
    }

    get owners(): Array<string> {
        return this.metadata.owners
    }

    get head(): CID {
        return this._state.log[this._state.log.length - 1]
    }

    get state(): GeoDocState {
        return cloneDeep(this._state)
    }

    set state(state: GeoDocState) {
        this._state = state
    }

    set context(context: Context) {
        this._context = context
    }

    get context(): Context {
        return this._context
    }
}