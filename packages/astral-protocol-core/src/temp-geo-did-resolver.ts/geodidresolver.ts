import bs58 from "bs58"
import { Doctype } from "@astraldao/astral-protocol-lib"
import type { ParsedDID, DIDResolver, DIDDocument } from "did-resolver"

interface Geo {
    loadDocument(docId: string): Promise<Doctype>;
}
  
interface ResolverRegistry {
    [index: string]: DIDResolver;
}
  
export function wrapDocument(content: any, did: string): DIDDocument {
    
    // intialize the DID Document without any values
    const startDoc: DIDDocument = {
      '@context': 'https://w3id.org/did/v1',
      id: did,
      publicKey: [],
      authentication: [],
      keyAgreement: []
    }

    // might have to edit this 
    const doc = Object.entries(content.publicKeys as string[]).reduce((diddoc, [keyName, keyValue]) => {
        if (keyValue.startsWith('z')) { // we got a multicodec encoded key
            const keyBuf = bs58.decode(keyValue.slice(1))
            if (keyBuf[0] === 0xe7) { // it's secp256k1
                diddoc.publicKey.push({
                id: `${did}#${keyName}`,
                type: 'Secp256k1VerificationKey2018',
                controller: did,
                // remove multicodec varint and encode to hex
                publicKeyHex: keyBuf.slice(2).toString('hex')
            })
            diddoc.authentication.push({
                type: 'Secp256k1SignatureAuthentication2018',
                publicKey: `${did}#${keyName}`,
            })
            } else if (keyBuf[0] === 0xec) { // it's x25519
                // old key format, likely not needed in the future
                diddoc.publicKey.push({
                    id: `${did}#${keyName}`,
                    type: 'Curve25519EncryptionPublicKey',
                    controller: did,
                    publicKeyBase64: keyBuf.slice(2).toString('base64')
                })
                // new keyAgreement format for x25519 keys
                diddoc.keyAgreement.push({
                    id: `${did}#${keyName}`,
                    type: 'X25519KeyAgreementKey2019',
                    controller: did,
                    publicKeyBase58: bs58.encode(keyBuf.slice(2))
                })
            }
      } else { // we need to be backwards compatible (until js-did is used everywhere)
            if(keyName === 'signing') {
                diddoc.publicKey.push({
                    id: `${did}#${keyName}`,
                    type: 'Secp256k1VerificationKey2018',
                    controller: did,
                    // remove multicodec varint and encode to hex
                    publicKeyHex: keyValue
            })
                diddoc.authentication.push({
                    type: 'Secp256k1SignatureAuthentication2018',
                    publicKey: `${did}#${keyName}`,
                })
            } else if (keyName === 'encryption') {
                diddoc.publicKey.push({
                    id: `${did}#${keyName}`,
                    type: 'Curve25519EncryptionPublicKey',
                    controller: did,
                    publicKeyBase64: keyValue
                })
            }
        }
        return diddoc
    }, startDoc)
  
    if (content.idx != null) {
      doc.service = [
        {
            id: `${did}#idx`,
            type: 'IdentityIndexRoot',
            serviceEndpoint: content.idx,
        },
      ]
    }
  
    return doc
}
  
export default {
    getResolver: (geo: Geo): ResolverRegistry => ({
        '3': async (did: string, parsed: ParsedDID): Promise<DIDDocument | null> => {
            // Returns DocType; this doctype will be of the STAC / Geo DID Document
            const doctype = await geo.loadDocument(`/geo/${parsed.id}`)
            return wrapDocument(doctype.content, did)
        }
    })
}