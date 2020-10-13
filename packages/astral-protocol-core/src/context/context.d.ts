import { Powergate } from "../pinning/powergate";
import { Resolver } from "did-resolver";
import { AstralClient } from "../astral-client";
import { DID } from "dids";
export interface Context {
    did?: DID;
    astral?: AstralClient;
    transformer?: Transformer;
    powergate?: Powergate;
    token?: any;
    resolver?: Resolver;
}
