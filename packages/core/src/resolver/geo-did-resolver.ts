import { AstralClient } from '../astral-client';
import { DIDResolver, DIDDocument, ParsedDID } from 'did-resolver';
import { Powergate } from '../pin/powergate';

import { GraphQLClient, gql } from 'graphql-request';

export interface ResolverRegistry {
    [index: string]: DIDResolver;
}

interface Variables {
    [key: string]: any
}

interface Response {
    geoDID: {
        cid: string;
    }
}

async function getCID<T extends Response>(data: T): Promise<string>{
    return (data.geoDID.cid).toString();
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

    const client = new GraphQLClient('https://api.thegraph.com/subgraphs/name/astralprotocol/spatialassetsv05')

    let pathActual: string = '';

    if (parsedpath != undefined) {
        pathActual = parseddid.concat(parsedpath);
    } else {
        pathActual = parseddid;
    }

    console.log(pathActual);

    const query =  gql`
        query($geoDIDID: ID!){
            geoDID(id: $geoDIDID) {
                cid
            }
        }
    `;

    //const defau: string = 'did:geo:QmagvfzHDaPnFzwfii6Z4H4S3kcJByzhfGaTfj9DvpEa14';

    const variables: Variables = {
        geoDIDID: pathActual,
    };

    try {

        const data: any = await client.request(query, variables)

        let cid: string = '';

        if(data.hasOwnProperty('geoDID')){
            if(data.geoDID != null){
                cid = await getCID(data);
            }
            else{
                cid = 'Unknown';
            }
        } 
        
        console.log(cid);

        if (cid != 'Unknown') {
            const bytes: Uint8Array = await powergate.getGeoDIDDocument(cid);
            strj = new TextDecoder('utf-8').decode(bytes);
        }
        else{
            throw new Error("This GeoDID has not been pinned on the FFS yet. Please pin the document first with the pinDocument function, thank you.")
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
