import { AstralClient } from '../astral-client';
import { DIDResolver, DIDDocument, ParsedDID } from 'did-resolver';
import { Powergate } from '../pin/powergate';

import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/dynamic';
import cliSpinners from 'cli-spinners';

import { GraphQLClient, gql } from 'graphql-request';

const Ora = require('ora');
const chalk = require('chalk');

export interface ResolverRegistry {
    [index: string]: DIDResolver;
}

interface Variables {
    [key: string]: any;
}

interface Response {
    geoDID: {
        cid: string;
    };
}

async function declareCID<T extends Response>(data: T): Promise<any>{
    if(data.geoDID != null){ return (data.geoDID.cid).toString() }
    else{ return undefined }
}

async function getCID(client: GraphQLClient, query: any, variables: Variables): Promise<any> {
    var data: any;
    var cid: string;

    var counter: number = 0;

    //const spinner = ora('Loading document').start();

    return await new Promise((resolve, reject) => {
        const interval = setIntervalAsync(async() => {
            const spinner = new Ora({
                discardStdin: false,
                text: `${chalk.yellow('Loading document')}`,
                spinner: cliSpinners.dots
            });
        
            spinner.start();
            spinner.color = 'yellow';
            try{
                data = await client.request(query, variables)

                if (data.hasOwnProperty('geoDID')) {
                    cid = await declareCID(data);
                }
            }catch(err){
                reject(`${err}`); // reject
            }

            if (cid != undefined) {
                spinner.clear();
                spinner.succeed(`${chalk.green('Request was successful')}`);
                resolve(cid);
                clearIntervalAsync(interval);
                spinner.stop();
            }
            else if(counter >= 30){
                spinner.clear();
                spinner.fail(`${chalk.red('Failed: ')}`);
                reject(`${chalk.red('The Request Timed out. Please try again.')}`);
                clearIntervalAsync(interval);
                spinner.stop();
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

    const endpoint = astral._thegraphEndpoint;

    const client = new GraphQLClient(endpoint);

    let pathActual: string = '';

    if (parsedpath != undefined) {
        pathActual = parseddid.concat(parsedpath);
    } else {
        pathActual = parseddid;
    }

    const query = gql`
        query($geoDIDID: ID!) {
            geoDID(id: $geoDIDID) {
                cid
            }
        }
    `;

    const variables: Variables = {
        geoDIDID: pathActual,
    };

    try {
        // wait for the response to return cid or timeout
        const cid: string = await getCID(client, query, variables);

        const bytes: Uint8Array = await powergate.getGeoDIDDocument(cid);
        const strj = new TextDecoder('utf-8').decode(bytes);

        return JSON.parse(strj);;

    } catch(e) {
        //console.log(e);
        throw e;
    }
};

// needs a powergate instance to call getResolver
export default {
    getResolver: (astral: AstralClient, powergate: Powergate): ResolverRegistry => {
        return {
            geo: async (did: string, parsed: ParsedDID): Promise<DIDDocument | any | null> => {
                try{
                    return await resolve(astral, powergate, parsed.did, parsed.id, parsed.path, parsed.fragment);
                }catch(e){
                    throw e;
                }
            },
        };
    },
};
