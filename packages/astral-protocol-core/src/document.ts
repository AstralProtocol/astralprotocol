import { GeoDocState, GeoDoctype } from "./geo-doctype/geo-tile-doctype"
import { SampleStac } from "./astral-client"
import { GeoDoctypeUtils } from "./geo-doctype/utils/geo-tile-utils"
import { Context } from "./context/context"
//import { fetchJson } from "fetch-json"



export default class Document extends GeoDoctype{

    constructor (state: GeoDocState, private _context: Context) {
      super(state, _context)
    }
  
    get id(): string {
      return GeoDoctypeUtils.createDocIdFromGenesis(this.state.log[0])
    }

    public get context(): Context {
        return this._context
    }

    public set context(value: Context) {
        this._context = value
    }
  
    /*
    static async create (content:Content, context: Context): Promise<Document> {
    }
  
    static async load (id: string, context: Context): Promise<Document> {
    }*/
}