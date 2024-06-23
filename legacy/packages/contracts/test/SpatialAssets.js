const SpatialAssets = artifacts.require("SpatialAssets");
const bs58 = require('bs58')

contract("SpatialAssets", async accounts => {
  let spatialAssets;
  const testUri = "did:geo:{id}";
  const testRole = "DATA_SUPPLIER";
  const testStorage = "FILECOIN";

  const stringToBytes = (string) => web3.utils.asciiToHex(string)


  // based on https://ethereum.stackexchange.com/questions/17094/how-to-store-ipfs-hash-using-bytes32
  // Return bytes32 hex string from base58 encoded ipfs hash,
  // stripping leading 2 bytes from 34 byte IPFS hash
  // Assume IPFS defaults: function:0x12=sha2, size:0x20=256 bits
  // E.g. "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL" -->
  // "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
  function getBytes32FromIpfsHash(ipfsListing) {
    return "0x"+bs58.decode(ipfsListing).slice(2).toString('hex')
  }
    
    
  // Return base58 encoded ipfs hash from bytes32 hex string,
  // E.g. "0x017dfd85d4f6cb4dcd715a88101f7b1f06cd1e009b2327a0809d01eb9c91f231"
  // --> "QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL"
  
  function getIpfsHashFromBytes32(bytes32Hex) {
    // Add our default ipfs values for first 2 bytes:
    // function:0x12=sha2, size:0x20=256 bits
    // and cut off leading "0x"
    const hashHex = "1220" + bytes32Hex.slice(2)
    const hashBytes = Buffer.from(hashHex, 'hex');
    const hashStr = bs58.encode(hashBytes)
    return hashStr
  }

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
    await spatialAssets.enableStorage(stringToBytes(testStorage), {from: accounts[0]});
    const storageAllowed = await spatialAssets.allowedStorages(stringToBytes(testStorage));
    assert(storageAllowed, "The storage was created");
  });
  
  it("Shouldn't let a non admin user register a storage", async () => {
    try {
      await spatialAssets.enableStorage(stringToBytes('SKYDB'), {from: accounts[1]});
      assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have admin role to edit allowed offchain storages"));
    }
  });

  it("Shouldn't let the same storage be registerd twice", async () => {
    try {
      await spatialAssets.enableStorage(stringToBytes(testStorage), {from: accounts[0]});
      assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: storage must not be active yet"));
    }
  });

  it("Should disable a storage correctly", async () => {
    await spatialAssets.enableStorage(stringToBytes('SKYDB'), {from: accounts[0]});
    await spatialAssets.disableStorage(stringToBytes('SKYDB'), {from: accounts[0]});
    const storageAllowed = await spatialAssets.allowedStorages(stringToBytes('SKYDB'));
    assert(!storageAllowed, "The storage was disabled");
  });

    
  it("Shouldn't let a non admin user disable a storage", async () => {
    try {
      await spatialAssets.disableStorage(stringToBytes(testStorage), {from: accounts[1]});
      assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have admin role to edit allowed offchain storages"));
    }
  });

  it("Should register a role correctly", async () => {
    await spatialAssets.registerRole({from: accounts[1]});

    assert(spatialAssets.hasRole(stringToBytes(testRole), accounts[1]), "The role was created");
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
      const geodidid = 'did:geo:QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL';
      const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));
      const cid = 'QmNSUYVKDSvPUnRLKmuxk9diJ6yS96r1TrAXzjTiBcCLAL';
      const bytes32Cid = getBytes32FromIpfsHash(cid);

      await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDID, stringToBytes(''), [], bytes32Cid, stringToBytes(testStorage), 0, {from: accounts[1]});

      const owner = await spatialAssets.idToOwner(bytes32GeoDID);
      const externalStorage = await spatialAssets.idToExternalStorage(bytes32GeoDID);
      const canBeParent = await spatialAssets.idToCanBeParent(bytes32GeoDID);
      const hasParent = await spatialAssets.idToHasParent(bytes32GeoDID);

      assert.equal(owner, accounts[1], "Ownership not correctly assigned");
      assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), testStorage, "External storage was not correctly assigned");
      assert(canBeParent, "Can be parent");
      assert(!hasParent, "Does not have parent");

  });

  it("Should register a spatial asset correctly with a parent", async () => {
    const geodididParent = 'did:geo:QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4';
    const cidParent = 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4';

    const geodididChild = 'did:geo:QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKd';
    const cidChild = 'QmTtDqWzo179ujTXU7pf2PodLNjpcpQQCXhkiQXi6wZvKd';

    const bytes32GeoDIDParent = getBytes32FromIpfsHash(geodididParent.substring(8));
    const bytes32CidParent = getBytes32FromIpfsHash(cidParent);

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));
    const bytes32CidChild = getBytes32FromIpfsHash(cidChild);

    await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDIDParent, stringToBytes(''), [], bytes32CidParent, stringToBytes(testStorage), 0, {from: accounts[1]});
    await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDIDChild, bytes32GeoDIDParent, [], bytes32CidChild, stringToBytes(testStorage), 0, {from: accounts[1]});

    const owner = await spatialAssets.idToOwner(bytes32GeoDIDChild);
    const externalStorage = await spatialAssets.idToExternalStorage(bytes32GeoDIDChild);
    const canBeParent = await spatialAssets.idToCanBeParent(bytes32GeoDIDChild);
    const hasParent = await spatialAssets.idToHasParent(bytes32GeoDIDChild);

    assert.equal(owner, accounts[1], "Ownership not correctly assigned");
    assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), testStorage, "External storage was not correctly assigned");
    assert(canBeParent, "Can be parent");
    assert(hasParent, "Does have parent");

});

  it("Should register a spatial asset correctly of type 1 without parent", async () => {
    const geodidid = 'did:geo:QmYA2fn8cMbVWo4v95RwcwJVyQsNtnEwHerfWR8UNtEwoE';
    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));
    const cid = 'QmYA2fn8cMbVWo4v95RwcwJVyQsNtnEwHerfWR8UNtEwoE';
    const bytes32Cid = getBytes32FromIpfsHash(cid);

    await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDID, stringToBytes(''), [], bytes32Cid, stringToBytes(testStorage), 1, {from: accounts[1]});

    const owner = await spatialAssets.idToOwner(bytes32GeoDID);
    const externalStorage = await spatialAssets.idToExternalStorage(bytes32GeoDID);
    const canBeParent = await spatialAssets.idToCanBeParent(bytes32GeoDID);
    const hasParent = await spatialAssets.idToHasParent(bytes32GeoDID);

    assert.equal(owner, accounts[1], "Ownership not correctly assigned");
    assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), testStorage, "External storage was not correctly assigned");
    assert(!canBeParent, "Cannot be parent");
    assert(!hasParent, "Does not have parent");

});

