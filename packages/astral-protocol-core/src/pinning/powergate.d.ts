import { Pow, ffsTypes } from "@textile/powergate-client";
import CID from "cids";
export interface Pinning {
    open(): Promise<void>;
    close(): Promise<void>;
    pin(cid: CID): Promise<void>;
    unpin(cid: CID): Promise<void>;
}
export declare enum JobStatus {
    JOB_STATUS_UNSPECIFIED = 0,
    JOB_STATUS_QUEUED = 1,
    JOB_STATUS_EXECUTING = 2,
    JOB_STATUS_FAILED = 3,
    JOB_STATUS_CANCELED = 4,
    JOB_STATUS_SUCCESS = 5
}
export declare class Powergate implements Pinning {
    #private;
    readonly endpoint?: string;
    readonly token?: string;
    constructor(host: string, pow: Pow, tokenval: string);
    static build(tokenval?: string): Promise<Powergate>;
    createToken(): Promise<any>;
    get pow(): Pow;
    open(): Promise<void>;
    getToken(): Promise<any>;
    close(): Promise<void>;
    getAssetCid(buffer: any): Promise<string>;
    getGeoDIDDocument(cid: string): Promise<Uint8Array>;
    pin(cid: any): Promise<void>;
    unpin(cid: any): Promise<void>;
    protected waitForJobStatus(jobId: string, status: ffsTypes.JobStatusMap[keyof ffsTypes.JobStatusMap]): Promise<void>;
}
