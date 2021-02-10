// 1. Get the data and parse it 
// 2. 

import GeoTIFF, { fromUrl, fromFile, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import fetch from 'cross-fetch';

// To read a whole image into one big array of arrays the following method call can be used:
// const data = await image.readRasters();

/**
 * 
 */
async function run(url: string){
    try{
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const tiff = await fromArrayBuffer(arrayBuffer);
        console.log(tiff);
        const image = await tiff.getImage();
        console.log(image);
        const width = image.getWidth();
        const height = image.getHeight();
        console.log("Width " + width);
        console.log("Height " + height);

        const tileWidth = image.getTileWidth();
        const tileHeight = image.getTileHeight();
        console.log("Tile Width " + tileWidth) //514
        console.log("Tile Height " + tileHeight) //15


    }catch(e){
        console.log(e);
    }
}

//run('http://download.osgeo.org/geotiff/samples/gdal_eg/cea.tif');
//run('https://storage.googleapis.com/pdd-stac/disasters/hurricane-harvey/0831/SkySat_Freeport_s03_20170831T162740Z.tif');