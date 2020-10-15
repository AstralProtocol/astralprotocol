import { Powergate } from "../pinning/powergate";
import { IStacItemMetadata, IGeometry, IProperties, IServiceEndpoint, IAssetList } from "../geo-did-utils/geo-did-spec";
export declare class Transformer {
    private powergate;
    private stacjsonObj;
    private token;
    private geoDIDid;
    private stacID;
    stacItemMetadata: IStacItemMetadata;
    geometry: IGeometry;
    properties: IProperties;
    private assets;
    services: IServiceEndpoint[];
    assetList: IAssetList[];
    constructor(jsonObj: Object, powergate: Powergate);
    createAssetList(): Promise<void>;
    getAssetList(): Promise<IAssetList[]>;
    getGeoDIDid(_ethereumAddress: string): Promise<string>;
    setGeometry(): Promise<void>;
    getGeometry(): Promise<IGeometry>;
    setProperties(): Promise<void>;
    getProperties(): Promise<IProperties>;
    setService(index: number): Promise<void>;
    getServices(): Promise<IServiceEndpoint[]>;
    setStacItemMetadata(): Promise<void>;
    getStacItemMetadata(): Promise<IStacItemMetadata>;
    getGeoDidId(): Promise<string>;
    assetToService(): Promise<void>;
}
