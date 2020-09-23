import {createPow} from "@textile/powergate-client"
import { PowergatePinning } from "../powergate/powergate-pinning"
import { Resolver } from "did-resolver"
import {AstralClient} from "../astral-client"
import { DID } from "dids"

export interface Context {
    did?: DID;
    astral?: AstralClient;
    powergate?: PowergatePinning;
    resolver?: Resolver;
}