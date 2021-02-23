import {
  SpatialAssetRegistered,
  ParentAdded,
  ChildrenAdded,
  ParentRemoved,
  ChildrenRemoved,
  SpatialAssetDeactivated,
} from "../generated/SpatialAssets/SpatialAssets";
import { GeoDID, Edge } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

import { addQm } from "./helpers";
export function handleSpatialAssetRegistered(
  event: SpatialAssetRegistered
): void {
  let hexHashId = addQm(event.params.geoDIDId) as Bytes;
  let base58HashId = "did:geo:" + hexHashId.toBase58(); // imported crypto function

  let geoDID = new GeoDID(base58HashId);

  geoDID.owner = event.params.to.toHexString();

  let hexHashCid = addQm(event.params.cid) as Bytes;
  let base58HashCid = hexHashCid.toBase58(); // imported crypto function

  geoDID.cid = base58HashCid;
  geoDID.storage = event.params.offChainStorage;

  let hexHashRoot = addQm(event.params.root) as Bytes;
  let base58HashRoot = "did:geo:" + hexHashRoot.toBase58(); // imported crypto function

  geoDID.root = base58HashRoot;

  geoDID.active = true;

  if (event.params.canBeParent) {
    geoDID.type = "Collection";
  } else {
    geoDID.type = "Item";
  }

  geoDID.save();
}

export function handleParentAdded(event: ParentAdded): void {
  let hexHashIdParent = addQm(event.params.parentGeoDIDId) as Bytes;
  let base58HashParent = "did:geo:" + hexHashIdParent.toBase58(); // imported crypto function
  let hexHashChild = addQm(event.params.geoDIDId) as Bytes;
  let base58HashChild = "did:geo:" + hexHashChild.toBase58(); // imported crypto function

  let edge = new Edge(base58HashParent + "-" + base58HashChild);

  edge.self = base58HashParent;
  edge.childGeoDID = base58HashChild;
  edge.active = true;

  edge.save();

  let geoDID = GeoDID.load(base58HashChild);
  let parentGeoDID = GeoDID.load(base58HashParent);

  geoDID.parent = base58HashParent;
  geoDID.root = parentGeoDID.root;

  geoDID.save();
}

export function handleChildrenAdded(event: ChildrenAdded): void {
  let hexHashIdParent = addQm(event.params.geoDIDId) as Bytes;
  let base58HashParent = "did:geo:" + hexHashIdParent.toBase58(); // imported crypto function
  let hexHashChild = addQm(event.params.childrenGeoDIDId) as Bytes;
  let base58HashChild = "did:geo:" + hexHashChild.toBase58(); // imported crypto function

  let edge = new Edge(base58HashParent + "-" + base58HashChild);

  edge.self = base58HashParent;
  edge.childGeoDID = base58HashChild;
  edge.active = true;

  edge.save();

  let geoDID = GeoDID.load(base58HashChild);
  let parentGeoDID = GeoDID.load(base58HashParent);

  geoDID.parent = base58HashParent;
  geoDID.root = parentGeoDID.root;

  geoDID.save();
}

export function handleParentRemoved(event: ParentRemoved): void {
  let hexHashIdParent = addQm(event.params.parentGeoDIDId) as Bytes;
  let base58HashParent = "did:geo:" + hexHashIdParent.toBase58(); // imported crypto function
  let hexHashChild = addQm(event.params.geoDIDId) as Bytes;
  let base58HashChild = "did:geo:" + hexHashChild.toBase58(); // imported crypto function

  let edge = Edge.load(base58HashParent + "-" + base58HashChild);

  edge.self = "";
  edge.childGeoDID = "";
  edge.active = false;

  edge.save();

  let geoDID = GeoDID.load(base58HashChild);

  geoDID.parent = "";

  geoDID.root = "";

  geoDID.save();
}

export function handleChildrenRemoved(event: ChildrenRemoved): void {
  let hexHashIdParent = addQm(event.params.geoDIDId) as Bytes;
  let base58HashParent = "did:geo:" + hexHashIdParent.toBase58(); // imported crypto function
  let hexHashChild = addQm(event.params.childrenGeoDIDId) as Bytes;
  let base58HashChild = "did:geo:" + hexHashChild.toBase58(); // imported crypto function

  let edge = Edge.load(base58HashParent + "-" + base58HashChild);

  edge.self = "";
  edge.childGeoDID = "";
  edge.active = false;

  edge.save();

  let geoDID = GeoDID.load(base58HashChild);

  geoDID.parent = "";

  geoDID.root = geoDID.id;

  geoDID.save();
}

export function handleSpatialAssetDeactivated(
  event: SpatialAssetDeactivated
): void {
  let hexHashId = addQm(event.params.geoDIDId) as Bytes;
  let base58Hash = "did:geo:" + hexHashId.toBase58(); // imported crypto function

  let geoDID = GeoDID.load(base58Hash);
  let edgeToParent = Edge.load(geoDID.parent + "-" + base58Hash);

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
    let hexHashIdChildren = addQm(childrenToRemove[i]) as Bytes;
    let base58HashChildren = "did:geo:" + hexHashIdChildren.toBase58(); // imported crypto function

    let edgeToChildren = Edge.load(base58Hash + "-" + base58HashChildren);

    edgeToChildren.self = "";
    edgeToChildren.active = false;
    edgeToChildren.save();

    let child = GeoDID.load(base58HashChildren);

    child.parent = "";

    child.root = child.id;

    child.save();
  }
}
