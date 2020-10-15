"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapDocument = exports.geoload = void 0;
function geoload() { }
exports.geoload = geoload;
function wrapDocument(stacmetadata, service, did) {
    const startDoc = {
        '@context': 'https://w3id.org/did/v1',
        id: did,
        publicKey: [],
        authentication: [],
        service: service,
        stacmetadata: stacmetadata
    };
    startDoc.publicKey.push({
        id: `${did}#MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSv`,
        type: 'Secp256k1VerificationKey2018',
        controller: did,
        publicKeyHex: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSv'
    });
    return startDoc;
}
exports.wrapDocument = wrapDocument;
exports.default = {
    getResolver: (document) => ({
        'geo': (did, parsed) => __awaiter(void 0, void 0, void 0, function* () {
            if (parsed.fragment == undefined) {
                const stacitemmetadata = yield document.getStacItemMetadata();
                const services = yield document.getServices();
                return wrapDocument(stacitemmetadata, services, did);
            }
            else {
                console.log(did);
            }
        })
    })
};
//# sourceMappingURL=geo-did-resolver.js.map