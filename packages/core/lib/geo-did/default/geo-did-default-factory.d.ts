import { IAbstractGeoDIDFactory } from '../interfaces/factory-interfaces';
export declare class ConcreteDefaultFactory implements IAbstractGeoDIDFactory {
    createGeoDIDDocument<T>(document: {
        new (): T;
    }): Promise<T>;
}
