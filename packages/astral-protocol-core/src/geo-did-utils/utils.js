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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.GeoDoctypeUtils = void 0;
const ajv_1 = __importDefault(require('ajv'));
const cids_1 = __importDefault(require('cids'));
const multihashing = require('multihashing-async');
class GeoDoctypeUtils {
    static encodeGeoIdentifier(_stacid, _ethereumAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const bytes = new TextEncoder().encode(_stacid + _ethereumAddress);
            const hash = yield multihashing(bytes, 'sha2-256');
            return hash;
        });
    }
    static createGeodidIdFromGenesis(_stacid, _ethereumAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const genesisCid = yield this.createCID(_stacid, _ethereumAddress);
            const baseDocId = ['geo:/', genesisCid.toString()].join('/');
            return baseDocId;
        });
    }
    static normalizeDocId(docId) {
        if (docId.startsWith('geo://')) {
            return docId.replace('geo://', 'did:geo:');
        }
        return docId;
    }
    static getGenesis(docId) {
        const genesis = docId.startsWith('geo://') ? docId.split('//')[1] : docId.split('/')[2];
        const indexOfVersion = genesis.indexOf('?');
        if (indexOfVersion !== -1) {
            return genesis.substring(0, indexOfVersion);
        }
        return genesis;
    }
    static createCID(_stacid, _ethereumAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield GeoDoctypeUtils.encodeGeoIdentifier(_stacid, _ethereumAddress);
            const cid = new cids_1.default(0, 'dag-pb', hash, 'base58btc');
            const cidreturn = cid.toString();
            return cidreturn;
        });
    }
}
exports.GeoDoctypeUtils = GeoDoctypeUtils;
GeoDoctypeUtils.validator = new ajv_1.default({ allErrors: true });
//# sourceMappingURL=utils.js.map
