import { EventEmitter } from "events"
import { IStacItemMetadata, ServiceEndpoint } from "./geo-did-utils/geo-did-spec"
import CID from "cids"
import { Powergate } from "./pinning/powergate"
import { Transformer } from "./transformer/transformer"
import { Resolver, DIDDocument, PublicKey, Authentication, LinkedDataProof } from "did-resolver"
import geobuild from './geo-did-utils/geo-did-build-resolver'
//import geoload from './geo-did-utils/geo-did-load-resolver'

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

export default class Document extends EventEmitter {

  #stacItemMetadata: IStacItemMetadata
  #service: ServiceEndpoint[]
  #normalizedGeoDidId: string
  #stacmetadata: IStacItemMetadata
  #transformer: Transformer

  constructor (private _state: GeoDocState, private _stacjson:Object, private _ethereumAddress: string, private powergate: Powergate) {
    super()
  }

  // build the DIDDocument type
  async buildDocument(){
    
  }

  protected async instantiateTransformer(){
    // create an instance of the Transformer as well
    this.#transformer = new Transformer(this._stacjson, this.powergate)
  }

  async scrapeStac(){
    try{
      // initialize the Transformer class 
      await this.instantiateTransformer()
      // return the normalized GeoDID
      this.#normalizedGeoDidId = await this.#transformer.getGeoDIDid(this._ethereumAddress);
      console.log(this.#normalizedGeoDidId + '\n')

      // should return the metadata from the Stac Item (StacItem Instance)
      this.#stacmetadata = await this.#transformer.getStacItemMetadata();
      console.log(this.#stacmetadata)

      // Pin the assets in the STAC Item
      await this.#transformer.pinDocumentAssets()
    
      // return a list of the assets (StacItem Instance)
      this.#service = await this.#transformer.getServices();
      console.log(this.#service)
    }catch(err){
      console.log(err)
    }
  }

  // return the GeoDIDDocument
  async getDocument(){

  }

  async loadDocument(){}

  get doctype(): string {
      return this._state.doctype
  }

  get content(): any {
      const { content } = this._state
      return content
  }

  get metadata(): DocMetadata {
      const { metadata } = this._state
      return metadata
  }

  get owners(): Array<string> {
      return this.metadata.owners
  }

  get state(): GeoDocState {
      return this._state
  }

  set state(state: GeoDocState) {
      this._state = state
  }

  /*
  set context(context: Context) {
      this._context = context
  }

  get context(): Context {
      return this._context
  }*/

  /*
  async validate(): Promise<void> {
      const schemaDocId = this.state?.metadata?.schema
      if (schemaDocId) {
          const schemaDoc = await this.context.api.loadDocument(schemaDocId)
          if (!schemaDoc) {
              throw new Error(`Schema not found for ${schemaDocId}`)
          }
          DoctypeUtils.validate(this.content, schemaDoc.content)
      }
  }*/
    
}