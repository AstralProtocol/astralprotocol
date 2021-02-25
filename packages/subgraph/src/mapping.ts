import {
  SpatialAssetRegistered,
  ParentAdded,
  ChildrenAdded,
  ParentRemoved,
  ChildrenRemoved,
  SpatialAssetDeactivated,
} from "../generated/SpatialAssets/SpatialAssets";
import { GeoDID, Edge } from "../generated/schema";
import { Bytes, log } from "@graphprotocol/graph-ts";

import { addQm } from "./helpers";

// this is a recursive function to change the root id in the children (and their children)
function changeRoot(edges: string[]): void {
  if (edges.length > 0) {
    edges.forEach((ed) => {
      let edge = Edge.load(ed);
      let child = GeoDID.load(edge.childGeoDID);

      child.isRoot = false;
      let parent = GeoDID.load(edge.parentGeoDID);

      child.root = parent.root;

      child.save();
      if (child.edges.length > 0) {
        changeRoot(child.edges);
      }
    });
  }
}

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

  if (hexHashId.toBase58() == hexHashRoot.toBase58()) {
    geoDID.isRoot = true;
  } else {
    geoDID.isRoot = false;
  }

  geoDID.active = true;

  if (event.params.canBeParent) {
    geoDID.type = "Collection";
  } else {
    geoDID.type = "Item";
  }

  geoDID.edges = [];
  geoDID.save();
}

export function handleParentAdded(event: ParentAdded): void {
  let hexHashIdParent = addQm(event.params.parentGeoDIDId) as Bytes;
  let base58HashParent = "did:geo:" + hexHashIdParent.toBase58(); // imported crypto function
  let hexHashChild = addQm(event.params.geoDIDId) as Bytes;
  let base58HashChild = "did:geo:" + hexHashChild.toBase58(); // imported crypto function

  let edge = new Edge(base58HashParent + "-" + base58HashChild);

  edge.parentGeoDID = base58HashParent;
  edge.childGeoDID = base58HashChild;
  edge.active = true;
  edge.save();

  // add edge to parent

  let parentGeoDID = GeoDID.load(base58HashParent);

  let edges = parentGeoDID.edges;

  edges.push(edge.id);

  parentGeoDID.edges = edges;

  parentGeoDID.save();

  let geoDID = GeoDID.load(base58HashChild);

  geoDID.parent = base58HashParent;
  geoDID.isRoot = false;
  geoDID.root = parentGeoDID.root;

  geoDID.save();

  // change root to root of parent
  if (Array.isArray(geoDID.edges)) {
    changeRoot(geoDID.edges);
  }
}

export function handleChildrenAdded(event: ChildrenAdded): void {
  let hexHashIdParent = addQm(event.params.geoDIDId) as Bytes;
  let base58HashParent = "did:geo:" + hexHashIdParent.toBase58(); // imported crypto function
  let hexHashChild = addQm(event.params.childrenGeoDIDId) as Bytes;
  let base58HashChild = "did:geo:" + hexHashChild.toBase58(); // imported crypto function

  let edge = new Edge(base58HashParent + "-" + base58HashChild);

  edge.parentGeoDID = base58HashParent;
  edge.childGeoDID = base58HashChild;
  edge.active = true;
  edge.save();

  // add edge to parent

  let parentGeoDID = GeoDID.load(base58HashParent);

  let edges = parentGeoDID.edges;

  edges.push(edge.id);

  parentGeoDID.edges = edges;

  parentGeoDID.save();

  let geoDID = GeoDID.load(base58HashChild);

  geoDID.parent = base58HashParent;
  geoDID.isRoot = false;
  geoDID.root = parentGeoDID.root;
  geoDID.save();

  // change root to root of parent
  if (Array.isArray(geoDID.edges)) {
    changeRoot(geoDID.edges);
  }
}

export function handleParentRemoved(event: ParentRemoved): void {
  let hexHashIdParent = addQm(event.params.parentGeoDIDId) as Bytes;
  let base58HashParent = "did:geo:" + hexHashIdParent.toBase58(); // imported crypto function
  let hexHashChild = addQm(event.params.geoDIDId) as Bytes;
  let base58HashChild = "did:geo:" + hexHashChild.toBase58(); // imported crypto function

  let edge = Edge.load(base58HashParent + "-" + base58HashChild);

  edge.active = false;

  edge.save();

  // remove edge from parent
  let parentGeoDID = GeoDID.load(base58HashParent);

  let originalEdges = parentGeoDID.edges;

  let changedEdges: Array<string>;

  for (let i = 0; i < originalEdges.length; i++) {
    let ed = Edge.load(originalEdges[i]);
    if (ed.id != edge.id) {
      changedEdges.push(originalEdges[i]);
    }
  }

  parentGeoDID.edges = changedEdges;

  parentGeoDID.save();

  let geoDID = GeoDID.load(base58HashChild);

  geoDID.parent = null;

  geoDID.root = geoDID.id;
  geoDID.isRoot = true;
  geoDID.save();

  // change root from children to itself
  if (Array.isArray(geoDID.edges)) {
    changeRoot(geoDID.edges);
  }
}

export function handleChildrenRemoved(event: ChildrenRemoved): void {
  let hexHashIdParent = addQm(event.params.geoDIDId) as Bytes;
  let base58HashParent = "did:geo:" + hexHashIdParent.toBase58(); // imported crypto function
  let hexHashChild = addQm(event.params.childrenGeoDIDId) as Bytes;
  let base58HashChild = "did:geo:" + hexHashChild.toBase58(); // imported crypto function

  let edge = Edge.load(base58HashParent + "-" + base58HashChild);

  edge.active = false;

  edge.save();

  // remove edge from parent
  let parentGeoDID = GeoDID.load(base58HashParent);

  let originalEdges = parentGeoDID.edges;

  let changedEdges: Array<string>;

  for (let i = 0; i < originalEdges.length; i++) {
    let ed = Edge.load(originalEdges[i]);
    if (ed.id != edge.id) {
      changedEdges.push(originalEdges[i]);
    }
  }

  parentGeoDID.edges = changedEdges;

  parentGeoDID.save();

  let geoDID = GeoDID.load(base58HashChild);

  geoDID.parent = null;
  geoDID.root = geoDID.id;
  geoDID.isRoot = true;
  geoDID.save();

  if (Array.isArray(geoDID.edges)) {
    changeRoot(geoDID.edges);
  }
}

export function handleSpatialAssetDeactivated(
  event: SpatialAssetDeactivated
): void {
  let hexHashId = addQm(event.params.geoDIDId) as Bytes;
  let base58Hash = "did:geo:" + hexHashId.toBase58(); // imported crypto function

  let geoDID = GeoDID.load(base58Hash);

  if (geoDID.parent) {
    let edgeToParent = Edge.load(geoDID.parent + "-" + base58Hash);

    edgeToParent.active = false;
    edgeToParent.save();

    // remove edge from parent
    let parentGeoDID = GeoDID.load(geoDID.parent);

    let originalEdges = parentGeoDID.edges;

    let changedEdges: Array<string>;

    for (let i = 0; i < originalEdges.length; i++) {
      let ed = Edge.load(originalEdges[i]);
      if (ed.id != edgeToParent.id) {
        changedEdges.push(originalEdges[i]);
      }
    }

    parentGeoDID.edges = changedEdges;

    parentGeoDID.save();
  }

  geoDID.owner = "";
  geoDID.root = "";
  geoDID.active = false;
  geoDID.parent = null;

  geoDID.save();
}
