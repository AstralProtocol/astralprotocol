"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteGeoDID = exports.handleUpdateGeoDID = exports.handleCreateGeoDID = void 0;
const schema_1 = require("../generated/schema");
function handleCreateGeoDID(event) {
    let geoDID = new schema_1.GeoDID(event.params.hash.toString());
    geoDID.owner = event.params.caller.toHexString();
    geoDID.cid = event.params.cid;
    geoDID.exists = true;
    geoDID.save();
}
exports.handleCreateGeoDID = handleCreateGeoDID;
function handleUpdateGeoDID(event) {
    let geoDid = schema_1.GeoDID.load(event.params.hash.toString());
    geoDid.cid = event.params.cid;
    geoDid.save();
}
exports.handleUpdateGeoDID = handleUpdateGeoDID;
function handleDeleteGeoDID(event) {
    let geoDid = schema_1.GeoDID.load(event.params.hash.toString());
    geoDid.exists = false;
    geoDid.save();
}
exports.handleDeleteGeoDID = handleDeleteGeoDID;
//# sourceMappingURL=mapping.js.map