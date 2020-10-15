'use strict';
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
            d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
var __metadata =
    (this && this.__metadata) ||
    function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.RootObject = exports.Assets = exports.Visual = exports.Udm = exports.AnalyticXml = exports.Analytic = exports.Thumbnail = exports.Link = exports.Properties = exports.Geometry = exports.AssetType = void 0;
const class_transformer_1 = require('class-transformer');
require('reflect-metadata');
class AssetType {}
exports.AssetType = AssetType;
class Geometry {}
exports.Geometry = Geometry;
class Properties {
    getDatetime() {
        return this.datetime;
    }
    getCreated() {
        return this.created;
    }
    getUpdated() {
        return this.updated;
    }
}
__decorate(
    [class_transformer_1.Type(() => Date), __metadata('design:type', Date)],
    Properties.prototype,
    'datetime',
    void 0,
);
__decorate(
    [class_transformer_1.Type(() => Date), __metadata('design:type', Date)],
    Properties.prototype,
    'created',
    void 0,
);
__decorate(
    [class_transformer_1.Type(() => Date), __metadata('design:type', Date)],
    Properties.prototype,
    'updated',
    void 0,
);
exports.Properties = Properties;
class Link {}
exports.Link = Link;
class Thumbnail extends AssetType {}
exports.Thumbnail = Thumbnail;
class Analytic extends AssetType {}
exports.Analytic = Analytic;
class AnalyticXml extends AssetType {}
exports.AnalyticXml = AnalyticXml;
class Udm extends AssetType {}
exports.Udm = Udm;
class Visual extends AssetType {}
exports.Visual = Visual;
class Assets {
    getThumbnail() {
        return this.thumbnail;
    }
    getAnalytic() {
        return this.analytic;
    }
    getAnalyticXml() {
        return this.analytic_xml;
    }
    getUdm() {
        return this.udm;
    }
    getVisual() {
        return this.visual;
    }
}
__decorate(
    [class_transformer_1.Type(() => Thumbnail), __metadata('design:type', Thumbnail)],
    Assets.prototype,
    'thumbnail',
    void 0,
);
__decorate(
    [class_transformer_1.Type(() => Analytic), __metadata('design:type', Analytic)],
    Assets.prototype,
    'analytic',
    void 0,
);
__decorate(
    [class_transformer_1.Type(() => AnalyticXml), __metadata('design:type', AnalyticXml)],
    Assets.prototype,
    'analytic_xml',
    void 0,
);
__decorate([class_transformer_1.Type(() => Udm), __metadata('design:type', Udm)], Assets.prototype, 'udm', void 0);
__decorate(
    [class_transformer_1.Type(() => Visual), __metadata('design:type', Visual)],
    Assets.prototype,
    'visual',
    void 0,
);
exports.Assets = Assets;
class RootObject {
    getStacVersion() {
        return this.stac_version;
    }
    getStacExtensions() {
        return this.stac_extensions;
    }
    getType() {
        return this.type;
    }
    getId() {
        return this.id;
    }
    getBbox() {
        return this.bbox;
    }
    getCollection() {
        return this.collection;
    }
    getGeometry() {
        return this.geometry;
    }
    getProperties() {
        return this.properties;
    }
    getLinks() {
        return this.links;
    }
    getAssets() {
        return this.assets;
    }
}
__decorate(
    [class_transformer_1.Type(() => Geometry), __metadata('design:type', Geometry)],
    RootObject.prototype,
    'geometry',
    void 0,
);
__decorate(
    [class_transformer_1.Type(() => Properties), __metadata('design:type', Properties)],
    RootObject.prototype,
    'properties',
    void 0,
);
__decorate(
    [class_transformer_1.Type(() => Link), __metadata('design:type', Array)],
    RootObject.prototype,
    'links',
    void 0,
);
__decorate(
    [class_transformer_1.Type(() => Assets), __metadata('design:type', Assets)],
    RootObject.prototype,
    'assets',
    void 0,
);
exports.RootObject = RootObject;
//# sourceMappingURL=stac-item-spec.js.map
