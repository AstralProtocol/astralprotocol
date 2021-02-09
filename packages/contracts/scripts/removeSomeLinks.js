const SpatialAssets = artifacts.require("./SpatialAssets.sol");

module.exports = async function (callback) {

  try {

  const SpatialAssetsContract = await SpatialAssets.deployed();


    // geodid id 4 remove parent 3
  let tx = await SpatialAssetsContract.removeParentGeoDID(4,3)

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

    }
    catch(error) {
      console.log(error)
    }
  
    callback()
};
