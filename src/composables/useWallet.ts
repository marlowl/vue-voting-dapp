import { BrowserProvider } from 'ethers'
import { useWalletStore } from '@/stores/wallet'
import { useNotification } from './useNotification'

export function useWallet() {
  const walletStore = useWalletStore()
  const { showError, showSuccess } = useNotification()

  const connectWallet = async () => {
    if (!window.ethereum) {
      showError('MetaMask not detected', 'Please install MetaMask to use this application')
      return false
    }

    try {
      walletStore.setConnecting(true)
      walletStore.setError(null)

      const provider = new BrowserProvider(window.ethereum)
      const accounts = await provider.send('eth_requestAccounts', [])

      if (accounts.length === 0) {
        throw new Error('No accounts found')
      }

      const network = await provider.getNetwork()
      const signer = await provider.getSigner()
      const address = await signer.getAddress()

      walletStore.setProvider(provider)
      walletStore.setAddress(address)
      walletStore.setChainId(Number(network.chainId))

      showSuccess('Wallet Connected', `Connected to ${walletStore.shortAddress}`)

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      return true
    } catch (error: any) {
      const message = error.message || 'Failed to connect wallet'
      walletStore.setError(message)
      showError('Connection Failed', message)
      return false
    } finally {
      walletStore.setConnecting(false)
    }
  }

  const disconnectWallet = () => {
    // Clean up listeners
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum.removeListener('chainChanged', handleChainChanged)
    }
    walletStore.disconnect()
    showSuccess('Disconnected', 'Wallet disconnected successfully')
  }

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet()
    } else if (accounts[0] !== walletStore.address) {
      walletStore.setAddress(accounts[0])
      window.location.reload()
    }
  }

  const handleChainChanged = () => {
    window.location.reload()
  }

  const checkConnection = async () => {
    if (!window.ethereum) return false

    try {
      const provider = new BrowserProvider(window.ethereum)
      const accounts = await provider.send('eth_accounts', [])

      if (accounts.length > 0) {
        const network = await provider.getNetwork()
        const signer = await provider.getSigner()
        const address = await signer.getAddress()

        walletStore.setProvider(provider)
        walletStore.setAddress(address)
        walletStore.setChainId(Number(network.chainId))

        // Set up listeners
        window.ethereum.on('accountsChanged', handleAccountsChanged)
        window.ethereum.on('chainChanged', handleChainChanged)

        return true
      }
      return false
    } catch (error) {
      console.error('Failed to check connection:', error)
      return false
    }
  }

  return {
    connectWallet,
    disconnectWallet,
    checkConnection,
  }
}
