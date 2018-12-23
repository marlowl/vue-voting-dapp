const MyContract = artifacts.require("./Election.sol");

module.exports = async function(callback) {
  const contract = await MyContract.deployed()
  let test = await contract.vote(1).send({from: '0xC9fa34d5412D4ba645ca7dcA378766B22c06D3AA'})
  console.log(test)
  
}