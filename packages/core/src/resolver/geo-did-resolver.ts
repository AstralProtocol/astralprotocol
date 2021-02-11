import AstralClient from '../astral-client';
import { DIDResolver, DIDDocument, ParsedDID } from 'did-resolver';
import { Powergate } from '../pin/powergate';

export interface ResolverRegistry {
    [index: string]: DIDResolver;
}

const resolve = async(astral: AstralClient, powergate: Powergate, parseddid: string, parsedid: string, parsedpath?: string, parsedfragment?: string ): Promise<DIDDocument | any | null> => {
    const path = parseddid.concat(parsedpath);
    const bytes: Uint8Array = await powergate.getGeoDIDDocument(astral.docmap[path].cid);
    const strj = new TextDecoder('utf-8').decode(bytes);

    return JSON.parse(strj);
}

// needs a powergate instance to call getResolver
export default{
    getResolver: (astral: AstralClient, powergate: Powergate): ResolverRegistry => {
        return{
            'geo': async (did: string, parsed: ParsedDID): Promise<DIDDocument | any | null> => {
                return resolve(astral, powergate, parsed.did, parsed.id, parsed.path, parsed.fragment)
            }
        }
    }
}