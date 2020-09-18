import {createPow} from "@textile/powergate-client"
import { Resolver } from "did-resolver"

export interface Context {
    resolver: Resolver
}