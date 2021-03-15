const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();

let mnemonic = process.env.MNEMONIC
let ropstenURL = process.env.ROPSTEN_API_KEY

let provider

if(mnemonic && ropstenURL) {
  provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonic,
    },
    providerOrUrl: ropstenURL,
  });
}


module.exports = {
  plugins: ["solidity-coverage"],
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ropsten: {
      provider: provider,
      network_id: "3",
    },
  },
  compilers: {
    solc: {
      version: "0.6.12",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
       }
    },
  },
  plugins: ["solidity-coverage"],
};
