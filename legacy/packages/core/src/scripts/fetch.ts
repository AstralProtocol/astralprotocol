import fetch from 'cross-fetch';

// will be used to fetch the catalogs and items
export async function fetchJson(url: string, payload?: any): Promise<any> {
    let opts;
    if (payload) {
        opts = {
            method: 'post',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
        };
    }
    const res = await (await fetch(url, opts)).json();
    if (res.error) throw new Error(res.error);
    return res;
}

