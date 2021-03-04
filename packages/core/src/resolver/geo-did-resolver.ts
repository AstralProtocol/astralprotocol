import { AstralClient } from '../astral-client';
import { DIDResolver, DIDDocument, ParsedDID } from 'did-resolver';
import { Powergate } from '../pin/powergate';

import { createApolloFetch } from 'apollo-fetch';

export interface ResolverRegistry {
    [index: string]: DIDResolver;
}

interface Variables {
    geoDIDID: string;
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
        const uri = 'https://api.thegraph.com/subgraphs/name/astralprotocol/spatialassetsv06';

        /*
        const graphQLClient = new GraphQLClient(endpoint, {
            headers: {},
        });*/

        let pathActual: string = '';

        if (parsedpath) {
            pathActual = parseddid.concat(parsedpath);
        } else {
            pathActual = parseddid;
        }
        

        const query = `
        query($geoDIDID: ID!) {
            geoDID(id: $geoDIDID) {
                cid
            }
        }`;

        const variables: Variables = {
            geoDIDID: pathActual,
        };

        const apolloFetch = createApolloFetch({ uri });
        console.log(apolloFetch);

        console.log(pathActual);

        console.log(variables);

        // Error: Response is null when geodid id is not hardcoded.
        const res = await apolloFetch({ query, variables });
        //const data: Response = await graphQLClient.request(query, variables);
        console.log(res);

        const cid = res.data.geoDID.cid;
        console.log(cid);

        if (res.data) {
            const bytes: Uint8Array = await powergate.getGeoDIDDocument(cid);
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
