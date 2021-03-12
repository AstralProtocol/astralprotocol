import { AstralClient } from '../astral-client';
import { DIDResolver, DIDDocument, ParsedDID } from 'did-resolver';
import { Powergate } from '../pin/powergate';

import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/dynamic';

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

async function declareCID<T extends Response>(data: T): Promise<any>{
    if(data.geoDID.cid){ return (data.geoDID.cid).toString() }
    else{ return undefined }
}

async function getCID(client: GraphQLClient, query: any, variables: Variables): Promise<any> {

    var data: any;
    var cid: string; 

    var counter: number = 0;

    return await new Promise((resolve, reject) => {
      const interval = setIntervalAsync(async() => {

        data = await client.request(query, variables)
        console.log(data);

        if(data.hasOwnProperty('geoDID')){
            cid = await declareCID(data);
        }

        if (cid != undefined) {
            resolve(cid);
            clearIntervalAsync(interval);
        }
        else if(counter >= 50){
            reject("The Request Timed out. Sorry please try again.");
            clearIntervalAsync(interval);
        }

        counter++;
      }, 5000);
    });
}

const resolve = async (
    astral: AstralClient,
    powergate: Powergate,
    parseddid: string,
    parsedid: string,
    parsedpath?: string,
    parsedfragment?: string,
): Promise<DIDDocument | any | null> => {
    let strj: any = '{ empty }';

    const client = new GraphQLClient('https://api.thegraph.com/subgraphs/name/astralprotocol/spatialassetsv05');

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

        const cid: string = await getCID(client, query, variables);
        
        const bytes: Uint8Array = await powergate.getGeoDIDDocument(cid);
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
