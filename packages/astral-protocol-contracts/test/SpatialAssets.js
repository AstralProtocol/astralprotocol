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

  it("Should register correctly", async () => {
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

it("Should register a spatial asset correctly", async () => {
    await spatialAssets.registerSpatialAsset(accounts[1], 1, web3.utils.asciiToHex(testStorage), {from: accounts[1]});

    const owner = await spatialAssets.idToOwner(1);
    const externalStorage = await spatialAssets.idToExternalStorage(1);

    assert.equal(owner, accounts[1], "Ownership not correctly assigned");
    assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), testStorage, "External storage was not correctly assigned");

});


  it("Shouldn't register a spatial asset for someone without the proper role", async () => {
    try {
        await spatialAssets.registerSpatialAsset(accounts[2], 2, web3.utils.asciiToHex(testStorage), {from: accounts[2]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have data supplier role to register"));
    }
  });
});