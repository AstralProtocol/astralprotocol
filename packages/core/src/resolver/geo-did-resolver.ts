import { AstralClient } from '../astral-client';
import { DIDResolver, DIDDocument, ParsedDID } from 'did-resolver';
import { Powergate } from '../pin/powergate';
import { request, GraphQLClient, gql } from 'graphql-request';

export interface ResolverRegistry {
    [index: string]: DIDResolver;
}

const resolve = async (
    astral: AstralClient,
    powergate: Powergate,
    parseddid: string,
    parsedid: string,
    parsedpath?: string,
    parsedfragment?: string,
): Promise<DIDDocument | any | null> => {
    let strj: any;

    try {
        const endpoint = 'https://api.thegraph.com/subgraphs/name/astralprotocol/spatialassetsv05';

        let path: string = '';

        if (parsedpath) {
            path = parseddid.concat(parsedpath);
        } else {
            path = parseddid;
        }

        console.log(path);

        const query = gql`
            query($path: ID!) {
                geoDID(id: $path) {
                    id
                    cid
                }
            }
        `;

        const variables = { path };

        const data = await request(endpoint, query, variables);
        console.log(JSON.stringify(data));

        const bytes: Uint8Array = await powergate.getGeoDIDDocument(astral.docmap[path].cid);
        strj = new TextDecoder('utf-8').decode(bytes);
    } catch (e) {
        console.log(e);
    }

    return JSON.parse(strj);
};

// needs a powergate instance to call getResolver
export default {
    getResolver: (astral: AstralClient, powergate: Powergate): ResolverRegistry => {
        return {
            geo: async (did: string, parsed: ParsedDID): Promise<DIDDocument | any | null> => {
                return resolve(astral, powergate, parsed.did, parsed.id, parsed.path, parsed.fragment);
            },
        };
    },
};
