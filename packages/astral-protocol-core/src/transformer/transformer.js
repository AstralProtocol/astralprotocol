'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Transformer = void 0;
const class_transformer_1 = require('class-transformer');
const utils_1 = require('../geo-did-utils/utils');
const stac_item_spec_1 = require('./stac-item-spec');
class Transformer {
    constructor(jsonObj, powergate) {
        this.powergate = powergate;
        this.services = new Array(5);
        this.assetList = new Array(5);
        this.stacjsonObj = class_transformer_1.plainToClass(stac_item_spec_1.RootObject, jsonObj);
        this.stacID = this.stacjsonObj.getId();
        this.assets = this.stacjsonObj.getAssets();
        this.createAssetList();
        this.setGeometry();
        this.setProperties();
        this.setStacItemMetadata();
    }
    createAssetList() {
        return __awaiter(this, void 0, void 0, function* () {
            this.assetList[0] = this.assets.getThumbnail();
            this.assetList[1] = this.assets.getAnalytic();
            this.assetList[2] = this.assets.getAnalyticXml();
            this.assetList[3] = this.assets.getUdm();
            this.assetList[4] = this.assets.getVisual();
        });
    }
    getAssetList() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.assetList;
        });
    }
    getGeoDIDid(_ethereumAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            let geoId = yield utils_1.GeoDoctypeUtils.createGeodidIdFromGenesis(this.stacID, _ethereumAddress);
            this.geoDIDid = yield utils_1.GeoDoctypeUtils.normalizeDocId(geoId);
            return this.geoDIDid;
        });
    }
    setGeometry() {
        return __awaiter(this, void 0, void 0, function* () {
            this.geometry = yield this.getGeometry();
        });
    }
    getGeometry() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.geometry;
        });
    }
    setProperties() {
        return __awaiter(this, void 0, void 0, function* () {
            this.properties = yield this.stacjsonObj.getProperties();
        });
    }
    getProperties() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.properties;
        });
    }
    setService(index) {
        return __awaiter(this, void 0, void 0, function* () {
            this.services[index] = {
                id: this.geoDIDid + `#${this.assetList[index].roles[0]}`,
                type: this.assetList[index].type,
                serviceEndpoint: this.assetList[index].href,
                description: this.assetList[index].title,
                role: this.assetList[index].roles,
            };
        });
    }
    getServices() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.services;
        });
    }
    setStacItemMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stacItemMetadata = {
                stac_version: yield this.stacjsonObj.getStacVersion(),
                stac_extensions: yield this.stacjsonObj.getStacExtensions(),
                type: yield this.stacjsonObj.getType(),
                id: yield this.stacjsonObj.getId(),
                bbox: yield this.stacjsonObj.getBbox(),
                geometry: yield this.getGeometry(),
                collection: yield this.stacjsonObj.getCollection(),
                properties: yield this.getProperties(),
            };
        });
    }
    getStacItemMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stacItemMetadata;
        });
    }
    getGeoDidId() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.geoDIDid;
        });
    }
    assetToService() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.assetList.length; i++) {
                yield this.setService(i);
            }
        });
    }
}
exports.Transformer = Transformer;
//# sourceMappingURL=transformer.js.map
