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
var _host, _pow;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Powergate = exports.JobStatus = void 0;
const powergate_client_1 = require("@textile/powergate-client");
var JobStatus;
(function (JobStatus) {
    JobStatus[JobStatus["JOB_STATUS_UNSPECIFIED"] = 0] = "JOB_STATUS_UNSPECIFIED";
    JobStatus[JobStatus["JOB_STATUS_QUEUED"] = 1] = "JOB_STATUS_QUEUED";
    JobStatus[JobStatus["JOB_STATUS_EXECUTING"] = 2] = "JOB_STATUS_EXECUTING";
    JobStatus[JobStatus["JOB_STATUS_FAILED"] = 3] = "JOB_STATUS_FAILED";
    JobStatus[JobStatus["JOB_STATUS_CANCELED"] = 4] = "JOB_STATUS_CANCELED";
    JobStatus[JobStatus["JOB_STATUS_SUCCESS"] = 5] = "JOB_STATUS_SUCCESS";
})(JobStatus = exports.JobStatus || (exports.JobStatus = {}));
class Powergate {
    constructor(host, pow, tokenval) {
        _host.set(this, void 0);
        _pow.set(this, void 0);
        __classPrivateFieldSet(this, _host, host);
        __classPrivateFieldSet(this, _pow, pow);
        this.token = tokenval;
        console.log("The Auth Token value is: " + this.token);
    }
    static build(tokenval) {
        return __awaiter(this, void 0, void 0, function* () {
            const host = "http://40.114.81.87:6002";
            const pow = powergate_client_1.createPow({ host });
            if (tokenval == undefined) {
                try {
                    const { token } = yield pow.ffs.create();
                    tokenval = token;
                    pow.setToken(token);
                }
                catch (err) {
                    console.log(err);
                }
            }
            else {
                pow.setToken(tokenval);
            }
            return new Powergate(host, pow, tokenval);
        });
    }
    createToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = yield __classPrivateFieldGet(this, _pow).ffs.create();
            __classPrivateFieldGet(this, _pow).setToken(token);
            return token;
        });
    }
    get pow() {
        return __classPrivateFieldGet(this, _pow);
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            __classPrivateFieldSet(this, _pow, powergate_client_1.createPow({ host: __classPrivateFieldGet(this, _host) }));
            __classPrivateFieldGet(this, _pow).setToken(this.token);
        });
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.token;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getAssetCid(buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cid } = yield __classPrivateFieldGet(this, _pow).ffs.stage(buffer);
            return cid;
        });
    }
    getGeoDIDDocument(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            const bytes = yield this.pow.ffs.get(cid);
            return bytes;
        });
    }
    pin(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield __classPrivateFieldGet(this, _pow).ffs.pushStorageConfig(cid.toString());
            }
            catch (e) {
                if (e.message.includes('cid already pinned, consider using override flag')) {
                }
                else {
                    throw e;
                }
            }
        });
    }
    unpin(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            const { config } = yield __classPrivateFieldGet(this, _pow).ffs.getStorageConfig(cid.toString());
            const next = Object.assign({}, config, {
                config: Object.assign(Object.assign({}, config), { repairable: false, hot: Object.assign(Object.assign({}, config.hot), { allowUnfreeze: false, enabled: false }), cold: Object.assign(Object.assign({}, config.cold), { enabled: false }) })
            });
            const { jobId } = yield __classPrivateFieldGet(this, _pow).ffs.pushStorageConfig(cid.toString());
            yield this.waitForJobStatus(jobId, JobStatus.JOB_STATUS_SUCCESS);
            yield __classPrivateFieldGet(this, _pow).ffs.remove(cid.toString());
        });
    }
    waitForJobStatus(jobId, status) {
        return new Promise((resolve, reject) => {
            const cancel = __classPrivateFieldGet(this, _pow).ffs.watchJobs((job) => {
                if (job.errCause && job.errCause.length > 0) {
                    reject(new Error(job.errCause));
                }
                if (job.status === JobStatus.JOB_STATUS_CANCELED) {
                    reject(new Error("job canceled"));
                }
                if (job.status === JobStatus.JOB_STATUS_FAILED) {
                    reject(new Error("job failed"));
                }
                if (job.status === status) {
                    cancel();
                    resolve();
                }
            }, jobId);
        });
    }
}
exports.Powergate = Powergate;
_host = new WeakMap(), _pow = new WeakMap();
//# sourceMappingURL=powergate.js.map