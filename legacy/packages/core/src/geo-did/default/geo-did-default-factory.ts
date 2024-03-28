import { IAbstractGeoDIDFactory } from '../interfaces/factory-interfaces';

export class ConcreteDefaultFactory implements IAbstractGeoDIDFactory{
    // Creates the Document
    public async createGeoDIDDocument<T>(document: {new (): T}): Promise<T>{
        return new document();
    }

}