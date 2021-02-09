const SpatialAssets = artifacts.require("SpatialAssets");

contract("SpatialAssets", async accounts => {
  let spatialAssets;
  const testUri = "did:geo:{id}";
  const testRole = "DATA_SUPPLIER";
  const testStorage = "FILECOIN";

  before(async () => {
    spatialAssets = await SpatialAssets.deployed();
  }); 

  it('Should deploy smart contract properly', async() => {
      const spatialAssets = await SpatialAssets.deployed();
      assert(spatialAssets.address !== '');
  });

  it("Should assign the uri correctly", async () => {
    const uri = await spatialAssets.uri();
    assert.equal(testUri, uri, "The uri was incorrectly assigned");
  });

  it("Should enable a storage correctly", async () => {
    await spatialAssets.enableStorage(web3.utils.asciiToHex(testStorage), {from: accounts[0]});
    const storageAllowed = await spatialAssets.allowedStorages(web3.utils.asciiToHex(testStorage));
    assert(storageAllowed, "The storage was created");
  });
  
  it("Shouldn't let a non admin user register a storage", async () => {
    try {
      await spatialAssets.enableStorage(web3.utils.asciiToHex('SKYDB'), {from: accounts[1]});
      assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have admin role to edit allowed offchain storages"));
    }
  });

  it("Shouldn't let the same storage be registerd twice", async () => {
    try {
      await spatialAssets.enableStorage(web3.utils.asciiToHex(testStorage), {from: accounts[0]});
      assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: storage must not be active yet"));
    }
  });

  it("Should disable a storage correctly", async () => {
    await spatialAssets.enableStorage(web3.utils.asciiToHex('SKYDB'), {from: accounts[0]});
    await spatialAssets.disableStorage(web3.utils.asciiToHex('SKYDB'), {from: accounts[0]});
    const storageAllowed = await spatialAssets.allowedStorages(web3.utils.asciiToHex('SKYDB'));
    assert(!storageAllowed, "The storage was disabled");
  });

    
  it("Shouldn't let a non admin user disable a storage", async () => {
    try {
      await spatialAssets.disableStorage(web3.utils.asciiToHex(testStorage), {from: accounts[1]});
      assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have admin role to edit allowed offchain storages"));
    }
  });

  it("Should register a role correctly", async () => {
    await spatialAssets.registerRole({from: accounts[1]});

    assert(spatialAssets.hasRole(web3.utils.asciiToHex(testRole), accounts[1]), "The role was created");
  });


  it("Shouldn't let a user register with the same role twice", async () => {
    try {
        await spatialAssets.registerRole({from: accounts[1]});
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must not have a DATA_SUPPLIER role yet"));
    }
  });

  it("Should register a spatial asset correctly without a parent", async () => {
      await spatialAssets.registerSpatialAsset(accounts[1], 1, 0, [], 10, web3.utils.asciiToHex(testStorage), 0, {from: accounts[1]});

      const owner = await spatialAssets.idToOwner(1);
      const externalStorage = await spatialAssets.idToExternalStorage(1);
      const canBeParent = await spatialAssets.idToCanBeParent(1);
      const hasParent = await spatialAssets.idToHasParent(1);

      assert.equal(owner, accounts[1], "Ownership not correctly assigned");
      assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), testStorage, "External storage was not correctly assigned");
      assert(canBeParent, "Can be parent");
      assert(!hasParent, "Does not have parent");

  });

  it("Should register a spatial asset correctly with a parent", async () => {
    await spatialAssets.registerSpatialAsset(accounts[1], 11, 0, [], 21, web3.utils.asciiToHex(testStorage), 0, {from: accounts[1]});
    await spatialAssets.registerSpatialAsset(accounts[1], 12, 11, [], 22, web3.utils.asciiToHex(testStorage), 0, {from: accounts[1]});

    const owner = await spatialAssets.idToOwner(12);
    const externalStorage = await spatialAssets.idToExternalStorage(12);
    const canBeParent = await spatialAssets.idToCanBeParent(12);
    const hasParent = await spatialAssets.idToHasParent(12);

    assert.equal(owner, accounts[1], "Ownership not correctly assigned");
    assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), testStorage, "External storage was not correctly assigned");
    assert(canBeParent, "Can be parent");
    assert(hasParent, "Does have parent");

});

  it("Should register a spatial asset correctly of type 1 without parent", async () => {
    await spatialAssets.registerSpatialAsset(accounts[1], 13, 0, [], 23, web3.utils.asciiToHex(testStorage), 1, {from: accounts[1]});

    const owner = await spatialAssets.idToOwner(13);
    const externalStorage = await spatialAssets.idToExternalStorage(13);
    const canBeParent = await spatialAssets.idToCanBeParent(13);
    const hasParent = await spatialAssets.idToHasParent(13);

    assert.equal(owner, accounts[1], "Ownership not correctly assigned");
    assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), testStorage, "External storage was not correctly assigned");
    assert(!canBeParent, "Cannot be parent");
    assert(!hasParent, "Does not have parent");

});

