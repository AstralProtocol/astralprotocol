const SpatialAssets = artifacts.require("./SpatialAssets.sol");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(SpatialAssets, "did:geo:{id}");

  const SpatialAssetsContract = await SpatialAssets.deployed();

  console.log(
    "Spatial Asset Registrar deployed at:",
    SpatialAssetsContract.address
  );

  let tx = await SpatialAssetsContract.enableStorage(web3.utils.asciiToHex('FILECOIN'));

  console.log(
    "Storage enabled ",
    tx.tx
  );
  // geodid id 1, cid 10
  tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0],1,0,[], 10,web3.utils.asciiToHex('FILECOIN'),"Collection");
  
  
  console.log(
    "geodid id 1, cid 10 ",
    tx.tx
  );

  // geodid id 2, cid 11, parent is 1
  tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0],2,1,[],11,web3.utils.asciiToHex("FILECOIN"),"Collection")

  
  console.log(
    "geodid id 2, cid 11, parent is 1 ",
    tx.tx
  );

  // geodid id 3, cid 12, parent is 1 

  tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0],3,1,[],12,web3.utils.asciiToHex("FILECOIN"),"Collection")
 
  console.log(
    "geodid id 3, cid 12, parent is 1 ",
    tx.tx
  );
  // geodid id 4, cid 13, parent is 3

  tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0],4,3,[],13,web3.utils.asciiToHex("FILECOIN"),"Item")

  console.log(
    "geodid id 4, cid 13, parent is 3 ",
    tx.tx
  );
    // geodid id 5, cid 14

  tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0],5,0,[],14,web3.utils.asciiToHex("FILECOIN"),"Item")

  console.log(
    "geodid id 5, cid 14  ",
    tx.tx
  );
    // geodid id 6

  tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0],6,0,[],15,web3.utils.asciiToHex("FILECOIN"),"Collection")

  console.log(
    "geodid id 6 ",
    tx.tx
  );
    // geodid id 6, adding childrens 1 and 5
  tx = await SpatialAssetsContract.addChildrenGeoDIDs(6,[1,5])

  console.log(
    "geodid id 6, adding childrens 1 and 5 ",
    tx.tx
  );
    // geodid id 7

    tx = await SpatialAssetsContract.registerSpatialAsset(accounts[0],7,0,[],16,web3.utils.asciiToHex("FILECOIN"),"Item")

    console.log(
      "geodid id 7 ",
      tx.tx
      );

    // geodid id 7 adding parent 2
    tx = await SpatialAssetsContract.addParentGeoDID(7,2)

    console.log(
      " geodid id 7 adding parent 2 ",
      tx.tx
      );

    // geodid id 4 remove parent 3
    tx = await SpatialAssetsContract.removeParentGeoDID(4,3)

    console.log(
      " geodid id 4 remove parent 3 ",
      tx.tx
      );

    
    // geodid id 6 remove children 1 and 5
    tx = await SpatialAssetsContract.removeChildrenGeoDIDs(6,[1,5])

    console.log(
      " geodid id 6 remove children 1 and 5",
      tx.tx
      );

    // delete geodid 2
    tx = await SpatialAssetsContract.deactivateSpatialAsset(2,[7])

    console.log(
      " geodid id 2 delete",
      tx.tx
      );

};
