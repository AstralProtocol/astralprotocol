const SpatialAssetRegistrar = artifacts.require("SpatialAssetRegistrar");

contract("SpatialAssetRegistrar", async (accounts) => {
  let registrar;
  const hash =
    "0x5519c53ea99f0d33f6a57941ccb197dd2bafef51a5b1786972721b2f2ea66e11";

  const cid = "ipfs:abcdefghi123456";
  const nextCid = "ipfs:zxy:123456";

  const nonCreatedHash =
    "0xa3457fe7659b902c0c6a1af7a37669900c6208566a1bacc87e514690dbe853e0";

  before(async () => {
    registrar = await SpatialAssetRegistrar.deployed();
    await registrar.register(hash, cid, {
      from: accounts[1],
    });
  });

  it("Should deploy smart contract properly", async () => {
    assert(registrar.address !== "");
  });

  it("The geoDid should exist", async () => {
    const exists = await registrar.checkExistence(hash, { from: accounts[0] });
    assert.isTrue(exists, "The geoDid was not created");
  });

  it("Should resolve the geoDID correctly", async () => {
    const resolvedCid = await registrar.geoDIDResolver(accounts[1], hash, {
      from: accounts[0],
    });
    assert.equal(cid, resolvedCid, "The cid was incorrectly resolved");
  });

  it("Should update the geoDid correctly", async () => {
    await registrar.update(hash, nextCid, { from: accounts[1] });

    const resolvedCid = await registrar.geoDIDResolver(accounts[1], hash, {
      from: accounts[0],
    });

    assert.equal(nextCid, resolvedCid, "The cid was incorrectly resolved");
  });

  it("Should delete the geoDid correctly", async () => {
    await registrar.deregister(hash, { from: accounts[0] });
    const exists = await registrar.checkExistence(hash, {
      from: accounts[0],
    });

    assert.isFalse(exists, "The geoDid was not deleted");
  });

  it("Shouldn't let a user register the same hash", async () => {
    // it was deactivated before, reactivating it
    await registrar.register(hash, nextCid, { from: accounts[1] });

    try {
      await registrar.register(hash, nextCid, { from: accounts[1] });
      assert(false);
    } catch (err) {
      assert(err.message.includes("The geoDID hash was already created"));
    }
  });

  it("Shouldn't let a user update a non existent hash", async () => {
    try {
      await registrar.update(nonCreatedHash, cid, { from: accounts[1] });
      assert(false);
    } catch (err) {
      assert(err.message.includes("geoDID does not exist"));
    }
  });
});
