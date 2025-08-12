require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    sepolia: {
      provider: function() {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
        )
      },
      network_id: 11155111,
      gas: 5000000,
      gasPrice: 25000000000,
    }
  },
  compilers: {
    solc: {
      version: "0.8.20",
    }
  }
};