it("Should register a spatial asset correctly of type 1 with a parent", async () => {
  await spatialAssets.registerSpatialAsset(accounts[1], 14, 0, [], 24, web3.utils.asciiToHex(testStorage), 0, {from: accounts[1]});

  await spatialAssets.registerSpatialAsset(accounts[1], 15, 14, [], 25, web3.utils.asciiToHex(testStorage), 1, {from: accounts[1]});

  const owner = await spatialAssets.idToOwner(15);
  const externalStorage = await spatialAssets.idToExternalStorage(15);
  const canBeParent = await spatialAssets.idToCanBeParent(15);
  const hasParent = await spatialAssets.idToHasParent(15);

  assert.equal(owner, accounts[1], "Ownership not correctly assigned");
  assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), testStorage, "External storage was not correctly assigned");
  assert(!canBeParent, "Cannot be parent");
  assert(hasParent, "Does not have parent");

});



it("Should register a spatial asset correctly of type 0 without parent with a chidren", async () => {
  
  await spatialAssets.registerSpatialAsset(accounts[1], 16, 0, [], 26, web3.utils.asciiToHex(testStorage), 1, {from: accounts[1]});

  await spatialAssets.registerSpatialAsset(accounts[1], 17, 0, [16], 27, web3.utils.asciiToHex(testStorage), 0, {from: accounts[1]});

  const owner = await spatialAssets.idToOwner(17);
  const externalStorage = await spatialAssets.idToExternalStorage(17);
  const canBeParent = await spatialAssets.idToCanBeParent(17);
  const hasParent = await spatialAssets.idToHasParent(17);

  assert.equal(owner, accounts[1], "Ownership not correctly assigned");
  assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), testStorage, "External storage was not correctly assigned");
  assert(canBeParent, "Is a parent");
  assert(!hasParent, "Does not have parent");

});

