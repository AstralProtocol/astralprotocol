import { Pow, createPow, PushStorageConfigOptions, ffsTypes, Config } from "@textile/powergate-client"
//import async from "async"
import { Context } from "../Context/context"
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

    readonly endpoint?: string
    readonly token?: string

    #host?: string
    #pow?: Pow // The powergate instance type

    // Readonly properties must be initialized at their declaration or in the constructor.
    constructor (host: string, pow: Pow, tokenval: string) {
        this.#host = host
        this.#pow = pow
        this.token = tokenval

        console.log("The Auth Token value is: " + this.token)
    }


    static async build (): Promise<Powergate> {
        const host: string = "http://0.0.0.0:6002"
        const pow: Pow = createPow({ host })
        let tokenval: string  = ""
        try {
            const { token } = await pow.ffs.create() // save this token for later use!
            tokenval = token
            pow.setToken(token)
        }
        catch(err){
            console.log(err)
        }
        return new Powergate(host, pow, tokenval);
    }

    async createToken (): Promise<any>{
        const { token } = await this.#pow.ffs.create() // save this token for later use!
        this.#pow.setToken(token)
        return token
    }

    get pow() {
        return this.#pow
    }
    
    async open(): Promise<void> {
        this.#pow = createPow({host: this.#host})
        this.#pow.setToken(this.token)
    }

    async getToken(): Promise<any>{
        return this.token
    }

    async close(): Promise<void> {
        throw new Error("Method not implemented.")
    }

    async getAssetCid(buffer: any): Promise<any>{
        const {cid} = await this.#pow.ffs.stage(buffer)
        return cid
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
