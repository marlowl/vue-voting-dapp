# Vue voting dApp

<p align="center">		
  <img src="https://cdn-images-1.medium.com/max/1200/1*F1LChP2_EbsSPh4OPaJ7xA.png">		
 </p>
 
This project was generated with [vue-cli](https://github.com/vuejs/vue-cli) version 3.2.1

An simple Vue dApp with a voting mechanism build in the smart contract

### Demo
Vote for a selected candidate

![](screenshot.gif)

### Install dependencies
1. `git clone https://github.com/marlowl/vue-voting-dapp`
2. `npm install`
3. `cd vue`
4. `npm install`

### Install and run ganache-cli
1. `npm install -g ganache-cli`
2.  Simply start ganache with `ganache-cli -p 7545`

### Update .env files
1. In the root:
`MNEMONIC= "your ganache MNEMONIC"`
`INFURA_API_KEY="your infura key"`

2. In the vue folder:
`VUE_APP_ETHADDRESS="your eth address"`

### Truffle
1. To compile your contracts `truffle compile`
2. To deploy those contracts to the network `truffle migrate --network kovan`

### Start dev server
1. `cd vue`
2. `npm run serve`

### Technologies & Languages Used
1. Vue (Typescript/Javascript)
2. Truffle (Solidity)
3. Ganache