it("Should register a spatial asset correctly of type 0 with a parent and with a children", async () => {
await spatialAssets.registerSpatialAsset(accounts[1], 18, 0, [], 28, web3.utils.asciiToHex(testStorage), 0, {from: accounts[1]});
await spatialAssets.registerSpatialAsset(accounts[1], 19, 0, [], 29, web3.utils.asciiToHex(testStorage), 1, {from: accounts[1]});
await spatialAssets.registerSpatialAsset(accounts[1], 20, 18, [19], 30, web3.utils.asciiToHex(testStorage), 0, {from: accounts[1]});

const owner = await spatialAssets.idToOwner(20);
const externalStorage = await spatialAssets.idToExternalStorage(20);
const canBeParent = await spatialAssets.idToCanBeParent(20);
const hasParent = await spatialAssets.idToHasParent(20);

assert.equal(owner, accounts[1], "Ownership not correctly assigned");
assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), testStorage, "External storage was not correctly assigned");
assert(canBeParent, "Is a parent parent");
assert(hasParent, "Has a parent");

});

  it("Shouldn't register a spatial asset for someone without the proper role", async () => {
    try {
        await spatialAssets.registerSpatialAsset(accounts[2], 2, 1, [], 11, web3.utils.asciiToHex(testStorage), 0, {from: accounts[2]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have data supplier role to register"));
    }
  });

  it("Shouldn't register a spatial asset for a storage not yet allowed", async () => {
    try {
        await spatialAssets.registerSpatialAsset(accounts[1], 3, 1, [], 12, web3.utils.asciiToHex('SKYDB'), 0, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: storage must be allowed"));
    }
  });

  
  it("Shouldn't register a spatial asset with the same id", async () => {
    try {
        await spatialAssets.registerSpatialAsset(accounts[1], 1, 1, [], 13, web3.utils.asciiToHex(testStorage),0,{from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: id must not have an owner yet"));
    }
  });

  it("Shouldn't register a spatial asset without the proper geodid type", async () => {
    try {
        await spatialAssets.registerSpatialAsset(accounts[1], 2, 1, [], 13, web3.utils.asciiToHex(testStorage), 2,{from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("Spatial Assets: wrong geodidtype"));
    }
  });

  
  it("Should add children to an already create geodid correctly", async () => {
    await spatialAssets.registerSpatialAsset(accounts[1], 2, 0, [], 11, web3.utils.asciiToHex(testStorage), 1, {from: accounts[1]});

    await spatialAssets.registerSpatialAsset(accounts[1], 4, 0, [], 13, web3.utils.asciiToHex(testStorage), 0, {from: accounts[1]});
    await spatialAssets.registerSpatialAsset(accounts[1], 3, 0, [], 12, web3.utils.asciiToHex(testStorage), 1, {from: accounts[1]});

    await spatialAssets.addChildrenGeoDIDs(1, [2], {from: accounts[1]});

    const hasParent = await spatialAssets.idToHasParent(2);

    assert(hasParent, "Geodid children successfuly added");

  });

  it("Shouldn't register a children by someone without the proper role", async () => {
    try {
      await spatialAssets.addChildrenGeoDIDs(1, [3], {from: accounts[2]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have data supplier role to register"));
    }
  });

  it("Shouldn't register a children to a geodid that does not exist", async () => {
    try {
      await spatialAssets.addChildrenGeoDIDs(5, [3], {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: geoDIDId must be owned by its creator"));
    }
  });

  it("Shouldn't register a children to a geodid that cannot be parent", async () => {
    try {
      await spatialAssets.addChildrenGeoDIDs(3, [4], {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: geoDIDId must be able to be parent (a Collection)"));
    }
  });

  it("Shouldn't register a parent by someone without the proper role", async () => {
    try {
      await spatialAssets.addParentGeoDID(3, 4, {from: accounts[2]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have data supplier role to register"));
    }
  });

  it("Shouldn't register a parent if the child geodid wasn't created by the sender", async () => {
    try {
      await spatialAssets.addParentGeoDID(3, 4, {from: accounts[0]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: geoDIDId must be owned by its creator"));
    }
  });

  it("Shouldn't register a parent if it does not exist", async () => {
    try {
      await spatialAssets.addParentGeoDID(3, 5, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: parentGeoDIDId does not exist"));
    }
  });

  it("Shouldn't register a parent to a geodid that already has a parent", async () => {
    try {
      await spatialAssets.addParentGeoDID(2, 4, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: geoDIDId already has a parent"));
    }
  });

  
  it("Shouldn't register as parent a geodid that cannot be parent", async () => {
    try {
      await spatialAssets.addParentGeoDID(3, 2, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: parentGeoDIDId must be able to be parent (a Collection)"));
    }
  });


    
  it("Should add children to an already create geodid correctly", async () => {
    await spatialAssets.addParentGeoDID(3, 4, {from: accounts[1]});

    const hasParent = await spatialAssets.idToHasParent(3);

    assert(hasParent, "Geodid children successfuly added");

  });


  it("Shouldn't remove children by an account without proper roles", async () => {
    try {
      await spatialAssets.removeChildrenGeoDIDs(4, [3], {from: accounts[3]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have data supplier role to register"));
    }
  });

  
  it("Shouldn't remove children to a non existent geodid", async () => {
    try {
      await spatialAssets.removeChildrenGeoDIDs(6, [3], {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: id must not have an owner yet"));
    }
  });

  it("Should remove children correctly", async () => {
      await spatialAssets.removeChildrenGeoDIDs(4, [3], {from: accounts[1]});
    
      const hasParent = await spatialAssets.idToHasParent(3);

      assert(!hasParent, "Parent successfuly removed");
  });


  it("Shouldn't remove a parent by a sender without proper roles", async () => {
    try {
      await spatialAssets.removeParentGeoDID(2, 1, {from: accounts[2]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have data supplier role to register"));
    }
  });



  it("Shouldn't remove a parent to a geodid that does not exist or does not belong to sender", async () => {
    try {
      await spatialAssets.removeParentGeoDID(7, 1, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: id must not have an owner yet"));
    }
  });

  it("Shouldn't remove a parent  that does not exist", async () => {
    try {
      await spatialAssets.removeParentGeoDID(2, 7, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: GeoDID to be removed as parent does not exist"));
    }
  });

  
  it("Shouldn't remove a parent to a geodid that does not have a parent", async () => {
    try {
      await spatialAssets.removeParentGeoDID(3, 1, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: GeoDID does not have a parent to remove"));
    }
  });

  it("Should remove a parent correctly", async () => {
    await spatialAssets.removeParentGeoDID(2, 1, {from: accounts[1]});
  
    const hasParent = await spatialAssets.idToHasParent(2);

    assert(!hasParent, "Parent successfuly removed");
});



  it("Shouldn't deactivate a Spatial Asset if not the right owner", async () => {
    try {
      await spatialAssets.deactivateSpatialAsset(1,[], {from: accounts[2]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: caller is not owner of the Spatial Asset"));
    }
  });

  it("Should deactivate a spatial asset with no children correctly", async () => {
    await spatialAssets.deactivateSpatialAsset(1, [], {from: accounts[1]});

    const owner = await spatialAssets.idToOwner(1);
    const externalStorage = await spatialAssets.idToExternalStorage(1);
    const cid = await spatialAssets.idToCid(1);
    const hasParent = await spatialAssets.idToHasParent(1);

    assert.equal(owner, '0x0000000000000000000000000000000000000000', "Id not burned");
    assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), '', "External storage not deleted");
    assert.equal(cid, 0, "Cid not 0");
    assert(!hasParent, "Has parent not null");

  });

  it("Should deactivate a spatial asset with children correctly", async () => {

    await spatialAssets.deactivateSpatialAsset(14, [15], {from: accounts[1]});

    const owner = await spatialAssets.idToOwner(14);
    const externalStorage = await spatialAssets.idToExternalStorage(14);
    const cid = await spatialAssets.idToCid(14);
    const hasParent = await spatialAssets.idToHasParent(14);

    assert.equal(owner, '0x0000000000000000000000000000000000000000', "Id not burned");
    assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), '', "External storage not deleted");
    assert.equal(cid, 0, "Cid not 0");
    assert(!hasParent, "Has parent not null");

  });

});