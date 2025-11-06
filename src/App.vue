<template>
  <div id="app" class="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
    <!-- Header -->
    <header class="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo/Brand -->
          <router-link to="/" class="flex items-center gap-2 group">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <span class="text-white font-bold text-xl">V</span>
            </div>
            <span class="text-xl font-bold text-slate-900 dark:text-white hidden sm:block">
              VotingDApp
            </span>
          </router-link>

          <!-- Navigation Links -->
          <div class="flex items-center gap-4">
            <router-link
              to="/"
              class="px-4 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              active-class="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
            >
              Vote
            </router-link>
            <router-link
              to="/about"
              class="px-4 py-2 rounded-lg font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              active-class="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
            >
              About
            </router-link>
            <DarkModeToggle />
            <div class="hidden md:block">
              <WalletConnect />
            </div>
          </div>
        </div>

        <!-- Mobile Wallet Connect -->
        <div class="md:hidden mt-4">
          <WalletConnect />
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="mt-16 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div class="container mx-auto px-4 py-6">
        <div class="text-center text-sm text-slate-600 dark:text-slate-400">
          <p>Decentralized Voting Application powered by Ethereum</p>
          <p class="mt-1">Built with Vue 3, TypeScript, and ethers.js</p>
        </div>
      </div>
    </footer>

    <!-- Notifications -->
    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import WalletConnect from './components/WalletConnect.vue'
import DarkModeToggle from './components/DarkModeToggle.vue'
import NotificationContainer from './components/NotificationContainer.vue'
</script>
