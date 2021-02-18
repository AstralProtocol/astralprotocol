import { Pow } from '@textile/powergate-client';
export interface Pinning {
    open(): Promise<void>;
    close(): Promise<void>;
    pin(cid: string): Promise<void>;
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
    private _host;
    private _pow;
    private _token?;
    readonly endpoint?: string;
    constructor(_host: string, _pow: Pow, _token?: string);
    static build(tokenval?: string): Promise<Powergate>;
    get pow(): Pow;
    open(): Promise<void>;
    getToken(): Promise<any>;
    close(): Promise<void>;
    getAssetCid(buffer: any): Promise<string>;
    getGeoDIDDocument(cid: string): Promise<Uint8Array>;
    pin(cid: string): Promise<void>;
    protected waitForJobStatus(jobId: string): Promise<void>;
}
