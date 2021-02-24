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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstralClient = void 0;
const powergate_1 = require("./pin/powergate");
const document_1 = require("./docu/document");
const geo_did_resolver_1 = __importDefault(require("./resolver/geo-did-resolver"));
const did_resolver_1 = require("did-resolver");
const graphql_request_1 = require("graphql-request");
class AstralClient {
    constructor(_ethereumAddress) {
        this._ethereumAddress = _ethereumAddress;
        this.document = new document_1.Document(_ethereumAddress);
        this.graphQLClient = new graphql_request_1.GraphQLClient('https://api.thegraph.com/subgraphs/name/astralprotocol/spatialassetsv04');
        this.docmap = {};
    }
    getPowergateInstance(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let powergate;
            if (token) {
                powergate = yield powergate_1.Powergate.build(token);
            }
            else {
                powergate = yield powergate_1.Powergate.build();
            }
            return powergate;
        });
    }
    createGenesisGeoDID(_typeOfGeoDID) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield this.document.addGenesisDocument(_typeOfGeoDID);
            }
            catch (e) {
                console.log("Unable to initialize");
            }
            return response;
        });
    }
    createChildGeoDID(_typeOfGeoDID, _parentID, _path) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                response = yield this.document.addChildDocument(_typeOfGeoDID, _parentID, _path);
            }
            catch (e) {
                console.log("Unable to initialize");
            }
            return response;
        });
    }
    pinDocument(documentInfo, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let cid;
            let pinDate = new Date();
            let powergate;
            try {
                if (token) {
                    powergate = yield powergate_1.Powergate.build(token);
                }
                else {
                    powergate = yield powergate_1.Powergate.build();
                }
                token = yield powergate.getToken();
                const stringdoc = JSON.stringify(documentInfo.documentVal);
                console.log(stringdoc);
                const uint8array = new TextEncoder().encode(stringdoc);
                console.log(uint8array);
                cid = yield powergate.getAssetCid(uint8array);
                console.log(cid);
                yield powergate.pin(cid);
                if (this.docmap[documentInfo.geodidid] === undefined) {
                    this.docmap[documentInfo.geodidid] = {
                        authToken: token,
                        cid: cid
                    };
                }
                else {
                    this.updateMapping(documentInfo.geodidid, cid);
                }
                console.log(this.docmap[documentInfo.geodidid]);
            }
            catch (e) {
                console.log(e);
            }
            return { geodidid: documentInfo.geodidid, cid: cid, pinDate: pinDate, token: token };
        });
    }
    updateMapping(docId, newCID) {
        this.docmap[docId].cid = newCID;
    }
    pinAsset(docId, powergate, asset) {
        return __awaiter(this, void 0, void 0, function* () {
            let seCID;
            try {
                const uint8array = new TextEncoder().encode(asset.data);
                seCID = yield powergate.getAssetCid(uint8array);
                yield powergate.pin(seCID);
            }
            catch (e) {
                console.log(e);
            }
            return {
                id: docId.concat(asset.name),
                type: asset.type,
                serviceEndpoint: seCID
            };
        });
    }
    addAssetsToItem(docId, assets, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            let serviceArray;
            try {
                response = yield this.loadDocument(docId, token);
                if (response.documentInfo.documentVal.didmetadata.type === "item") {
                    serviceArray = yield assets.map(value => this.pinAsset(docId, response.powergateInstance, value));
                    yield serviceArray.forEach((value) => (response.documentInfo.documentVal.service).push(value));
                }
                else {
                    throw new Error('Unfortunately the Document ID you provided is not of Item type, so you cannot add any Assets to this Document. Please try again with a valid GeoDID Item');
                }
            }
            catch (e) {
                console.log(e);
            }
            return response.documentInfo;
        });
    }
    loadDocument(docId, token) {
        return __awaiter(this, void 0, void 0, function* () {
            let doc;
            const powergate = yield this.getPowergateInstance(token);
            try {
                const geoDidResolver = geo_did_resolver_1.default.getResolver(this, powergate);
                const didResolver = new did_resolver_1.Resolver(geoDidResolver);
                doc = yield didResolver.resolve(docId);
            }
            catch (e) {
                console.log(e);
            }
            return { documentInfo: { geodidid: docId, documentVal: doc }, powergateInstance: powergate };
        });
    }
    testQL() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = graphql_request_1.gql `
        {
            geoDIDs {
                id
                owner
                cid
                storage
                root
                parent
                edges {
                    id
                    childGeoDID {
                    id
                    }
                }
                active
                type
            }
        }`;
            const data = yield this.graphQLClient.request(query);
            console.log(JSON.stringify(data));
        });
    }
}
exports.AstralClient = AstralClient;
//# sourceMappingURL=astral-client.js.map