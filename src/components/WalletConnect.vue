<template>
  <div class="wallet-connect">
    <button
      v-if="!isConnected"
      class="btn btn-primary flex items-center gap-2"
      :disabled="isConnecting"
      @click="handleConnect"
    >
      <WalletIcon class="h-5 w-5" />
      <span>{{ isConnecting ? 'Connecting...' : 'Connect Wallet' }}</span>
    </button>

    <div v-else class="flex items-center gap-3">
      <div class="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-lg">
        <CheckCircleIcon class="h-5 w-5" />
        <span class="font-mono text-sm">{{ shortAddress }}</span>
      </div>
      <button
        class="btn btn-secondary"
        @click="handleDisconnect"
        title="Disconnect wallet"
      >
        <ArrowRightOnRectangleIcon class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { WalletIcon, CheckCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline'
import { useWalletStore } from '@/stores/wallet'
import { useWallet } from '@/composables/useWallet'

const walletStore = useWalletStore()
const { isConnected, isConnecting, shortAddress } = storeToRefs(walletStore)
const { connectWallet, disconnectWallet, checkConnection } = useWallet()

const handleConnect = async () => {
  await connectWallet()
}

const handleDisconnect = () => {
  disconnectWallet()
}

onMounted(async () => {
  await checkConnection()
})
</script>
