import ajv from "ajv"
import CID from 'cids'
// TODO: properly import and declare module multihashing-async 
const multihashing = require("multihashing-async")


/**
 * Doctype related utils
 */
export class GeoDoctypeUtils {

    static validator: any = new ajv({ allErrors: true })

    static async encodeGeoIdentifier(_stacid: string, _ethereumAddress: string): Promise<any>{
        const bytes = new TextEncoder().encode(_stacid + _ethereumAddress)
        const hash = await multihashing(bytes, 'sha2-256')

        return hash
    }

    // create the GeoDID 
    static async createGeodidIdFromGenesis(_stacid: string, _ethereumAddress: string): Promise<string> {
        const genesisCid = await this.createCID(_stacid, _ethereumAddress)

        const baseDocId = ['geo:/', genesisCid.toString()].join('/')
        
        return baseDocId
    }

    static normalizeDocId(docId: string): string {
        if (docId.startsWith('geo://')) {
            return docId.replace('geo://', 'did:geo:')
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

    static async createCID(_stacid:string, _ethereumAddress: string): Promise<string> {
        const hash = await GeoDoctypeUtils.encodeGeoIdentifier(_stacid, _ethereumAddress)

        const cid = new CID(0, 'dag-pb', hash, 'base58btc')

        const cidreturn = cid.toString();

        return cidreturn;
    }

}