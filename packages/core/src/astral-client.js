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
const geo_document_1 = require("./geo-document");
const powergate_1 = require("./pin/powergate");
class AstralClient {
    constructor() {
        this.context = { astral: this };
        this.docmap = {};
    }
    createGeoDID(stacjson, ethereumAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const powergate = yield powergate_1.Powergate.build();
            const document = yield geo_document_1.GeoDocument.build(stacjson, ethereumAddress, powergate);
            console.log(document);
            yield document.createGeoDIDDocument();
            const geodidid = yield document.getGeoDidId();
            console.log(geodidid);
            const doc = yield document.constructGeoDIDDocument();
            console.log(doc);
            const stringdoc = JSON.stringify(doc);
            console.log(stringdoc);
            const uint8array = new TextEncoder().encode(stringdoc);
            console.log(uint8array);
            const cid = yield powergate.getAssetCid(uint8array);
            console.log(cid);
            yield powergate.pin(cid);
            this.docmap[geodidid] = {
                authToken: yield powergate.getToken(),
                cid: cid
            };
            console.log(this.docmap[geodidid]);
            return geodidid;
        });
    }
    loadDocument(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            let geoDidDoc = {};
            if (this.docmap[docId]) {
                const powergate = yield powergate_1.Powergate.build(this.docmap[docId].authToken);
                console.log(powergate);
                const bytes = yield powergate.getGeoDIDDocument(this.docmap[docId].cid);
                console.log(bytes);
                const strj = new TextDecoder('utf-8').decode(bytes);
                console.log(strj);
                geoDidDoc = JSON.parse(strj);
                console.log(geoDidDoc);
            }
            else {
                geoDidDoc = { "errror": "Error in Retreiving GeoDID Document" };
            }
            return geoDidDoc;
        });
    }
}
exports.default = AstralClient;
//# sourceMappingURL=astral-client.js.map