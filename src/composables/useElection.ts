import { Contract } from 'ethers'
import { useWalletStore } from '@/stores/wallet'
import { useElectionStore, type Candidate } from '@/stores/election'
import { useNotification } from './useNotification'
// @ts-ignore - JSON import
import ElectionABI from '../../build/contracts/Election.json'

export function useElection() {
  const walletStore = useWalletStore()
  const electionStore = useElectionStore()
  const { showError, showSuccess, showInfo } = useNotification()

  const getContract = () => {
    if (!walletStore.provider || !electionStore.contractAddress) {
      throw new Error('Provider or contract address not available')
    }

    return new Contract(
      electionStore.contractAddress,
      ElectionABI.abi,
      walletStore.provider
    )
  }

  const loadCandidates = async () => {
    try {
      electionStore.setLoading(true)
      electionStore.setError(null)

      const contract = getContract()
      const candidatesCount = await contract.candidatesCount()

      const candidatesList: Candidate[] = []

      for (let i = 1; i <= Number(candidatesCount); i++) {
        const candidate = await contract.candidates(i)
        candidatesList.push({
          id: Number(candidate.id),
          name: candidate.name,
          voteCount: Number(candidate.voteCount),
        })
      }

      electionStore.setCandidates(candidatesList)
      return candidatesList
    } catch (error: any) {
      const message = error.message || 'Failed to load candidates'
      electionStore.setError(message)
      showError('Error', message)
      return []
    } finally {
      electionStore.setLoading(false)
    }
  }

  const checkIfVoted = async () => {
    try {
      if (!walletStore.address) return false

      const contract = getContract()
      const hasVoted = await contract.voters(walletStore.address)
      electionStore.setHasVoted(hasVoted)
      return hasVoted
    } catch (error: any) {
      console.error('Failed to check voting status:', error)
      return false
    }
  }

  const vote = async (candidateId: number) => {
    if (!walletStore.provider || !walletStore.address) {
      showError('Error', 'Please connect your wallet first')
      return false
    }

    try {
      electionStore.setLoading(true)
      electionStore.setError(null)

      const signer = await walletStore.provider.getSigner()
      const contract = getContract().connect(signer) as Contract

      showInfo('Transaction Pending', 'Please confirm the transaction in your wallet')

      const tx = await contract.vote(candidateId)

      showInfo('Processing', 'Waiting for transaction confirmation...')
      await tx.wait()

      electionStore.setHasVoted(true)
      showSuccess('Vote Submitted!', 'Your vote has been recorded on the blockchain')

      // Reload candidates to show updated vote counts
      await loadCandidates()

      return true
    } catch (error: any) {
      let message = 'Failed to submit vote'

      if (error.code === 'ACTION_REJECTED') {
        message = 'Transaction was rejected'
      } else if (error.message.includes('already voted')) {
        message = 'You have already voted'
        electionStore.setHasVoted(true)
      } else if (error.message) {
        message = error.message
      }

      electionStore.setError(message)
      showError('Vote Failed', message)
      return false
    } finally {
      electionStore.setLoading(false)
    }
  }

  return {
    loadCandidates,
    checkIfVoted,
    vote,
  }
}
