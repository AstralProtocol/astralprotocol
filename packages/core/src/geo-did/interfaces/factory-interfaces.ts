import { ConcreteDefaultGeoDIDCollection } from '../default/geo-did-default-collection';
import { ConcreteDefaultGeoDIDItem } from '../default/geo-did-default-item';
import { ConcreteDefaultGeoDIDDocument } from '../default/geo-did-default-document';
import { IAsset } from './global-geo-did-interfaces'

export interface IAbstractGeoDIDFactory {
    createGeoDIDDocument<T>(c: {new (): T}): Promise<T>;
}

// Acts as a Node 
export interface IAbstractGeoDIDDocument {
    label: string;
    geoDIDid: string;
    prepRootGeoDID(_ethAddress: string, _host: string, _token: string, _assets?: IAsset[]): void;
    prepChildGeoDID(_ethAddress: string, _parentid: string, _path: string, _host: string, _token: string, _assets?: IAsset[]): void;
    getGeoDIDid(): string;
    getDidDocument(): string;
}

export type GeoDID = ConcreteDefaultGeoDIDDocument | ConcreteDefaultGeoDIDCollection | ConcreteDefaultGeoDIDItem;
