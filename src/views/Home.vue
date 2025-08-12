<template>
  <div class="home">
    <b-container>
      <h1 class="my-4">2025 Decentralized Voting dApp</h1>

      <!-- Wallet Connection -->
      <b-card header="Wallet Information" class="mb-4">
        <b-card-text>
          <div v-if="!wallet.address">
            <b-button @click="connectWallet" variant="primary">Connect Wallet</b-button>
          </div>
          <div v-else>
            <p><strong>Address:</strong> {{ wallet.address }}</p>
            <p><strong>Balance:</strong> {{ wallet.balance }} ETH</p>
          </div>
        </b-card-text>
      </b-card>

      <!-- Admin Panel -->
      <div v-if="wallet.address && isOwner">
        <b-card header="Admin Panel" class="mb-4">
          <b-form @submit.prevent="addCandidate">
            <b-form-group label="New Candidate Name:" label-for="candidate-name">
              <b-form-input id="candidate-name" v-model="newCandidate" required></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="success" class="mr-2">Add Candidate</b-button>
          </b-form>
          <hr>
          <b-button @click="startElection" variant="warning" class="mr-2">Start Election</b-button>
          <b-button @click="endElection" variant="danger">End Election</b-button>
        </b-card>
      </div>

      <!-- Election Status and Candidates -->
      <b-card header="Election Status" class="mb-4">
        <p><strong>Status:</strong> {{ electionState }}</p>
      </b-card>

      <b-card header="Candidates" class="mb-4">
        <b-table striped hover :items="candidates" :fields="fields">
          <template #cell(vote)="data">
            <b-button @click="vote(data.item.id)" variant="primary" :disabled="electionState !== 'Running'">
              Vote
            </b-button>
          </template>
        </b-table>
      </b-card>

    </b-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { ethers } from 'ethers';
import ElectionContract from '../../build/contracts/Election.json';

// --- Reactive State ---
const wallet = ref({
  address: '',
  balance: ''
});
const electionState = ref('Loading...');
const candidates = ref([]);
const newCandidate = ref('');
const isOwner = ref(false);
const contract = ref(null);

const fields = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'voteCount', label: 'Votes' },
  { key: 'vote', label: 'Vote' }
];

// --- Ethers.js setup ---
let provider;
let signer;

onMounted(async () => {
  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    await connectWallet();
  } else {
    console.error("MetaMask not detected!");
  }
});

async function connectWallet() {
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    wallet.value.address = accounts[0];
    const balance = await provider.getBalance(wallet.value.address);
    wallet.value.balance = ethers.formatEther(balance);
    await initContract();
  } catch (error) {
    console.error("Error connecting to wallet:", error);
  }
}

async function initContract() {
  try {
    const network = await provider.getNetwork();
    const contractAddress = ElectionContract.networks[network.chainId.toString()].address;
    contract.value = new ethers.Contract(contractAddress, ElectionContract.abi, signer);

    await fetchElectionState();
    await fetchCandidates();
    await checkOwner();

    // Listen for events
    contract.value.on("Voted", (candidateId, voter) => {
      console.log(`Vote cast for candidate ${candidateId} by ${voter}`);
      fetchCandidates();
    });

    contract.value.on("ElectionStarted", () => {
        fetchElectionState();
    });

    contract.value.on("ElectionEnded", () => {
        fetchElectionState();
    });

  } catch (error) {
    console.error("Error initializing contract:", error);
  }
}

async function fetchElectionState() {
    const state = await contract.value.electionState();
    const states = ['Created', 'Running', 'Ended'];
    electionState.value = states[Number(state)];
}

async function fetchCandidates() {
  const count = await contract.value.candidatesCount();
  const fetchedCandidates = [];
  for (let i = 1; i <= Number(count); i++) {
    const candidate = await contract.value.candidates(i);
    if(candidate.name){
        fetchedCandidates.push({
            id: Number(candidate.id),
            name: candidate.name,
            voteCount: Number(candidate.voteCount)
        });
    }
  }
  candidates.value = fetchedCandidates;
}

async function checkOwner() {
    const ownerAddress = await contract.value.owner();
    isOwner.value = ownerAddress.toLowerCase() === wallet.value.address.toLowerCase();
}

async function addCandidate() {
  if (!newCandidate.value) return;
  try {
    const tx = await contract.value.addCandidate(newCandidate.value);
    await tx.wait();
    newCandidate.value = '';
    await fetchCandidates();
  } catch (error) {
    console.error("Error adding candidate:", error);
  }
}

async function startElection() {
    try {
        const tx = await contract.value.startElection();
        await tx.wait();
        await fetchElectionState();
    } catch (error) {
        console.error("Error starting election:", error);
    }
}

async function endElection() {
    try {
        const tx = await contract.value.endElection();
        await tx.wait();
        await fetchElectionState();
    } catch (error) {
        console.error("Error ending election:", error);
    }
}

async function vote(candidateId) {
  try {
    const tx = await contract.value.vote(candidateId);
    await tx.wait();
  } catch (error) {
    console.error("Error voting:", error);
    alert("Voting failed. You may have already voted or the election is not running.");
  }
}

</script>

<style scoped>
.home {
  padding-top: 2rem;
}
</style>
