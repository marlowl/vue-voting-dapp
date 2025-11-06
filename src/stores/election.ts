import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Candidate {
  id: number
  name: string
  voteCount: number
}

export const useElectionStore = defineStore('election', () => {
  const candidates = ref<Candidate[]>([])
  const selectedCandidateId = ref<number | null>(null)
  const hasVoted = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const contractAddress = ref<string>(import.meta.env.VITE_CONTRACT_ADDRESS || '')

  function setCandidates(newCandidates: Candidate[]) {
    candidates.value = newCandidates
  }

  function setSelectedCandidate(id: number) {
    selectedCandidateId.value = id
  }

  function setHasVoted(voted: boolean) {
    hasVoted.value = voted
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading
  }

  function setError(errorMsg: string | null) {
    error.value = errorMsg
  }

  function setContractAddress(address: string) {
    contractAddress.value = address
  }

  function reset() {
    candidates.value = []
    selectedCandidateId.value = null
    hasVoted.value = false
    isLoading.value = false
    error.value = null
  }

  return {
    candidates,
    selectedCandidateId,
    hasVoted,
    isLoading,
    error,
    contractAddress,
    setCandidates,
    setSelectedCandidate,
    setHasVoted,
    setLoading,
    setError,
    setContractAddress,
    reset,
  }
})
