import { Entity } from "@graphprotocol/graph-ts";
export declare class GeoDID extends Entity {
    constructor(id: string);
    save(): void;
    static load(id: string): GeoDID | null;
    get id(): string;
    set id(value: string);
    get owner(): string;
    set owner(value: string);
    get cid(): string;
    set cid(value: string);
    get exists(): boolean;
    set exists(value: boolean);
}
