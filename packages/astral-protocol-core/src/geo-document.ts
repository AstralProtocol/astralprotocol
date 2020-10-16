import { EventEmitter } from "events"
import { IStacItemMetadata, IServiceEndpoint } from "./geo-did-utils/geo-did-spec"
import CID from "cids"
import { Powergate } from "./pin/powergate"
import { Transformer } from "./transformer/transformer"
import { Resolver } from "did-resolver"
import GeoDIDResolver from './geo-did-utils/geo-did-resolver'


export enum SignatureStatus {
  GENESIS, PARTIAL, SIGNED
}

export enum AnchorStatus {
  NOT_REQUESTED, PENDING, PROCESSING, ANCHORED, FAILED
}

export interface AnchorRecord {
  prev: CID; // should be CID type
  proof: CID; // should be CID type
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

  [index: string]: any; // allow arbitrary properties
}

export interface DocParams {
  metadata?: DocMetadata;

  [index: string]: any; // allow arbitrary properties
}

export interface GeoDocState {
  doctype: string;
  content: any;
  metadata: DocMetadata;
  //signature: SignatureStatus;
  //anchorStatus: AnchorStatus;
  //anchorScheduledFor?: number; // only present when anchor status is pending
  //anchorProof?: AnchorProof; // the anchor proof of the latest anchor, only present when anchor status is anchored
  log: Array<CID>;
}


export class GeoDocument extends EventEmitter {

  #geoDIDResolver: any
  #didResolver: any

  constructor (private _transformer: Transformer, private _normalizedGeoDidId: string, private _stacmetadata: IStacItemMetadata, private _service: IServiceEndpoint[]) {
    super()

    console.log(this._normalizedGeoDidId + '\n')
    console.log(this._stacmetadata)
    console.log(this._service)
  }

  static async build (stacjson:Object, ethereumAddress: string, powergate: Powergate): Promise<any> {

    const transformer = new Transformer(stacjson, powergate)

    const normalizedGeoDidId = await transformer.getGeoDIDid(ethereumAddress)
      
    const stacmetadata = await transformer.getStacItemMetadata()

    await transformer.assetToService()

    const service = await transformer.getServices()
    
    return new GeoDocument(transformer, normalizedGeoDidId, stacmetadata, service);
  }

  async createGeoDIDDocument(){
    this.#geoDIDResolver = GeoDIDResolver.getResolver(this)
    this.#didResolver = new Resolver(this.#geoDIDResolver)
  }

  async constructGeoDIDDocument(){
    const doc = await this.#didResolver.resolve(this._normalizedGeoDidId)
    //console.log(doc)
    return doc
  }
  
  async getStacItemMetadata(): Promise<IStacItemMetadata>{
    return this._stacmetadata
  }

  async getServices(): Promise<IServiceEndpoint[]>{
    return this._service
  }

  // return the GeoDID ID
  async getGeoDidId(): Promise<string> {
    return this._normalizedGeoDidId
  }

}