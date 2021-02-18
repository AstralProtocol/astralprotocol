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
exports.ConcreteDefaultGeoDIDCollection = void 0;
const geo_did_default_document_1 = require("./geo-did-default-document");
const utils_1 = require("../utils/utils");
class ConcreteDefaultGeoDIDCollection extends geo_did_default_document_1.ConcreteDefaultGeoDIDDocument {
    constructor() { super(); }
    getGeoDIDid() {
        return this.geoDIDid;
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
                    type: "collection",
                    created: new Date()
                };
                this.links = [
                    {
                        id: this.geoDIDid,
                        type: "collection",
                        rel: "root"
                    },
                    {
                        id: this.geoDIDid,
                        type: "collection",
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
    prepChildGeoDID(ethAddress, parentid, path) {
        return __awaiter(this, void 0, void 0, function* () {
            this.geoDIDid = parentid.concat('/' + path);
            const rootGeoDID = utils_1.GeoDoctypeUtils.getBaseGeoDidId(parentid);
            this.publicKey = [
                {
                    id: this.geoDIDid.concat('#controller'),
                    type: 'Secp256k1VerificationKey2018',
                    controller: this.geoDIDid,
                    ethereumAddress: ethAddress
                }
            ];
            this.didmetadata = {
                type: "collection",
                created: new Date()
            };
            this.links = [
                {
                    id: this.geoDIDid,
                    type: "collection",
                    rel: "root"
                },
                {
                    id: this.geoDIDid,
                    type: "collection",
                    rel: "self"
                },
                {
                    id: parentid,
                    type: "collection",
                    rel: "parent"
                }
            ];
            this.serviceEndpoint = [];
            this.buildDocument();
        });
    }
}
exports.ConcreteDefaultGeoDIDCollection = ConcreteDefaultGeoDIDCollection;
//# sourceMappingURL=geo-did-default-collection.js.map