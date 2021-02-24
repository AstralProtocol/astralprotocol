import { AstralClient } from '../astral-client';
import { DIDResolver, DIDDocument, ParsedDID } from 'did-resolver';
import { Powergate } from '../pin/powergate';
import { GraphQLClient, gql } from 'graphql-request';

export interface ResolverRegistry {
    [index: string]: DIDResolver;
}

interface ReturnData {
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

        const graphQLClient = new GraphQLClient(endpoint, {
            headers: {},
        });

        let pathActual: string = '';

        if (parsedpath) {
            pathActual = parseddid.concat(parsedpath);
        } else {
            pathActual = parseddid;
        }

        const query = gql`
            query getCid($path: ID!) {
                geoDID(id: $path) {
                    cid
                }
            }
        `;

        console.log(pathActual);

        const variables = {
            path: 'did:geo:QmZjqfZbdR2f6pUXYjkFgfQA3y2rEJ2jXddtTGwz2zjMP2',
        };

        const data = await graphQLClient.request(query, variables);

        if (data) {
            const bytes: Uint8Array = await powergate.getGeoDIDDocument(data.geoDID.cid);
            strj = new TextDecoder('utf-8').decode(bytes);
        }
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
