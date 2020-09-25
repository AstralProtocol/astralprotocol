import ajv from "ajv"
import CID from 'cids'
import { multihashing } from "multihashing-async"
import { GeoDocState, GeoDocMetadata, GeoDoctype, GeoDocParams } from "../geo-tile-doctype"


/**
 * Doctype related utils
 */
export class GeoDoctypeUtils {

    static validator: any = new ajv({ allErrors: true })

    // create the GeoDID 
    static createGeodidIdFromGenesis(stacid:string): string {
        const genesisCid = this.createCID(stacid)
        const baseDocId = ['geo:/', genesisCid.toString()].join('/')
        return baseDocId
    }

    static normalizeDocId(docId: string): string {
        if (docId.startsWith('geo://')) {
            return docId.replace('geo://', '/geo/')
        }
        return docId
    }

    // still needs to be fixed 
    static getGenesis(docId: string): string {
        const genesis = (docId.startsWith('geo://')) ? docId.split('//')[1] : docId.split('/')[2]
        const indexOfVersion = genesis.indexOf('?')
        if (indexOfVersion !== -1) {
            return genesis.substring(0, indexOfVersion)
        }
        return genesis
    }

    static async createCID(stacid:string): Promise<string> {
        const bytes = new TextEncoder().encode(stacid)
        const hash = await multihashing(bytes, 'sha2-256')
        const cid = new CID(0, 'raw', hash, 'base64')

        return cid.toString();
    }

}