import {
  SpatialAssetRegistered,
  ParentAdded,
  ChildrenAdded,
  ParentRemoved,
  ChildrenRemoved,
  SpatialAssetDeactivated,
} from "../generated/SpatialAssets/SpatialAssets";
import { GeoDID, Edge } from "../generated/schema";

export function handleSpatialAssetRegistered(
  event: SpatialAssetRegistered
): void {
  let geoDID = new GeoDID(event.params.geoDIDId.toString());

  geoDID.owner = event.params.to.toHexString();
  geoDID.cid = event.params.cid.toString();
  geoDID.storage = event.params.offChainStorage;
  geoDID.root = event.params.root.toString();
  geoDID.active = true;

  if (event.params.canBeParent) {
    geoDID.type = "Collection";
  } else {
    geoDID.type = "Item";
  }

  geoDID.save();
}

export function handleParentAdded(event: ParentAdded): void {
  let edge = new Edge(
    event.params.parentGeoDIDId.toString() +
      "-" +
      event.params.geoDIDId.toString()
  );

  edge.self = event.params.parentGeoDIDId.toString();
  edge.childGeoDID = event.params.geoDIDId.toString();
  edge.active = true;

  edge.save();

  let geoDID = GeoDID.load(event.params.geoDIDId.toString());
  let parentGeoDID = GeoDID.load(event.params.parentGeoDIDId.toString());

  geoDID.parent = event.params.parentGeoDIDId.toString();
  geoDID.root = parentGeoDID.root;

  geoDID.save();
}

export function handleChildrenAdded(event: ChildrenAdded): void {
  let edge = new Edge(
    event.params.geoDIDId.toString() +
      "-" +
      event.params.childrenGeoDIDId.toString()
  );

  edge.self = event.params.geoDIDId.toString();
  edge.childGeoDID = event.params.childrenGeoDIDId.toString();
  edge.active = true;

  edge.save();

  let geoDID = GeoDID.load(event.params.childrenGeoDIDId.toString());
  let parentGeoDID = GeoDID.load(event.params.geoDIDId.toString());

  geoDID.parent = event.params.geoDIDId.toString();
  geoDID.root = parentGeoDID.root;

  geoDID.save();
}

export function handleParentRemoved(event: ParentRemoved): void {
  let edge = Edge.load(
    event.params.parentGeoDIDId.toString() +
      "-" +
      event.params.geoDIDId.toString()
  );

  edge.self = "";
  edge.childGeoDID = "";
  edge.active = false;

  edge.save();

  let geoDID = GeoDID.load(event.params.geoDIDId.toString());

  geoDID.parent = "";

  geoDID.root = "";

  geoDID.save();
}

export function handleChildrenRemoved(event: ChildrenRemoved): void {
  let edge = Edge.load(
    event.params.geoDIDId.toString() +
      "-" +
      event.params.childrenGeoDIDId.toString()
  );

  edge.self = "";
  edge.childGeoDID = "";
  edge.active = false;

  edge.save();

  let geoDID = GeoDID.load(event.params.childrenGeoDIDId.toString());

  geoDID.parent = "";

  geoDID.root = geoDID.id.toString();

  geoDID.save();
}

export function handleSpatialAssetDeactivated(
  event: SpatialAssetDeactivated
): void {
  let geoDID = GeoDID.load(event.params.geoDIDId.toString());
  let edgeToParent = Edge.load(
    geoDID.parent + "-" + event.params.geoDIDId.toString()
  );

  edgeToParent.self = "";
  edgeToParent.active = false;
  edgeToParent.save();

  geoDID.owner = "";
  geoDID.root = "";
  geoDID.active = false;
  geoDID.parent = "";

  geoDID.save();

  let childrenToRemove = event.params.childrenToRemove;
  let childrenToRemoveLen = event.params.childrenToRemove.length;

  for (let i = 0; i < childrenToRemoveLen; i++) {
    let edgeToChildren = Edge.load(
      event.params.geoDIDId.toString() + "-" + childrenToRemove[i].toString()
    );

    edgeToChildren.self = "";
    edgeToChildren.active = false;
    edgeToChildren.save();

    let child = GeoDID.load(childrenToRemove[i].toString());

    child.parent = "";

    child.root = child.id.toString();

    child.save();
  }
}
