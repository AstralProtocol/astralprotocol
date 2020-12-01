import {
  SpatialAssetRegistered,
  SpatialAssetDeactivated,
} from "../generated/SpatialAssets/SpatialAssets";
import { SpatialAsset } from "../generated/schema";

export function handleSpatialAssetRegistered(
  event: SpatialAssetRegistered
): void {
  let spatialAsset = new SpatialAsset(event.params.id.toString());
  let to = event.params.to.toHexString();

  spatialAsset.owner = to;
  spatialAsset.storage = event.params.offChainStorage.toHex();

  spatialAsset.save();
}

export function handleSpatialAssetDeactivated(
  event: SpatialAssetDeactivated
): void {
  let spatialAsset = SpatialAsset.load(event.params.id.toString());
  spatialAsset.owner = "";
  spatialAsset.storage = "";

  spatialAsset.save();
}
