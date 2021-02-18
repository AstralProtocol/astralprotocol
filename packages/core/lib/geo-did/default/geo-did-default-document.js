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
exports.ConcreteDefaultGeoDIDDocument = void 0;
const utils_1 = require("../utils/utils");
class ConcreteDefaultGeoDIDDocument {
    constructor() { }
    buildDocument() {
        this.geoDID = {
            '@context': 'https://w3id.org/did/v1',
            id: this.geoDIDid,
            publicKey: this.publicKey,
            didmetadata: this.didmetadata,
            links: this.links,
            service: this.serviceEndpoint
        };
    }
    prepChildGeoDID(ethAddress, parentid, path) {
        throw new Error('Method not implemented.');
    }
    prepRootGeoDID(ethAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const geoId = yield utils_1.GeoDoctypeUtils.createGeodidIdFromGenesis(ethAddress);
                this.geoDIDid = utils_1.GeoDoctypeUtils.normalizeDocId(geoId);
                this.publicKey = [
                    {
                        id: this.geoDIDid.concat('#controller'),
                        type: 'Secp256k1VerificationKey2018',
                        controller: this.geoDIDid,
                        ethereumAddress: ethAddress
                    }
                ];
                this.didmetadata = {
                    type: "default",
                    created: new Date()
                };
                this.links = [
                    {
                        id: this.geoDIDid,
                        type: "default",
                        rel: "root"
                    },
                    {
                        id: this.geoDIDid,
                        type: "default",
                        rel: "self"
                    }
                ];
                this.serviceEndpoint = [];
                this.buildDocument();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getDocType() {
        return this.doctype;
    }
    getDidDocument() {
        return JSON.stringify(this.geoDID);
    }
    getGeoDIDid() {
        return this.geoDIDid;
    }
}
exports.ConcreteDefaultGeoDIDDocument = ConcreteDefaultGeoDIDDocument;
//# sourceMappingURL=geo-did-default-document.js.map