import AstralClient from '../astral-client';
import { DIDResolver } from 'did-resolver';
import { Powergate } from '../pin/powergate';
export interface ResolverRegistry {
    [index: string]: DIDResolver;
}
declare const _default: {
    getResolver: (astral: AstralClient, powergate: Powergate) => ResolverRegistry;
};
export default _default;
