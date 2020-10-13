"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeregisterCall__Outputs = exports.DeregisterCall__Inputs = exports.DeregisterCall = exports.UpdateCall__Outputs = exports.UpdateCall__Inputs = exports.UpdateCall = exports.RegisterCall__Outputs = exports.RegisterCall__Inputs = exports.RegisterCall = exports.TransferOwnershipCall__Outputs = exports.TransferOwnershipCall__Inputs = exports.TransferOwnershipCall = exports.RenounceOwnershipCall__Outputs = exports.RenounceOwnershipCall__Inputs = exports.RenounceOwnershipCall = exports.ConstructorCall__Outputs = exports.ConstructorCall__Inputs = exports.ConstructorCall = exports.SpatialAssetRegistrar = exports.UpdateGeoDID__Params = exports.UpdateGeoDID = exports.OwnershipTransferred__Params = exports.OwnershipTransferred = exports.DeleteGeoDID__Params = exports.DeleteGeoDID = exports.CreateGeoDID__Params = exports.CreateGeoDID = void 0;
const graph_ts_1 = require("@graphprotocol/graph-ts");
class CreateGeoDID extends graph_ts_1.ethereum.Event {
    get params() {
        return new CreateGeoDID__Params(this);
    }
}
exports.CreateGeoDID = CreateGeoDID;
class CreateGeoDID__Params {
    constructor(event) {
        this._event = event;
    }
    get caller() {
        return this._event.parameters[0].value.toAddress();
    }
    get hash() {
        return this._event.parameters[1].value.toBytes();
    }
    get cid() {
        return this._event.parameters[2].value.toString();
    }
}
exports.CreateGeoDID__Params = CreateGeoDID__Params;
class DeleteGeoDID extends graph_ts_1.ethereum.Event {
    get params() {
        return new DeleteGeoDID__Params(this);
    }
}
exports.DeleteGeoDID = DeleteGeoDID;
class DeleteGeoDID__Params {
    constructor(event) {
        this._event = event;
    }
    get hash() {
        return this._event.parameters[0].value.toBytes();
    }
}
exports.DeleteGeoDID__Params = DeleteGeoDID__Params;
class OwnershipTransferred extends graph_ts_1.ethereum.Event {
    get params() {
        return new OwnershipTransferred__Params(this);
    }
}
exports.OwnershipTransferred = OwnershipTransferred;
class OwnershipTransferred__Params {
    constructor(event) {
        this._event = event;
    }
    get previousOwner() {
        return this._event.parameters[0].value.toAddress();
    }
    get newOwner() {
        return this._event.parameters[1].value.toAddress();
    }
}
exports.OwnershipTransferred__Params = OwnershipTransferred__Params;
class UpdateGeoDID extends graph_ts_1.ethereum.Event {
    get params() {
        return new UpdateGeoDID__Params(this);
    }
}
exports.UpdateGeoDID = UpdateGeoDID;
class UpdateGeoDID__Params {
    constructor(event) {
        this._event = event;
    }
    get caller() {
        return this._event.parameters[0].value.toAddress();
    }
    get hash() {
        return this._event.parameters[1].value.toBytes();
    }
    get cid() {
        return this._event.parameters[2].value.toString();
    }
}
exports.UpdateGeoDID__Params = UpdateGeoDID__Params;
class SpatialAssetRegistrar extends graph_ts_1.ethereum.SmartContract {
    static bind(address) {
        return new SpatialAssetRegistrar("SpatialAssetRegistrar", address);
    }
    owner() {
        let result = super.call("owner", "owner():(address)", []);
        return result[0].toAddress();
    }
    try_owner() {
        let result = super.tryCall("owner", "owner():(address)", []);
        if (result.reverted) {
            return new graph_ts_1.ethereum.CallResult();
        }
        let value = result.value;
        return graph_ts_1.ethereum.CallResult.fromValue(value[0].toAddress());
    }
    geoDIDResolver(_addr, _hash) {
        let result = super.call("geoDIDResolver", "geoDIDResolver(address,bytes32):(string)", [graph_ts_1.ethereum.Value.fromAddress(_addr), graph_ts_1.ethereum.Value.fromFixedBytes(_hash)]);
        return result[0].toString();
    }
    try_geoDIDResolver(_addr, _hash) {
        let result = super.tryCall("geoDIDResolver", "geoDIDResolver(address,bytes32):(string)", [graph_ts_1.ethereum.Value.fromAddress(_addr), graph_ts_1.ethereum.Value.fromFixedBytes(_hash)]);
        if (result.reverted) {
            return new graph_ts_1.ethereum.CallResult();
        }
        let value = result.value;
        return graph_ts_1.ethereum.CallResult.fromValue(value[0].toString());
    }
    checkExistence(_hash) {
        let result = super.call("checkExistence", "checkExistence(bytes32):(bool)", [graph_ts_1.ethereum.Value.fromFixedBytes(_hash)]);
        return result[0].toBoolean();
    }
    try_checkExistence(_hash) {
        let result = super.tryCall("checkExistence", "checkExistence(bytes32):(bool)", [graph_ts_1.ethereum.Value.fromFixedBytes(_hash)]);
        if (result.reverted) {
            return new graph_ts_1.ethereum.CallResult();
        }
        let value = result.value;
        return graph_ts_1.ethereum.CallResult.fromValue(value[0].toBoolean());
    }
}
exports.SpatialAssetRegistrar = SpatialAssetRegistrar;
class ConstructorCall extends graph_ts_1.ethereum.Call {
    get inputs() {
        return new ConstructorCall__Inputs(this);
    }
    get outputs() {
        return new ConstructorCall__Outputs(this);
    }
}
exports.ConstructorCall = ConstructorCall;
class ConstructorCall__Inputs {
    constructor(call) {
        this._call = call;
    }
}
exports.ConstructorCall__Inputs = ConstructorCall__Inputs;
class ConstructorCall__Outputs {
    constructor(call) {
        this._call = call;
    }
}
exports.ConstructorCall__Outputs = ConstructorCall__Outputs;
class RenounceOwnershipCall extends graph_ts_1.ethereum.Call {
    get inputs() {
        return new RenounceOwnershipCall__Inputs(this);
    }
    get outputs() {
        return new RenounceOwnershipCall__Outputs(this);
    }
}
exports.RenounceOwnershipCall = RenounceOwnershipCall;
class RenounceOwnershipCall__Inputs {
    constructor(call) {
        this._call = call;
    }
}
exports.RenounceOwnershipCall__Inputs = RenounceOwnershipCall__Inputs;
class RenounceOwnershipCall__Outputs {
    constructor(call) {
        this._call = call;
    }
}
exports.RenounceOwnershipCall__Outputs = RenounceOwnershipCall__Outputs;
class TransferOwnershipCall extends graph_ts_1.ethereum.Call {
    get inputs() {
        return new TransferOwnershipCall__Inputs(this);
    }
    get outputs() {
        return new TransferOwnershipCall__Outputs(this);
    }
}
exports.TransferOwnershipCall = TransferOwnershipCall;
class TransferOwnershipCall__Inputs {
    constructor(call) {
        this._call = call;
    }
    get newOwner() {
        return this._call.inputValues[0].value.toAddress();
    }
}
exports.TransferOwnershipCall__Inputs = TransferOwnershipCall__Inputs;
class TransferOwnershipCall__Outputs {
    constructor(call) {
        this._call = call;
    }
}
exports.TransferOwnershipCall__Outputs = TransferOwnershipCall__Outputs;
class RegisterCall extends graph_ts_1.ethereum.Call {
    get inputs() {
        return new RegisterCall__Inputs(this);
    }
    get outputs() {
        return new RegisterCall__Outputs(this);
    }
}
exports.RegisterCall = RegisterCall;
class RegisterCall__Inputs {
    constructor(call) {
        this._call = call;
    }
    get _hash() {
        return this._call.inputValues[0].value.toBytes();
    }
    get _cid() {
        return this._call.inputValues[1].value.toString();
    }
}
exports.RegisterCall__Inputs = RegisterCall__Inputs;
class RegisterCall__Outputs {
    constructor(call) {
        this._call = call;
    }
}
exports.RegisterCall__Outputs = RegisterCall__Outputs;
class UpdateCall extends graph_ts_1.ethereum.Call {
    get inputs() {
        return new UpdateCall__Inputs(this);
    }
    get outputs() {
        return new UpdateCall__Outputs(this);
    }
}
exports.UpdateCall = UpdateCall;
class UpdateCall__Inputs {
    constructor(call) {
        this._call = call;
    }
    get _hash() {
        return this._call.inputValues[0].value.toBytes();
    }
    get _cid() {
        return this._call.inputValues[1].value.toString();
    }
}
exports.UpdateCall__Inputs = UpdateCall__Inputs;
class UpdateCall__Outputs {
    constructor(call) {
        this._call = call;
    }
}
exports.UpdateCall__Outputs = UpdateCall__Outputs;
class DeregisterCall extends graph_ts_1.ethereum.Call {
    get inputs() {
        return new DeregisterCall__Inputs(this);
    }
    get outputs() {
        return new DeregisterCall__Outputs(this);
    }
}
exports.DeregisterCall = DeregisterCall;
class DeregisterCall__Inputs {
    constructor(call) {
        this._call = call;
    }
    get _hash() {
        return this._call.inputValues[0].value.toBytes();
    }
}
exports.DeregisterCall__Inputs = DeregisterCall__Inputs;
class DeregisterCall__Outputs {
    constructor(call) {
        this._call = call;
    }
}
exports.DeregisterCall__Outputs = DeregisterCall__Outputs;
//# sourceMappingURL=SpatialAssetRegistrar.js.map