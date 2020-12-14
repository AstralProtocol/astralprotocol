const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const mnemonic = fs
  .readFileSync(".mnemonic")
  .toString()
  .trim();

const ropstenURL = fs
  .readFileSync(".provider")
  .toString()
  .trim();

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonic,
  },
  providerOrUrl: ropstenURL,
});

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
    },
  },
  plugins: ["solidity-coverage"],
};
