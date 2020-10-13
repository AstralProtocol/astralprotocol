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
const document_1 = __importDefault(require("./document"));
const powergate_1 = require("./pinning/powergate");
class AstralClient {
    constructor() {
        this.context = { astral: this };
        this._docmap = {};
    }
    createGeoDID(stacjson, ethereumAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            let powergate = yield powergate_1.Powergate.build();
            let document = new document_1.default(this.state, stacjson, ethereumAddress, powergate);
            yield document.scrapeStac();
            yield document.createGeoDIDDocument();
            const geodidid = yield document.getGeoDidId();
            let doc = yield document.loadcreateGeoDIDDocument();
            let stringdoc = JSON.stringify(doc);
            var uint8array = new TextEncoder().encode(stringdoc);
            const cid = yield powergate.getAssetCid(uint8array);
            yield powergate.pin(cid);
            this._docmap[geodidid] = {
                authToken: yield powergate.getToken(),
                cid: cid,
                document: document
            };
            return geodidid;
        });
    }
    loadDocument(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            let geoDidDoc;
            try {
                if (this._docmap[docId]) {
                    let powergate = yield powergate_1.Powergate.build(this._docmap[docId].authToken);
                    let bytes = yield powergate.getGeoDIDDocument(this._docmap[docId].cid);
                    var strj = new TextDecoder("utf-8").decode(bytes);
                    geoDidDoc = JSON.parse(strj);
                }
            }
            catch (err) {
                console.log(err);
            }
            return geoDidDoc;
        });
    }
}
exports.AstralClient = AstralClient;
//# sourceMappingURL=astral-client.js.map