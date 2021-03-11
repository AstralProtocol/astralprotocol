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

async function declareCID<T extends Response>(data: T): Promise<string>{
    return (data.geoDID.cid).toString();
}

const getCID = async (client: GraphQLClient, query: any, variables: Variables): Promise<any> => {
    let data: any;
    let cid: any; 

    try{
        data = await client.request(query, variables)
        if(data.hasOwnProperty('geoDID')){
            if(data.geoDID != null){
                cid = await declareCID(data);
            }
            else{
                cid = null;
            }
        } 
        
        console.log(cid);
    }catch(e){
        console.log(e);
    }

    return cid;
}

const returnCID = async (client: GraphQLClient, query: any, variables: Variables): Promise<any> => {
        
    let cid: any = await getCID(client, query, variables);
    
    // runs getCID every 2 seconds for 1 minute. Total of 30 calls.
    try{
        if(cid == null){
            let timeOut = setInterval(async() => {
                cid = await getCID(client, query, variables);
    
                if(cid != null) {
                    clearInterval(timeOut);
                    return cid;
                }
    
            }, 5000);
    
            // after 1 minute seconds stop
            setTimeout(() => { clearInterval(timeOut); }, 60000);
        }
    }catch(e){
        console.log(e);
    }
    
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

        const cid: string = await returnCID(client, query, variables);

        if(cid == 'Unknown'){
            throw new Error('CID does not exist on The Graph');
        }
        
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