it("Should register a spatial asset correctly of type 1 with a parent", async () => {
  const geodididParent = 'did:geo:QmV9tSDx9UiPeWExXEeH6aoDvmihvx6jD5eLb4jbTaKGps';
  const cidParent = 'QmV9tSDx9UiPeWExXEeH6aoDvmihvx6jD5eLb4jbTaKGps';

  const geodididChild = 'did:geo:QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd';
  const cidChild = 'QmSrPmbaUKA3ZodhzPWZnpFgcPMFWF4QsxXbkWfEptTBJd';

  const bytes32GeoDIDParent = getBytes32FromIpfsHash(geodididParent.substring(8));
  const bytes32CidParent = getBytes32FromIpfsHash(cidParent);

  const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));
  const bytes32CidChild = getBytes32FromIpfsHash(cidChild);

  await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDIDParent, stringToBytes(''), [], bytes32CidParent, stringToBytes(testStorage), 0, {from: accounts[1]});

  await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDIDChild, bytes32GeoDIDParent, [], bytes32CidChild, stringToBytes(testStorage), 1, {from: accounts[1]});

  const owner = await spatialAssets.idToOwner(bytes32GeoDIDChild);
  const externalStorage = await spatialAssets.idToExternalStorage(bytes32GeoDIDChild);
  const canBeParent = await spatialAssets.idToCanBeParent(bytes32GeoDIDChild);
  const hasParent = await spatialAssets.idToHasParent(bytes32GeoDIDChild);

  assert.equal(owner, accounts[1], "Ownership not correctly assigned");
  assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), testStorage, "External storage was not correctly assigned");
  assert(!canBeParent, "Cannot be parent");
  assert(hasParent, "Does not have parent");

});



