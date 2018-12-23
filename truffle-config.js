require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    kovan: {
        provider: function() {
          return new HDWalletProvider(
            process.env.MNEMONIC,
            'https://kovan.infura.io/${process.env.INFURA_API_KEY}'
          )
        },
        gas: 5000000,
        gasPrice: 25000000000,
        network_id: 42
      },
    }
}