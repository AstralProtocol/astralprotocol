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
exports.Document = void 0;
const geo_did_default_factory_1 = require("../geo-did/default/geo-did-default-factory");
const geo_did_default_collection_1 = require("../geo-did/default/geo-did-default-collection");
const geo_did_default_item_1 = require("../geo-did/default/geo-did-default-item");
class Document {
    constructor(_ethereumAddress) {
        this._ethereumAddress = _ethereumAddress;
    }
    addGenesisDocument(_typeOfGeoDID) {
        return __awaiter(this, void 0, void 0, function* () {
            let document;
            const factory = new geo_did_default_factory_1.ConcreteDefaultFactory();
            try {
                switch (_typeOfGeoDID.toLowerCase()) {
                    case 'collection':
                        document = yield factory.createGeoDIDDocument(geo_did_default_collection_1.ConcreteDefaultGeoDIDCollection);
                        yield document.prepRootGeoDID(this._ethereumAddress);
                        break;
                    case 'item':
                        document = yield factory.createGeoDIDDocument(geo_did_default_item_1.ConcreteDefaultGeoDIDItem);
                        yield document.prepRootGeoDID(this._ethereumAddress);
                        break;
                    default:
                        throw new Error('Invalid Option, please select Item or Collection');
                }
            }
            catch (e) {
                console.log(e);
            }
            const geodidid = document.getGeoDIDid();
            const documentVal = JSON.parse(document.getDidDocument());
            return {
                'geodidid': geodidid,
                'documentVal': documentVal
            };
        });
    }
    addChildDocument(_typeOfGeoDID, _parentID, _path) {
        return __awaiter(this, void 0, void 0, function* () {
            let document;
            const factory = new geo_did_default_factory_1.ConcreteDefaultFactory();
            try {
                switch (_typeOfGeoDID.toLowerCase()) {
                    case 'collection':
                        document = yield factory.createGeoDIDDocument(geo_did_default_collection_1.ConcreteDefaultGeoDIDCollection);
                        yield document.prepChildGeoDID(this._ethereumAddress, _parentID, _path);
                        break;
                    case 'item':
                        document = yield factory.createGeoDIDDocument(geo_did_default_item_1.ConcreteDefaultGeoDIDItem);
                        yield document.prepChildGeoDID(this._ethereumAddress, _parentID, _path);
                        break;
                    default:
                        throw new Error('Invalid Option, please select Item or Collection');
                }
            }
            catch (e) {
                console.log(e);
            }
            const geodidid = document.getGeoDIDid();
            const documentVal = JSON.parse(document.getDidDocument());
            return {
                'geodidid': geodidid,
                'documentVal': documentVal,
                'parentid': _parentID
            };
        });
    }
}
exports.Document = Document;
//# sourceMappingURL=document.js.map