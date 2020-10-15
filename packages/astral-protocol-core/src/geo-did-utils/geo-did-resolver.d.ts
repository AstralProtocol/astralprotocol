import { Document } from "../document";
import { DIDResolver, DIDDocument } from "did-resolver";
import { IStacItemMetadata, IServiceEndpoint } from "../geo-did-utils/geo-did-spec";
interface GeoDIDDocument extends DIDDocument {
    stacmetadata: IStacItemMetadata;
    service: IServiceEndpoint[];
}
interface ResolverRegistry {
    [index: string]: DIDResolver;
}
export declare function geoload(): void;
export declare function wrapDocument(stacmetadata: IStacItemMetadata, service: IServiceEndpoint[], did: string): GeoDIDDocument;
declare const _default: {
    getResolver: (document: Document) => ResolverRegistry;
};
export default _default;
