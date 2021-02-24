import { AstralClient } from '../astral-client';
import { DIDResolver, DIDDocument, ParsedDID } from 'did-resolver';
import { Powergate } from '../pin/powergate';
import { GraphQLClient, gql } from 'graphql-request';

export interface ResolverRegistry {
    [index: string]: DIDResolver;
}

interface IVariables {
    path: string
}

interface Response {
    geoDID: GeoDID
}

interface GeoDID {
    cid: string 
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
            query getCid($path: String!) {
                geoDID(id: $path) {
                    cid
                }
            }
        `;

        console.log(pathActual);

        const variables: IVariables = {
            path: pathActual,
        };

        console.log(variables);

        const data: Response = await graphQLClient.request(query, variables);
        console.log(data);

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
