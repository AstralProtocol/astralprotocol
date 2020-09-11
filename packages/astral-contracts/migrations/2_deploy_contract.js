const SpatialAssetRegistrar = artifacts.require("./SpatialAssetRegistrar.sol");

module.exports = async function (deployer) {
  await deployer.deploy(SpatialAssetRegistrar);

  const spatialAssetRegistrarContract = await SpatialAssetRegistrar.deployed();

  console.log(
    "Spatial Asset Registrar deployed at:",
    spatialAssetRegistrarContract.address
  );
};
