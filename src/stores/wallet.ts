import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { BrowserProvider } from 'ethers'

export const useWalletStore = defineStore('wallet', () => {
  const provider = ref<BrowserProvider | null>(null)
  const address = ref<string | null>(null)
  const chainId = ref<number | null>(null)
  const isConnecting = ref(false)
  const error = ref<string | null>(null)

  const isConnected = computed(() => !!address.value && !!provider.value)
  const shortAddress = computed(() => {
    if (!address.value) return ''
    return `${address.value.slice(0, 6)}...${address.value.slice(-4)}`
  })

  function setProvider(newProvider: BrowserProvider) {
    provider.value = newProvider
  }

  function setAddress(newAddress: string) {
    address.value = newAddress
  }

  function setChainId(newChainId: number) {
    chainId.value = newChainId
  }

  function setConnecting(status: boolean) {
    isConnecting.value = status
  }

  function setError(errorMsg: string | null) {
    error.value = errorMsg
  }

  function disconnect() {
    provider.value = null
    address.value = null
    chainId.value = null
    error.value = null
  }

  return {
    provider,
    address,
    chainId,
    isConnecting,
    error,
    isConnected,
    shortAddress,
    setProvider,
    setAddress,
    setChainId,
    setConnecting,
    setError,
    disconnect,
  }
})
