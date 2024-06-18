"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const geotiff_1 = require("geotiff");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
function run(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield cross_fetch_1.default(url);
            const arrayBuffer = yield response.arrayBuffer();
            const tiff = yield geotiff_1.fromArrayBuffer(arrayBuffer);
            console.log(tiff);
            const image = yield tiff.getImage();
            console.log(image);
            const width = image.getWidth();
            const height = image.getHeight();
            console.log("Width " + width);
            console.log("Height " + height);
            const tileWidth = image.getTileWidth();
            const tileHeight = image.getTileHeight();
            console.log("Tile Width " + tileWidth);
            console.log("Tile Height " + tileHeight);
        }
        catch (e) {
            console.log(e);
        }
    });
}
run('http://download.osgeo.org/geotiff/samples/gdal_eg/cea.tif');
//# sourceMappingURL=index.js.map