import bs58 from 'bs58';
import web3 from 'web3';
import { Document } from '../document';
import { ParsedDID, DIDResolver, DIDDocument } from 'did-resolver';
import { IStacItemMetadata, IGeometry, IProperties, IServiceEndpoint, IAssetList } from '../geo-did-utils/geo-did-spec';

// contract address

interface GeoDIDDocument extends DIDDocument {
    stacmetadata: IStacItemMetadata;
    service: IServiceEndpoint[];
}

interface ResolverRegistry {
    [index: string]: DIDResolver;
}

export function geoload() {}

export function wrapDocument(
    stacmetadata: IStacItemMetadata,
    service: IServiceEndpoint[],
    did: string,
): GeoDIDDocument {
    const startDoc: GeoDIDDocument = {
        '@context': 'https://w3id.org/did/v1',
        id: did,
        publicKey: [],
        authentication: [],
        service: service,
        stacmetadata: stacmetadata,
    };

    // replace the public key with the ethereum address
    startDoc.publicKey.push({
        id: `${did}#MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSv`,
        type: 'Secp256k1VerificationKey2018',
        controller: did,
        // remove multicodec variant and encode to hex
        publicKeyHex: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSv',
    });

    return startDoc;
}

// pass in a instance of astral into
export default {
    getResolver: (document: Document): ResolverRegistry => ({
        geo: async (did: string, parsed: ParsedDID): Promise<DIDDocument | null> => {
            // resolver
            const stacitemmetadata = await document.getStacItemMetadata();
            const services = await document.getServices();
            return wrapDocument(stacitemmetadata, services, did);
        },
    }),
};

// did:geo:QmQhrMWAyxPRpFnS1UPZSUmKj7N7DNNSWi2cfQYDMR4Zgm fragment: 'fragment=data'

// {method: 'geo', id: 'cid', did: 'did:geo:abcdefg/service/#fragment=123', path: '/some/path', fragment: 'fragment=123'}*/
