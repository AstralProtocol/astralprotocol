/*import { SampleStac } from "./astral-client"
import { GeoDoctypeUtils } from "./geo-doctype/utils/geo-tile-utils"
import { Context } from "./context/context"
//import { fetchJson } from "fetch-json"



export default class Document extends GeoDoctype{

    constructor (state: GeoDocState, public context: Context) {
      super(state, context)
    }
  
    get id(): string {
      return GeoDoctypeUtils.createGeodidFromGenesis(this.state.log[0])
    }

    // create the Document here but don't 
    static async createFromGenesis(genesis: string , context: Context): Promise<Document> {
        

    }
    
    static async load (id: string, context: Context): Promise<Document> {
    }
}*/