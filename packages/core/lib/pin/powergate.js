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
    constructor(_host, _pow, _token) {
        this._host = _host;
        this._pow = _pow;
        this._token = _token;
        console.log('The Auth Token value is: ' + _token);
    }
    static build(tokenval) {
        return __awaiter(this, void 0, void 0, function* () {
            const host = "http://0.0.0.0:6002";
            const pow = powergate_client_1.createPow({ host });
            if (tokenval) {
                pow.setAdminToken(tokenval);
                pow.setToken(tokenval);
            }
            else {
                try {
                    const { user } = yield pow.admin.users.create();
                    tokenval = user === null || user === void 0 ? void 0 : user.token;
                    pow.setAdminToken(user === null || user === void 0 ? void 0 : user.token);
                    pow.setToken(user === null || user === void 0 ? void 0 : user.token);
                }
                catch (err) {
                    console.log(err);
                }
            }
            return new Powergate(host, pow, tokenval);
        });
    }
    get pow() {
        return this._pow;
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            this._pow = powergate_client_1.createPow({ host: this._host });
            if (this._token) {
                this._pow.setAdminToken(this._token);
                this._pow.setToken(this._token);
            }
        });
    }
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._token;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    getAssetCid(buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cid } = yield this._pow.data.stage(buffer);
            return cid;
        });
    }
    getGeoDIDDocument(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            const bytes = yield this._pow.data.get(cid);
            return bytes;
        });
    }
    pin(cid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jobId } = yield this._pow.storageConfig.apply(cid);
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
    waitForJobStatus(jobId) {
        return new Promise((resolve, reject) => {
            const jobsCancel = this._pow.storageJobs.watch((job) => {
                if (job.status === powergate_client_1.powTypes.JobStatus.JOB_STATUS_CANCELED) {
                    console.log("job canceled");
                }
                else if (job.status === powergate_client_1.powTypes.JobStatus.JOB_STATUS_FAILED) {
                    console.log("job failed");
                }
                else if (job.status === powergate_client_1.powTypes.JobStatus.JOB_STATUS_SUCCESS) {
                    console.log("job success!");
                }
            }, jobId);
        });
    }
}
exports.Powergate = Powergate;
//# sourceMappingURL=powergate.js.map