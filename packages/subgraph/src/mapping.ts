import {
  SpatialAssetRegistered,
  ParentAdded,
  ChildrenAdded,
} from "../generated/SpatialAssets/SpatialAssets";
import { SpatialAsset, Node } from "../generated/schema";

export function handleSpatialAssetRegistered(
  event: SpatialAssetRegistered
): void {
  let node = new Node(event.params.geoDIDId.toString());
  let spatialAsset = new SpatialAsset(event.params.cid.toString());
  let to = event.params.to.toHexString();

  node.owner = to;
  node.spatialAsset = event.params.cid.toString();
  node.save();

  spatialAsset.storage = event.params.offChainStorage;

  spatialAsset.save();
}

export function handleParentAdded(event: ParentAdded): void {
  let spatialAsset = SpatialAsset.load(event.params.cid.toString());

  let parents = spatialAsset.parents;
  parents.push(event.params.parentGeoDIDId.toString());
  spatialAsset.parents = parents;
  spatialAsset.save();
}

export function handleChildrenAdded(event: ChildrenAdded): void {
  let spatialAsset = SpatialAsset.load(event.params.cid.toString());
  let childrenNode = Node.load(event.params.childrenGeoDIDId.toString());
  spatialAsset.children.push(childrenNode.id);
  spatialAsset.save();
}

/*
export function handleSpatialAssetDeactivated(
  event: SpatialAssetDeactivated
): void {
  let spatialAsset = SpatialAsset.load(event.params.id.toString());
  spatialAsset.owner = "";
  spatialAsset.storage = 0x0;

  spatialAsset.save();
}
*/