it("Should register a spatial asset correctly of type 0 without parent with a chidren", async () => {
  
  const geodididParent = 'did:geo:QmdiA1atSBgU178s5rsWont8cYns3fmwHxELTpiP9uFfLW';
  const cidParent = 'QmdiA1atSBgU178s5rsWont8cYns3fmwHxELTpiP9uFfLW';

  const geodididChild = 'did:geo:QmXExS4BMc1YrH6iWERyryFcDWkvobxryXSwECLrcd7Y1H';
  const cidChild = 'QmXExS4BMc1YrH6iWERyryFcDWkvobxryXSwECLrcd7Y1H';

  const bytes32GeoDIDParent = getBytes32FromIpfsHash(geodididParent.substring(8));
  const bytes32CidParent = getBytes32FromIpfsHash(cidParent);

  const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));
  const bytes32CidChild = getBytes32FromIpfsHash(cidChild);

  await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDIDChild, stringToBytes(''), [], bytes32CidChild, stringToBytes(testStorage), 1, {from: accounts[1]});

  await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDIDParent, stringToBytes(''), [bytes32GeoDIDChild], bytes32CidParent, stringToBytes(testStorage), 0, {from: accounts[1]});

  const owner = await spatialAssets.idToOwner(bytes32GeoDIDParent);
  const externalStorage = await spatialAssets.idToExternalStorage(bytes32GeoDIDParent);
  const canBeParent = await spatialAssets.idToCanBeParent(bytes32GeoDIDParent);
  const hasParent = await spatialAssets.idToHasParent(bytes32GeoDIDParent);

  assert.equal(owner, accounts[1], "Ownership not correctly assigned");
  assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), testStorage, "External storage was not correctly assigned");
  assert(canBeParent, "Is a parent");
  assert(!hasParent, "Does not have parent");

});

  it("Should register a spatial asset correctly of type 0 with a parent and with a children", async () => {
  
    const geodididParent = 'did:geo:QmR29wrbNv3WrMuodwuLiDwvskuZKKeTtcYDw7SwNffzCH';
    const cidParent = 'QmR29wrbNv3WrMuodwuLiDwvskuZKKeTtcYDw7SwNffzCH';

    const geodidid = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';
    const cid = 'Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const geodididChild = 'did:geo:QmdsCAZ3KEVPNTkUtru1wtFRUoYnGsfjQnAMPyiEdFZdM9';
    const cidChild = 'QmdsCAZ3KEVPNTkUtru1wtFRUoYnGsfjQnAMPyiEdFZdM9';

    const bytes32GeoDIDParent = getBytes32FromIpfsHash(geodididParent.substring(8));
    const bytes32CidParent = getBytes32FromIpfsHash(cidParent);

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));
    const bytes32Cid = getBytes32FromIpfsHash(cid);


    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));
    const bytes32CidChild = getBytes32FromIpfsHash(cidChild);


    await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDIDParent, stringToBytes(''), [], bytes32CidParent, stringToBytes(testStorage), 0, {from: accounts[1]});

    await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDIDChild, stringToBytes(''), [], bytes32CidChild, stringToBytes(testStorage), 1, {from: accounts[1]});

    await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDID, bytes32GeoDIDParent, [bytes32GeoDIDChild], bytes32Cid, stringToBytes(testStorage), 0, {from: accounts[1]});


    const owner = await spatialAssets.idToOwner(bytes32GeoDID);
    const externalStorage = await spatialAssets.idToExternalStorage(bytes32GeoDID);
    const canBeParent = await spatialAssets.idToCanBeParent(bytes32GeoDID);
    const hasParent = await spatialAssets.idToHasParent(bytes32GeoDID);

    assert.equal(owner, accounts[1], "Ownership not correctly assigned");
    assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), testStorage, "External storage was not correctly assigned");
    assert(canBeParent, "Is a parent");
    assert(hasParent, "Has a parent");

  });


  it("Shouldn't register a spatial asset for someone without the proper role", async () => {
    const geodididParent = 'did:geo:QmR29wrbNv3WrMuodwuLiDwvskuZKKeTtcYDw7SwNffzCH';

    const geodidid = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';
    const cid = 'Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const bytes32GeoDIDParent = getBytes32FromIpfsHash(geodididParent.substring(8));

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));
    const bytes32Cid = getBytes32FromIpfsHash(cid);

    try {
        await spatialAssets.registerSpatialAsset(accounts[2], bytes32GeoDID, bytes32GeoDIDParent, [], bytes32Cid, stringToBytes(testStorage), 0, {from: accounts[2]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have data supplier role to register"));
    }
  });

  it("Shouldn't register a spatial asset for a storage not yet allowed", async () => {
    const geodididParent = 'did:geo:QmR29wrbNv3WrMuodwuLiDwvskuZKKeTtcYDw7SwNffzCH';

    const geodidid = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';
    const cid = 'Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const bytes32GeoDIDParent = getBytes32FromIpfsHash(geodididParent.substring(8));

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));
    const bytes32Cid = getBytes32FromIpfsHash(cid);

    try {
        await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDID, bytes32GeoDIDParent, [], bytes32Cid, stringToBytes('SKYDB'), 0, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: storage must be allowed"));
    }
  });

  
  it("Shouldn't register a spatial asset with the same id", async () => {
    const geodidid = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';
    const cid = 'Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));
    const bytes32Cid = getBytes32FromIpfsHash(cid);


    try {
        await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDID, '0x0', [], bytes32Cid, stringToBytes(testStorage),0,{from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: id must not have an owner yet"));
    }
  });

  it("Shouldn't register a spatial asset without the proper geodid type", async () => {
    const geodidid = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const geodididChild = 'did:geo:QmYMg6WAuvF5i5yFmjT8KkqewZ5Ngh4U9Mp1bGfdjraFVk';
    const cidChild = 'QmYMg6WAuvF5i5yFmjT8KkqewZ5Ngh4U9Mp1bGfdjraFVk';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));
    const bytes32CidChild = getBytes32FromIpfsHash(cidChild);

    try {
        await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDIDChild, bytes32GeoDID, [], bytes32CidChild, stringToBytes(testStorage), 2,{from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("Spatial Assets: wrong geodidtype"));
    }
  });

  
  it("Should add children to an already created geodid correctly", async () => {
    // already created above
    const geodidid = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const geodididChild = 'did:geo:QmdPtC3T7Kcu9iJg6hYzLBWR5XCDcYMY7HV685E3kH3EcS';
    const cidChild = 'QmdPtC3T7Kcu9iJg6hYzLBWR5XCDcYMY7HV685E3kH3EcS';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));
    const bytes32CidChild = getBytes32FromIpfsHash(cidChild);


    await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDIDChild, stringToBytes(''), [], bytes32CidChild, stringToBytes(testStorage), 1, {from: accounts[1]});

    await spatialAssets.addChildrenGeoDIDs(bytes32GeoDID, [bytes32GeoDIDChild], {from: accounts[1]});

    const hasParent = await spatialAssets.idToHasParent(bytes32GeoDIDChild);

    assert(hasParent, "Geodid children successfuly added");

  });

  it("Shouldn't register a children by someone without the proper role", async () => {
    const geodidid = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const geodididChild = 'did:geo:QmdPtC3T7Kcu9iJg6hYzLBWR5XCDcYMY7HV685E3kH3EcS';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));
    
    try {
      await spatialAssets.addChildrenGeoDIDs(bytes32GeoDID, [bytes32GeoDIDChild], {from: accounts[2]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have data supplier role to register"));
    }
  });

  it("Shouldn't register a children to a geodid that does not exist", async () => {
    const geodidid = 'did:geo:QmcniBv7UQ4gGPQQW2BwbD4ZZHzN3o3tPuNLZCbBchd1zh';

    const geodididChild = 'did:geo:QmdPtC3T7Kcu9iJg6hYzLBWR5XCDcYMY7HV685E3kH3EcS';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));

    try {
      await spatialAssets.addChildrenGeoDIDs(bytes32GeoDID, [bytes32GeoDIDChild], {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: geoDIDId must be owned by its creator"));
    }
  });

  it("Shouldn't register a children to a geodid that cannot be parent", async () => {
    const geodidid = 'did:geo:QmdsCAZ3KEVPNTkUtru1wtFRUoYnGsfjQnAMPyiEdFZdM9';

    const geodididChild = 'did:geo:QmdPtC3T7Kcu9iJg6hYzLBWR5XCDcYMY7HV685E3kH3EcS';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));
    
    try {
      await spatialAssets.addChildrenGeoDIDs(bytes32GeoDID, [bytes32GeoDIDChild], {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: geoDIDId must be able to be parent (a Collection)"));
    }
  });

  it("Shouldn't register a parent by someone without the proper role", async () => {
    const geodidid = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const geodididChild = 'did:geo:QmdPtC3T7Kcu9iJg6hYzLBWR5XCDcYMY7HV685E3kH3EcS';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));

    try {
      await spatialAssets.addParentGeoDID(bytes32GeoDIDChild, bytes32GeoDID, {from: accounts[2]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have data supplier role to register"));
    }
  });

  it("Shouldn't register a parent if the child geodid wasn't created by the sender", async () => {
    const geodidid = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const geodididChild = 'did:geo:QmdPtC3T7Kcu9iJg6hYzLBWR5XCDcYMY7HV685E3kH3EcS';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));

    try {
      await spatialAssets.addParentGeoDID(bytes32GeoDIDChild, bytes32GeoDID, {from: accounts[0]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: geoDIDId must be owned by its creator"));
    }
  });

  it("Shouldn't register a parent if it does not exist", async () => {
    const geodidid = 'did:geo:QmcniBv7UQ4gGPQQW2BwbD4ZZHzN3o3tPuNLZCbBchd1zh';
    
    const geodididChild = 'did:geo:QmdPtC3T7Kcu9iJg6hYzLBWR5XCDcYMY7HV685E3kH3EcS';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));

    try {
      await spatialAssets.addParentGeoDID(bytes32GeoDIDChild, bytes32GeoDID, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: parentGeoDIDId does not exist"));
    }
  });

  it("Shouldn't register a parent to a geodid that already has a parent", async () => {
    const geodidid = 'did:geo:QmavE42xtK1VovJFVTVkCR5Jdf761QWtxmvak9Zx718TVr';
    const cid = 'QmavE42xtK1VovJFVTVkCR5Jdf761QWtxmvak9Zx718TVr';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));
    const bytes32Cid = getBytes32FromIpfsHash(cid);

    
    const geodididChild = 'did:geo:QmdsCAZ3KEVPNTkUtru1wtFRUoYnGsfjQnAMPyiEdFZdM9';

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));

    await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDID, stringToBytes(''), [], bytes32Cid, stringToBytes(testStorage), 0, {from: accounts[1]});

    try {
      await spatialAssets.addParentGeoDID(bytes32GeoDIDChild, bytes32GeoDID, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: geoDIDId already has a parent"));
    }
  });

  
  it("Shouldn't register as parent a geodid that cannot be parent", async () => {
    const geodidid = 'did:geo:QmavE42xtK1VovJFVTVkCR5Jdf761QWtxmvak9Zx718TVr';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const geodididChild = 'did:geo:QmdsCAZ3KEVPNTkUtru1wtFRUoYnGsfjQnAMPyiEdFZdM9';

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));

    try {
      await spatialAssets.addParentGeoDID(bytes32GeoDID, bytes32GeoDIDChild, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: parentGeoDIDId must be able to be parent (a Collection)"));
    }
  });


    
  it("Should add a parent to an already created geodid correctly", async () => {
    const geodidid = 'did:geo:QmavE42xtK1VovJFVTVkCR5Jdf761QWtxmvak9Zx718TVr';
    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));


    const geodididChild = 'did:geo:QmeKZSrzAZ5bhaxH2rvm8HEsiqfKceG1FuLHwwbD3mbnEo';
    const cidChild = 'QmeKZSrzAZ5bhaxH2rvm8HEsiqfKceG1FuLHwwbD3mbnEo';

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));
    const bytes32CidChild = getBytes32FromIpfsHash(cidChild);


    await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDIDChild, stringToBytes(''), [], bytes32CidChild, stringToBytes(testStorage), 1, {from: accounts[1]});


    await spatialAssets.addParentGeoDID(bytes32GeoDIDChild, bytes32GeoDID, {from: accounts[1]});

    const hasParent = await spatialAssets.idToHasParent(bytes32GeoDIDChild);

    assert(hasParent, "Geodid children successfuly added");

  });


  it("Shouldn't remove children by an account without proper roles", async () => {
    const geodidid = 'did:geo:QmavE42xtK1VovJFVTVkCR5Jdf761QWtxmvak9Zx718TVr';
    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const geodididChild = 'did:geo:QmeKZSrzAZ5bhaxH2rvm8HEsiqfKceG1FuLHwwbD3mbnEo';

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));

    try {
      await spatialAssets.removeChildrenGeoDIDs(bytes32GeoDID, [bytes32GeoDIDChild], {from: accounts[3]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have data supplier role to register"));
    }
  });

  
  it("Shouldn't remove children to a non existent geodid", async () => {
    const geodidid = 'did:geo:QmccqhJg5wm5kNjAP4k4HrYxoqaXUGNuotDUqfvYBx8jrR';
    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const geodididChild = 'did:geo:QmeKZSrzAZ5bhaxH2rvm8HEsiqfKceG1FuLHwwbD3mbnEo';

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));

    try {
      await spatialAssets.removeChildrenGeoDIDs(bytes32GeoDID, [bytes32GeoDIDChild], {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: id must not have an owner yet"));
    }
  });

  it("Should remove children correctly", async () => {
    const geodidid = 'did:geo:QmavE42xtK1VovJFVTVkCR5Jdf761QWtxmvak9Zx718TVr';
    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const geodididChild = 'did:geo:QmeKZSrzAZ5bhaxH2rvm8HEsiqfKceG1FuLHwwbD3mbnEo';

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));

      await spatialAssets.removeChildrenGeoDIDs(bytes32GeoDID, [bytes32GeoDIDChild], {from: accounts[1]});
    
      const hasParent = await spatialAssets.idToHasParent(bytes32GeoDIDChild);

      assert(!hasParent, "Parent successfuly removed");
  });


  it("Shouldn't remove a parent by a sender without proper roles", async () => {

    const geodidid = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const geodididChild = 'did:geo:QmdsCAZ3KEVPNTkUtru1wtFRUoYnGsfjQnAMPyiEdFZdM9';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));


    try {
      await spatialAssets.removeParentGeoDID(bytes32GeoDIDChild, bytes32GeoDID, {from: accounts[2]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: must have data supplier role to register"));
    }
  });



  it("Shouldn't remove a parent to a geodid that does not exist", async () => {
    const geodidid = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const geodididChild = 'did:geo:QmNwEiWPc8EPc9kGEqdi9UeM5RY8jRJSPVdrtKELFZRH85';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));

    try {
      await spatialAssets.removeParentGeoDID(bytes32GeoDIDChild, bytes32GeoDID, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: id must not have an owner yet"));
    }
  });

  it("Shouldn't remove a parent  that does not exist", async () => {
    const geodidid = 'did:geo:QmNwEiWPc8EPc9kGEqdi9UeM5RY8jRJSPVdrtKELFZRH85';
    
    const geodididChild = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));

    try {
      await spatialAssets.removeParentGeoDID(bytes32GeoDIDChild, bytes32GeoDID, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: GeoDID to be removed as parent does not exist"));
    }
  });

  
  it("Shouldn't remove a parent to a geodid that does not have a parent", async () => {
    const geodididParent = 'did:geo:QmdiA1atSBgU178s5rsWont8cYns3fmwHxELTpiP9uFfLW';
  
    const bytes32GeoDIDParent = getBytes32FromIpfsHash(geodididParent.substring(8));

    const geodididChild = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const bytes32GeoDIDChild = getBytes32FromIpfsHash(geodididChild.substring(8));
    
    try {
      await spatialAssets.removeParentGeoDID(bytes32GeoDIDParent, bytes32GeoDIDChild, {from: accounts[1]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: GeoDID does not have a parent to remove"));
    }
  });

  it("Should remove a parent correctly", async () => {
      
    const geodididParent = 'did:geo:QmR29wrbNv3WrMuodwuLiDwvskuZKKeTtcYDw7SwNffzCH';

    const geodidid = 'did:geo:Qmc2ot2NQadXmbvPbsidyjYDvPfPwKZmovzNpfRPKxXUrL';

    const bytes32GeoDIDParent = getBytes32FromIpfsHash(geodididParent.substring(8));

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));


    await spatialAssets.removeParentGeoDID(bytes32GeoDID, bytes32GeoDIDParent, {from: accounts[1]});
  
    const hasParent = await spatialAssets.idToHasParent(bytes32GeoDID);

    assert(!hasParent, "Parent successfuly removed");
});



  it("Shouldn't deactivate a Spatial Asset if not the right owner", async () => {
    const geodididParent = 'did:geo:QmR29wrbNv3WrMuodwuLiDwvskuZKKeTtcYDw7SwNffzCH';

    const bytes32GeoDIDParent = getBytes32FromIpfsHash(geodididParent.substring(8));

    try {
      await spatialAssets.deactivateSpatialAsset(bytes32GeoDIDParent,[], {from: accounts[2]});
    
        assert(false);
    } catch (err) {
        assert(err.message.includes("SpatialAssets: caller is not owner of the Spatial Asset"));
    }
  });

  it("Should deactivate a spatial asset with no children correctly", async () => {
    const geodididParent = 'did:geo:QmR29wrbNv3WrMuodwuLiDwvskuZKKeTtcYDw7SwNffzCH';

    const bytes32GeoDIDParent = getBytes32FromIpfsHash(geodididParent.substring(8));

    await spatialAssets.deactivateSpatialAsset(bytes32GeoDIDParent, [], {from: accounts[1]});

    const owner = await spatialAssets.idToOwner(bytes32GeoDIDParent);
    const externalStorage = await spatialAssets.idToExternalStorage(bytes32GeoDIDParent);
    const cid = await spatialAssets.idToCid(bytes32GeoDIDParent);
    const hasParent = await spatialAssets.idToHasParent(bytes32GeoDIDParent);

    assert.equal(owner, '0x0000000000000000000000000000000000000000', "Id not burned");
    assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), '', "External storage not deleted");
    assert.equal(web3.utils.hexToAscii(cid).replace(/\u0000/g, ''), '', "Cid not deleted");
    assert(!hasParent, "Has parent not null");

  });

  it("Should deactivate a spatial asset with children correctly", async () => {
      
    const geodididParent = 'did:geo:QmQ747r7eLfsVtBFBSRwfXsPK6tADJpQzJxz4uFdoZb9XJ';
    const cidParent = 'QmQ747r7eLfsVtBFBSRwfXsPK6tADJpQzJxz4uFdoZb9XJ';

    const geodidid = 'did:geo:QmcvyefkqQX3PpjpY5L8B2yMd47XrVwAipr6cxUt2zvYU8';
    const cid = 'QmcvyefkqQX3PpjpY5L8B2yMd47XrVwAipr6cxUt2zvYU8';

    const bytes32GeoDIDParent = getBytes32FromIpfsHash(geodididParent.substring(8));
    const bytes32CidParent = getBytes32FromIpfsHash(cidParent);

    const bytes32GeoDID = getBytes32FromIpfsHash(geodidid.substring(8));
    const bytes32Cid = getBytes32FromIpfsHash(cid);


    await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDIDParent, stringToBytes(''), [], bytes32CidParent, stringToBytes(testStorage), 0, {from: accounts[1]});

    await spatialAssets.registerSpatialAsset(accounts[1], bytes32GeoDID, bytes32GeoDIDParent, [], bytes32Cid, stringToBytes(testStorage), 1, {from: accounts[1]});


    await spatialAssets.deactivateSpatialAsset(bytes32GeoDIDParent, [bytes32GeoDID], {from: accounts[1]});

    const owner = await spatialAssets.idToOwner(bytes32GeoDIDParent);
    const externalStorage = await spatialAssets.idToExternalStorage(bytes32GeoDIDParent);
    const cidTest = await spatialAssets.idToCid(bytes32GeoDIDParent);
    const hasParent = await spatialAssets.idToHasParent(bytes32GeoDIDParent);

    assert.equal(owner, '0x0000000000000000000000000000000000000000', "Id not burned");
    assert.equal(web3.utils.hexToAscii(externalStorage).replace(/\u0000/g, ''), '', "External storage not deleted");
    assert.equal(web3.utils.hexToAscii(cidTest).replace(/\u0000/g, ''), '', "Cid not deleted");
    assert(!hasParent, "Has parent not null");

  });

});