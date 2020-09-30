import fetch from "cross-fetch"
import { Context } from "../context/context"
import axios from "axios"
import { IAssetList } from "../geo-document/geo-did-spec"

export async function fetchJson(url: string, payload?: any): Promise<any> {
    let opts
    if (payload) {
        opts = {
            method: 'post',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        }
    }
    const res = await (await fetch(url, opts)).json()
    if (res.error) throw new Error(res.error)
    return res
}

export async function fetchAsset(url: string): Promise<any>{

    const blob =  await (await fetch(url)).blob()

    return blob

}

/*
export async function fetchAssets(assetList: IAssetList[], context: Context): Promise<any>{
    Promise.all([
        fetch(`${assetList[0].href}`),
        fetch(`${assetList[1].href}`),
        fetch(`${assetList[2].href}`),
        fetch(`${assetList[3].href}`),
        fetch(`${assetList[4].href}`),
      ])
      .then(async([res1, res2, res3, res4, res5]) => {
        const a = await res1.blob();
        //const b = await res2.blob();
        //const c = await res3.blob();
        //const d = await res4.blob();
        //const e = await res5.blob();
      })
      .catch(error => {
        console.log(error);
      });

}*/

 /*
export async function fetchAssetsAndPin2(assetList: IAssetList[], context: Context){
    let obj = new Array(5)
    axios.all([
        axios.get(`${assetList[0].href}`, {responseType: 'blob'}), 
        axios.get(`${assetList[1].href}`, {responseType: 'blob'}),
        axios.get(`${assetList[2].href}`, {responseType: 'blob'}),
        axios.get(`${assetList[3].href}`, {responseType: 'blob'}),
        axios.get(`${assetList[4].href}`, {responseType: 'blob'})
      ])
      .then(axios.spread((obj1: any, obj2: any, obj3: any, obj4: any, obj5: any) => {
        console.log(obj1)
        console.log(obj2)
      })).catch(error => {
        console.log(error)
      });
}*/