import {
  CreateGeoDID,
  UpdateGeoDID,
  DeleteGeoDID
} from "./generated/SpatialAssetRegistrar/SpatialAssetRegistrar";
import {
  GeoDID
} from "./generated/schema";

//----------------- SpatialAssetRegistrar Event Handlers ------------------

export function handleCreateGeoDID(event: CreateGeoDID): void {
  let geoDID = new GeoDID(event.params.hash.toString());

  geoDID.owner = event.params.caller.toHexString();
  geoDID.cid = event.params.cid;
  geoDID.exists = true;

  geoDID.save(); 
}

export function handleUpdateGeoDID(event: UpdateGeoDID): void {
  let geoDid = GeoDID.load(event.params.hash.toString());

  geoDid.cid = event.params.cid;

  geoDid.save();
}

export function handleDeleteGeoDID(event: DeleteGeoDID): void {
  let geoDid = GeoDID.load(event.params.hash.toString());

  geoDid.exists = false;

  geoDid.save();
}