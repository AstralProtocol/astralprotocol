import { createPow, PushStorageConfigOptions, ffsTypes} from "@textile/powergate-client"
//import async from "async"
import { Context } from "../context/context"
import CID from "cids"


export interface Pinning {
    open(): Promise<void>;
    close(): Promise<void>;
    pin(cid: CID): Promise<void>;
    unpin(cid: CID): Promise<void>;
}

export enum JobStatus {
    JOB_STATUS_UNSPECIFIED =0,
    JOB_STATUS_QUEUED= 1,
    JOB_STATUS_EXECUTING= 2,
    JOB_STATUS_FAILED= 3,
    JOB_STATUS_CANCELED= 4,
    JOB_STATUS_SUCCESS= 5
}

// create powergate instance
export class Powergate implements Pinning {

    readonly endpoint: string
    readonly token: string

    #host: string
    #pow: any // The powergate instance type

    // Readonly properties must be initialized at their declaration or in the constructor.
    constructor (context: Context) {
        //super();
        this.#host = "http://0.0.0.0:6002"
        
    }
    
    async open(): Promise<void> {
        this.#pow = createPow({host: this.endpoint})
        this.#pow.setToken(this.token)
    }
    async close(): Promise<void> {
        throw new Error("Method not implemented.")
    }
    async pin(cid: any): Promise<void> {
        try {
            await this.#pow.ffs.pushStorageConfig(cid.toString())
        } catch (e) {
            if (e.message.includes('cid already pinned, consider using override flag')) {
                // Do Nothing
            } else {
                throw e
            }
        }
    }

    async unpin(cid: any): Promise<void> {
        const { config } = await this.#pow.ffs.getStorageConfig(cid.toString())
        const next = Object.assign({}, config, {
            config: {
                ...config,
                repairable: false,
                hot: {
                    ...config.hot,
                    allowUnfreeze: false,
                    enabled: false
                },
                cold: {
                    ...config.cold,
                    enabled: false
                }
            }
        })
        //const opts = [ffsOptions.withOverride(true), ffsOptions.withStorageConfig(next)]
        //const {jobId} = await this.#pow.ffs.pushStorageConfig(cid.toString(), ...opts)
        const {jobId} = await this.#pow.ffs.pushStorageConfig(cid.toString())
        await this.waitForJobStatus(jobId, JobStatus.JOB_STATUS_SUCCESS)
        await this.#pow.ffs.remove(cid.toString())
    }

    protected waitForJobStatus(jobId: string, status: ffsTypes.JobStatusMap[keyof ffsTypes.JobStatusMap]): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const cancel = this.#pow.ffs.watchJobs((job: any) => {
                if (job.errCause && job.errCause.length > 0) {
                    reject(new Error(job.errCause))
                }
                if (job.status === JobStatus.JOB_STATUS_CANCELED) {
                    reject(new Error("job canceled"))
                }
                if (job.status === JobStatus.JOB_STATUS_FAILED) {
                    reject(new Error("job failed"))
                }
                if (job.status === status) {
                    cancel()
                    resolve()
                }
            }, jobId)
        })
    }

}
