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
const resolve = (astral, powergate, parseddid, parsedid, parsedpath, parsedfragment) => __awaiter(void 0, void 0, void 0, function* () {
    const path = parseddid.concat(parsedpath);
    const bytes = yield powergate.getGeoDIDDocument(astral.docmap[path].cid);
    const strj = new TextDecoder('utf-8').decode(bytes);
    return JSON.parse(strj);
});
exports.default = {
    getResolver: (astral, powergate) => {
        return {
            'geo': (did, parsed) => __awaiter(void 0, void 0, void 0, function* () {
                return resolve(astral, powergate, parsed.did, parsed.id, parsed.path, parsed.fragment);
            })
        };
    }
};
//# sourceMappingURL=geo-did-resolver.js.map