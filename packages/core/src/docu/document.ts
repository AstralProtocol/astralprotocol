import { GeoDID, IAbstractGeoDIDDocument } from '../geo-did/interfaces/factory-interfaces';
import { ConcreteDefaultFactory } from '../geo-did/default/geo-did-default-factory';
import { ConcreteDefaultGeoDIDCollection } from '../geo-did/default/geo-did-default-collection';
import { ConcreteDefaultGeoDIDItem } from '../geo-did/default/geo-did-default-item';
import { Powergate } from '../pin/powergate';
import { IDocumentInfo, IAsset } from '../geo-did/interfaces/global-geo-did-interfaces';

export class Document {
   
    constructor(public _ethereumAddress: string){}

    // Pin on Powergate 
    async addGenesisDocument(_typeOfGeoDID: string, assets?: IAsset[]): Promise<IDocumentInfo> {
        
        let document: ConcreteDefaultGeoDIDCollection | ConcreteDefaultGeoDIDItem;
        const factory = new ConcreteDefaultFactory();
        
        try{
            if(_typeOfGeoDID.toLowerCase() == 'collection'){
                document = await factory.createGeoDIDDocument(ConcreteDefaultGeoDIDCollection);
                await document.prepRootGeoDID(this._ethereumAddress);
            }
            else if(_typeOfGeoDID.toLowerCase() == 'item'){
                document = await factory.createGeoDIDDocument(ConcreteDefaultGeoDIDItem);
                await document.prepRootGeoDID(this._ethereumAddress, assets);
            }
            else throw new Error('Invalid Option, please select Item or Collection');

            const geodidid: string = document.getGeoDIDid();
            const documentVal = JSON.parse(document.getDidDocument());

            return {
                geodidid: geodidid,
                documentVal: documentVal,
            }
        }
        catch(e){
            console.log(e);
            throw e;
        }
    }
    
    // Pin on Powergate 
    async addChildDocument(_typeOfGeoDID: string, _parentID: string, _path: string, assets?: IAsset[]): Promise<IDocumentInfo> {

        let document: ConcreteDefaultGeoDIDCollection | ConcreteDefaultGeoDIDItem;
        const factory: ConcreteDefaultFactory = new ConcreteDefaultFactory();

        try{
            if(_typeOfGeoDID.toLowerCase() == 'collection'){
                document = await factory.createGeoDIDDocument(ConcreteDefaultGeoDIDCollection);
                await document.prepChildGeoDID(this._ethereumAddress, _parentID, _path);
            }
            else if(_typeOfGeoDID.toLowerCase() == 'item'){
                document = await factory.createGeoDIDDocument(ConcreteDefaultGeoDIDItem);
                await document.prepChildGeoDID(this._ethereumAddress, _parentID, _path);
            }
            else throw new Error('Invalid Option, please select Item or Collection');

            const geodidid: string = document.getGeoDIDid();
            const documentVal = JSON.parse(document.getDidDocument());

            return {
                geodidid: geodidid,
                documentVal: documentVal,
                parentid: _parentID
            } 
        }
        catch(e){
            console.log(e);
            throw e;
        } 
    }
}