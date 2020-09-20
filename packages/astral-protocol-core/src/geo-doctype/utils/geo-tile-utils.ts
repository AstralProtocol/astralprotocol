import ajv from "ajv"
import CID from 'cids'
import { GeoDocState, GeoDocMetadata, GeoDoctype, GeoDocParams } from "../geo-tile-doctype"


/**
 * Doctype related utils
 */
export class GeoDoctypeUtils {

    static validator: any = new ajv({ allErrors: true })

    static createDocIdFromGenesis(genesisCid: any, version: any = null): string {
        const baseDocId = ['geo:/', genesisCid.toString()].join('/')
        return version? `${baseDocId}?version=${version.toString()}` : baseDocId
    }

    static normalizeDocId(docId: string): string {
        if (docId.startsWith('geo://')) {
            return docId.replace('geo://', '/geo/')
        }
        return docId
    }

    static getGenesis(docId: string): string {
        const genesis = (docId.startsWith('geo://')) ? docId.split('//')[1] : docId.split('/')[2]
        const indexOfVersion = genesis.indexOf('?')
        if (indexOfVersion !== -1) {
            return genesis.substring(0, indexOfVersion)
        }
        return genesis
    }

}