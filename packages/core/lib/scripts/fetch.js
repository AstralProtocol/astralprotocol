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
exports.fetchJson = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
function fetchJson(url, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        let opts;
        if (payload) {
            opts = {
                method: 'post',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' },
            };
        }
        const res = yield (yield cross_fetch_1.default(url, opts)).json();
        if (res.error)
            throw new Error(res.error);
        return res;
    });
}
exports.fetchJson = fetchJson;
//# sourceMappingURL=fetch.js.map