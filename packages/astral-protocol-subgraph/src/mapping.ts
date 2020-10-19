import { TransferSingle } from "../generated/SpatialAssets/SpatialAssets";
import { SpatialAsset } from "../generated/schema";

export function handleTransferSingle(event: TransferSingle): void {
  let spatialAsset = new SpatialAsset(event.params.id.toString());
  let from = event.params.from.toHexString();
  let to = event.params.to.toHexString();
  const address0 = "0x0000000000000000000000000000000000000000";

  spatialAsset.active = true;
  spatialAsset.owner = to;

  if (from != address0 && to == address0) {
    spatialAsset.active = false;
  }

  spatialAsset.save();
}
