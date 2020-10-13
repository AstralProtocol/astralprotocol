"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoDID = void 0;
const graph_ts_1 = require("@graphprotocol/graph-ts");
class GeoDID extends graph_ts_1.Entity {
    constructor(id) {
        super();
        this.set("id", graph_ts_1.Value.fromString(id));
    }
    save() {
        let id = this.get("id");
        assert(id !== null, "Cannot save GeoDID entity without an ID");
        assert(id.kind == graph_ts_1.ValueKind.STRING, "Cannot save GeoDID entity with non-string ID. " +
            'Considering using .toHex() to convert the "id" to a string.');
        graph_ts_1.store.set("GeoDID", id.toString(), this);
    }
    static load(id) {
        return graph_ts_1.store.get("GeoDID", id);
    }
    get id() {
        let value = this.get("id");
        return value.toString();
    }
    set id(value) {
        this.set("id", graph_ts_1.Value.fromString(value));
    }
    get owner() {
        let value = this.get("owner");
        return value.toString();
    }
    set owner(value) {
        this.set("owner", graph_ts_1.Value.fromString(value));
    }
    get cid() {
        let value = this.get("cid");
        return value.toString();
    }
    set cid(value) {
        this.set("cid", graph_ts_1.Value.fromString(value));
    }
    get exists() {
        let value = this.get("exists");
        return value.toBoolean();
    }
    set exists(value) {
        this.set("exists", graph_ts_1.Value.fromBoolean(value));
    }
}
exports.GeoDID = GeoDID;
//# sourceMappingURL=schema.js.map