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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _normalizedGeoDidId, _transformer, _stacmetadata, _service, _geoDIDResolver, _didResolver;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorStatus = exports.SignatureStatus = void 0;
const events_1 = require("events");
const transformer_1 = require("./transformer/transformer");
const did_resolver_1 = require("did-resolver");
const geo_did_resolver_1 = __importDefault(require("./geo-did-utils/geo-did-resolver"));
var SignatureStatus;
(function (SignatureStatus) {
    SignatureStatus[SignatureStatus["GENESIS"] = 0] = "GENESIS";
    SignatureStatus[SignatureStatus["PARTIAL"] = 1] = "PARTIAL";
    SignatureStatus[SignatureStatus["SIGNED"] = 2] = "SIGNED";
})(SignatureStatus = exports.SignatureStatus || (exports.SignatureStatus = {}));
var AnchorStatus;
(function (AnchorStatus) {
    AnchorStatus[AnchorStatus["NOT_REQUESTED"] = 0] = "NOT_REQUESTED";
    AnchorStatus[AnchorStatus["PENDING"] = 1] = "PENDING";
    AnchorStatus[AnchorStatus["PROCESSING"] = 2] = "PROCESSING";
    AnchorStatus[AnchorStatus["ANCHORED"] = 3] = "ANCHORED";
    AnchorStatus[AnchorStatus["FAILED"] = 4] = "FAILED";
})(AnchorStatus = exports.AnchorStatus || (exports.AnchorStatus = {}));
class Document extends events_1.EventEmitter {
    constructor(_state, _stacjson, _ethereumAddress, powergate) {
        super();
        this._state = _state;
        this._stacjson = _stacjson;
        this._ethereumAddress = _ethereumAddress;
        this.powergate = powergate;
        _normalizedGeoDidId.set(this, void 0);
        _transformer.set(this, void 0);
        _stacmetadata.set(this, void 0);
        _service.set(this, void 0);
        _geoDIDResolver.set(this, void 0);
        _didResolver.set(this, void 0);
    }
    createGeoDIDDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _geoDIDResolver, geo_did_resolver_1.default.getResolver(this));
            __classPrivateFieldSet(this, _didResolver, new did_resolver_1.Resolver(__classPrivateFieldGet(this, _geoDIDResolver)));
        });
    }
    loadcreateGeoDIDDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield __classPrivateFieldGet(this, _didResolver).resolve(__classPrivateFieldGet(this, _normalizedGeoDidId));
            return doc;
        });
    }
    getStacItemMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _stacmetadata);
        });
    }
    getServices() {
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _service);
        });
    }
    instantiateTransformer() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _transformer, new transformer_1.Transformer(this._stacjson, this.powergate));
        });
    }
    getGeoDidId() {
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _normalizedGeoDidId);
        });
    }
    scrapeStac() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.instantiateTransformer();
                __classPrivateFieldSet(this, _normalizedGeoDidId, yield __classPrivateFieldGet(this, _transformer).getGeoDIDid(this._ethereumAddress));
                console.log(__classPrivateFieldGet(this, _normalizedGeoDidId) + '\n');
                __classPrivateFieldSet(this, _stacmetadata, yield __classPrivateFieldGet(this, _transformer).getStacItemMetadata());
                console.log(__classPrivateFieldGet(this, _stacmetadata));
                yield __classPrivateFieldGet(this, _transformer).assetToService();
                __classPrivateFieldSet(this, _service, yield __classPrivateFieldGet(this, _transformer).getServices());
                console.log(__classPrivateFieldGet(this, _service));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    get doctype() {
        return this._state.doctype;
    }
    get metadata() {
        const { metadata } = this._state;
        return metadata;
    }
    get owners() {
        return this.metadata.owners;
    }
    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }
}
exports.default = Document;
_normalizedGeoDidId = new WeakMap(), _transformer = new WeakMap(), _stacmetadata = new WeakMap(), _service = new WeakMap(), _geoDIDResolver = new WeakMap(), _didResolver = new WeakMap();
//# sourceMappingURL=document.js.map