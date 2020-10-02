import type bs58 from 'bs58'
import { ParsedDID, DIDResolver, DIDDocument } from "did-resolver"
/*
interface Astral {
    loadDocument(): Promise<Document>
}

interface ResolverRegistry {
    [index: string]: DIDResolver
}

export function geoload(){}

export function getResolver() {
    async function resolve(
        did: string,
        parsed: ParsedDID
    ): Promise<DIDDocument> {
        console.log(parsed)
        // {method: 'mymethod', id: 'abcdefg', did: 'did:mymethod:abcdefg/some/path#fragment=123', path: '/some/path', fragment: 'fragment=123'}
        const didDoc = ...// lookup doc
        // If you need to lookup another did as part of resolving this did document, the primary DIDResolver object is passed in as well
        const parentDID = await didResolver.resolve(...)
        //
        return didDoc
    }
  
    return { geoload: resolve }
}*/


  // {method: 'geo', id: 'cid', did: 'did:geo:abcdefg/service/#fragment=123', path: '/some/path', fragment: 'fragment=123'}*/