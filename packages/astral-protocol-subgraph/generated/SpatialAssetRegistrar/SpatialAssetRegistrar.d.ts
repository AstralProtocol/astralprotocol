import { ethereum, Bytes, Address } from "@graphprotocol/graph-ts";
export declare class CreateGeoDID extends ethereum.Event {
    get params(): CreateGeoDID__Params;
}
export declare class CreateGeoDID__Params {
    _event: CreateGeoDID;
    constructor(event: CreateGeoDID);
    get caller(): Address;
    get hash(): Bytes;
    get cid(): string;
}
export declare class DeleteGeoDID extends ethereum.Event {
    get params(): DeleteGeoDID__Params;
}
export declare class DeleteGeoDID__Params {
    _event: DeleteGeoDID;
    constructor(event: DeleteGeoDID);
    get hash(): Bytes;
}
export declare class OwnershipTransferred extends ethereum.Event {
    get params(): OwnershipTransferred__Params;
}
export declare class OwnershipTransferred__Params {
    _event: OwnershipTransferred;
    constructor(event: OwnershipTransferred);
    get previousOwner(): Address;
    get newOwner(): Address;
}
export declare class UpdateGeoDID extends ethereum.Event {
    get params(): UpdateGeoDID__Params;
}
export declare class UpdateGeoDID__Params {
    _event: UpdateGeoDID;
    constructor(event: UpdateGeoDID);
    get caller(): Address;
    get hash(): Bytes;
    get cid(): string;
}
export declare class SpatialAssetRegistrar extends ethereum.SmartContract {
    static bind(address: Address): SpatialAssetRegistrar;
    owner(): Address;
    try_owner(): ethereum.CallResult<Address>;
    geoDIDResolver(_addr: Address, _hash: Bytes): string;
    try_geoDIDResolver(_addr: Address, _hash: Bytes): ethereum.CallResult<string>;
    checkExistence(_hash: Bytes): boolean;
    try_checkExistence(_hash: Bytes): ethereum.CallResult<boolean>;
}
export declare class ConstructorCall extends ethereum.Call {
    get inputs(): ConstructorCall__Inputs;
    get outputs(): ConstructorCall__Outputs;
}
export declare class ConstructorCall__Inputs {
    _call: ConstructorCall;
    constructor(call: ConstructorCall);
}
export declare class ConstructorCall__Outputs {
    _call: ConstructorCall;
    constructor(call: ConstructorCall);
}
export declare class RenounceOwnershipCall extends ethereum.Call {
    get inputs(): RenounceOwnershipCall__Inputs;
    get outputs(): RenounceOwnershipCall__Outputs;
}
export declare class RenounceOwnershipCall__Inputs {
    _call: RenounceOwnershipCall;
    constructor(call: RenounceOwnershipCall);
}
export declare class RenounceOwnershipCall__Outputs {
    _call: RenounceOwnershipCall;
    constructor(call: RenounceOwnershipCall);
}
export declare class TransferOwnershipCall extends ethereum.Call {
    get inputs(): TransferOwnershipCall__Inputs;
    get outputs(): TransferOwnershipCall__Outputs;
}
export declare class TransferOwnershipCall__Inputs {
    _call: TransferOwnershipCall;
    constructor(call: TransferOwnershipCall);
    get newOwner(): Address;
}
export declare class TransferOwnershipCall__Outputs {
    _call: TransferOwnershipCall;
    constructor(call: TransferOwnershipCall);
}
export declare class RegisterCall extends ethereum.Call {
    get inputs(): RegisterCall__Inputs;
    get outputs(): RegisterCall__Outputs;
}
export declare class RegisterCall__Inputs {
    _call: RegisterCall;
    constructor(call: RegisterCall);
    get _hash(): Bytes;
    get _cid(): string;
}
export declare class RegisterCall__Outputs {
    _call: RegisterCall;
    constructor(call: RegisterCall);
}
export declare class UpdateCall extends ethereum.Call {
    get inputs(): UpdateCall__Inputs;
    get outputs(): UpdateCall__Outputs;
}
export declare class UpdateCall__Inputs {
    _call: UpdateCall;
    constructor(call: UpdateCall);
    get _hash(): Bytes;
    get _cid(): string;
}
export declare class UpdateCall__Outputs {
    _call: UpdateCall;
    constructor(call: UpdateCall);
}
export declare class DeregisterCall extends ethereum.Call {
    get inputs(): DeregisterCall__Inputs;
    get outputs(): DeregisterCall__Outputs;
}
export declare class DeregisterCall__Inputs {
    _call: DeregisterCall;
    constructor(call: DeregisterCall);
    get _hash(): Bytes;
}
export declare class DeregisterCall__Outputs {
    _call: DeregisterCall;
    constructor(call: DeregisterCall);
}
