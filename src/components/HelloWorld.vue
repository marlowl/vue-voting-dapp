<template>
  <div class="helloworld">
    <b-table :data="tableData" :columns="columns"></b-table>
    <b-select v-model="selectedCandidate" expanded placeholder="Select candidate">
      <option v-for="option in tableData" :value="option.id" :key="option.name">{{ option.name }}</option>
    </b-select>
    <br>
    <button class="button is-primary" @click="setVote()">Vote</button>
    <br>
    <br>
    <h1>Your account: {{this.currentAddress}}</h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Web3 from "web3";
const Election = require("../../build/contracts/Election.json");

@Component
export default class HelloWorld extends Vue {
  selectedCandidate: string = "";
  name: string = "";
  currentAddress: string = "No Address provided, check your MetaMask Wallet";
  tableData: any[] = [];
  columns: {} = [
    {
      field: "id",
      label: "ID",
      width: "40",
      numeric: true
    },
    {
      field: "name",
      label: "Name"
    },
    {
      field: "votes",
      label: "Votes"
    }
  ];

  async getValue() {
    // @ts-ignore
    web3 = new Web3(web3.currentProvider);
    // @ts-ignore
    let electionContract = new web3.eth.Contract(
      Election.abi,
      "0x9828F99985a337c41fE3Ef1B72932365d3EA4e58"
    );
    this.currentAddress = electionContract._address;
    let candidatesCount = await electionContract.methods
      .candidatesCount()
      .call();
    this.tableData;
    for (let i = 0; i < candidatesCount; i++) {
      if (i != 0) {
        let candidates = await electionContract.methods.candidates(i).call();
        this.tableData.push({
          id: i,
          name: candidates.name,
          votes: candidates.voteCount
        });
      }
    }
  }

  async setVote() {
    // @ts-ignore
    web3 = new Web3(web3.currentProvider);
    // @ts-ignore
    let electionContract = new web3.eth.Contract(
      Election.abi,
      "0x9828F99985a337c41fE3Ef1B72932365d3EA4e58"
    );
    let vote = await electionContract.methods
      .vote(this.selectedCandidate)
      .send({ from: process.env.VUE_APP_ETHADDRESS });
  }

  mounted() {
    this.getValue();
  }
}
</script>

<style lang="scss" scoped>
.helloworld {
  margin: auto;
  width: 50%;
}
</style>
