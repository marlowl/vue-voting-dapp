<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="text-center">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
        Decentralized Voting
      </h1>
      <p class="mt-2 text-slate-600 dark:text-slate-400">
        Cast your vote securely on the blockchain
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading && candidates.length === 0" class="card">
      <div class="flex flex-col items-center justify-center py-12">
        <LoadingSpinner size="xl" />
        <p class="mt-4 text-slate-600 dark:text-slate-400">Loading candidates...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
      <div class="flex items-center gap-3">
        <ExclamationTriangleIcon class="h-6 w-6 text-red-600 dark:text-red-400" />
        <div>
          <h3 class="font-semibold text-red-900 dark:text-red-400">Error</h3>
          <p class="text-sm text-red-700 dark:text-red-300">{{ error }}</p>
        </div>
      </div>
      <button class="btn btn-secondary mt-4" @click="loadData">
        Retry
      </button>
    </div>

    <!-- Candidates List -->
    <div v-else class="space-y-4">
      <div
        v-for="candidate in candidates"
        :key="candidate.id"
      >
        <CandidateCard
          :candidate="candidate"
          :is-selected="selectedCandidateId === candidate.id"
          @select="selectCandidate"
        />
      </div>
    </div>

    <!-- Voting Actions -->
    <div v-if="candidates.length > 0" class="card bg-gradient-to-br from-primary-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
      <div v-if="!isConnected" class="text-center">
        <p class="text-slate-700 dark:text-slate-300 mb-4">
          Connect your wallet to participate in voting
        </p>
        <WalletConnect />
      </div>

      <div v-else-if="hasVoted" class="text-center">
        <div class="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
          <CheckCircleIcon class="h-8 w-8" />
          <p class="text-xl font-semibold">You have already voted!</p>
        </div>
        <p class="mt-2 text-slate-600 dark:text-slate-400">
          Thank you for participating in this election.
        </p>
      </div>

      <div v-else class="space-y-4">
        <div v-if="selectedCandidateId" class="text-center">
          <p class="text-slate-700 dark:text-slate-300 mb-4">
            You are voting for:
            <span class="font-bold text-primary-600 dark:text-primary-400">
              {{ selectedCandidate?.name }}
            </span>
          </p>
        </div>

        <button
          class="btn btn-primary w-full py-3 text-lg flex items-center justify-center gap-2"
          :disabled="!selectedCandidateId || isLoading"
          @click="submitVote"
        >
          <CheckCircleIcon v-if="!isLoading" class="h-6 w-6" />
          <LoadingSpinner v-else size="sm" color="white" />
          <span>{{ isLoading ? 'Submitting Vote...' : 'Submit Vote' }}</span>
        </button>

        <p class="text-xs text-center text-slate-500 dark:text-slate-400">
          This action will submit a transaction to the blockchain
        </p>
      </div>
    </div>

    <!-- Contract Info -->
    <div class="card bg-slate-100 dark:bg-slate-800/50">
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-sm text-slate-600 dark:text-slate-400">Contract Address:</span>
          <span class="text-sm font-mono text-slate-900 dark:text-slate-100">
            {{ contractAddressShort }}
          </span>
        </div>
        <div v-if="isConnected" class="flex items-center justify-between">
          <span class="text-sm text-slate-600 dark:text-slate-400">Your Address:</span>
          <span class="text-sm font-mono text-slate-900 dark:text-slate-100">
            {{ walletStore.shortAddress }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/solid'
import { useWalletStore } from '@/stores/wallet'
import { useElectionStore } from '@/stores/election'
import { useElection } from '@/composables/useElection'
import CandidateCard from './CandidateCard.vue'
import LoadingSpinner from './LoadingSpinner.vue'
import WalletConnect from './WalletConnect.vue'

const walletStore = useWalletStore()
const electionStore = useElectionStore()
const { isConnected } = storeToRefs(walletStore)
const { candidates, selectedCandidateId, hasVoted, isLoading, error, contractAddress } = storeToRefs(electionStore)

const { loadCandidates, checkIfVoted, vote } = useElection()

const selectedCandidate = computed(() => {
  return candidates.value.find((c) => c.id === selectedCandidateId.value)
})

const contractAddressShort = computed(() => {
  if (!contractAddress.value) return 'Not set'
  return `${contractAddress.value.slice(0, 6)}...${contractAddress.value.slice(-4)}`
})

const selectCandidate = (id: number) => {
  if (!hasVoted.value) {
    electionStore.setSelectedCandidate(id)
  }
}

const submitVote = async () => {
  if (!selectedCandidateId.value) return
  await vote(selectedCandidateId.value)
}

const loadData = async () => {
  await loadCandidates()
  if (isConnected.value) {
    await checkIfVoted()
  }
}

onMounted(async () => {
  // Set contract address from env or use default
  const address = import.meta.env.VITE_CONTRACT_ADDRESS || '0x9828F99985a337c41fE3Ef1B72932365d3EA4e58'
  electionStore.setContractAddress(address)

  await loadData()
})

// Watch for wallet connection changes
import { watch } from 'vue'
watch(isConnected, async (newValue) => {
  if (newValue) {
    await checkIfVoted()
  }
})
</script>
