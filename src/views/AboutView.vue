<template>
  <div class="max-w-4xl mx-auto">
    <div class="card space-y-6">
      <div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-4">
          About This dApp
        </h1>
        <p class="text-lg text-slate-600 dark:text-slate-400">
          A modern, decentralized voting application built with cutting-edge web3 technologies
        </p>
      </div>

      <div class="space-y-4">
        <section>
          <h2 class="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span class="text-3xl">🗳️</span>
            What is This?
          </h2>
          <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
            This is a decentralized voting application (dApp) that leverages the Ethereum blockchain
            to provide transparent, secure, and tamper-proof voting. Each vote is recorded as a
            transaction on the blockchain, ensuring complete transparency and immutability.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span class="text-3xl">🔧</span>
            Technology Stack
          </h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <h3 class="font-semibold text-primary-600 dark:text-primary-400 mb-2">Frontend</h3>
              <ul class="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                <li>✓ Vue 3 with Composition API</li>
                <li>✓ TypeScript for type safety</li>
                <li>✓ Tailwind CSS for modern styling</li>
                <li>✓ Vite for fast development</li>
                <li>✓ Pinia for state management</li>
              </ul>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <h3 class="font-semibold text-primary-600 dark:text-primary-400 mb-2">Blockchain</h3>
              <ul class="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                <li>✓ Ethereum blockchain</li>
                <li>✓ Solidity smart contracts</li>
                <li>✓ ethers.js for web3 integration</li>
                <li>✓ MetaMask wallet connection</li>
                <li>✓ Truffle for contract deployment</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span class="text-3xl">✨</span>
            Key Features
          </h2>
          <div class="space-y-2">
            <div class="flex items-start gap-3">
              <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Decentralized & Transparent</p>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  All votes are recorded on the blockchain, visible to everyone
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Secure & Immutable</p>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  Once cast, votes cannot be changed or deleted
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p class="font-medium text-slate-900 dark:text-white">One Vote Per Address</p>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  Smart contract enforces one vote per Ethereum address
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <CheckCircleIcon class="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Modern UX</p>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  Clean, responsive design with dark mode support
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-3 flex items-center gap-2">
            <span class="text-3xl">📚</span>
            How to Use
          </h2>
          <ol class="space-y-3">
            <li class="flex gap-3">
              <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-bold">
                1
              </span>
              <div class="flex-1 pt-1">
                <p class="font-medium text-slate-900 dark:text-white">Install MetaMask</p>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  Download and install the MetaMask browser extension
                </p>
              </div>
            </li>
            <li class="flex gap-3">
              <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-bold">
                2
              </span>
              <div class="flex-1 pt-1">
                <p class="font-medium text-slate-900 dark:text-white">Connect Your Wallet</p>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  Click "Connect Wallet" and approve the connection in MetaMask
                </p>
              </div>
            </li>
            <li class="flex gap-3">
              <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-bold">
                3
              </span>
              <div class="flex-1 pt-1">
                <p class="font-medium text-slate-900 dark:text-white">Select a Candidate</p>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  Choose your preferred candidate from the list
                </p>
              </div>
            </li>
            <li class="flex gap-3">
              <span class="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-bold">
                4
              </span>
              <div class="flex-1 pt-1">
                <p class="font-medium text-slate-900 dark:text-white">Submit Your Vote</p>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  Click "Submit Vote" and confirm the transaction in MetaMask
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section class="pt-4 border-t border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <a
              href="https://github.com/marlowl/vue-voting-dapp"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clip-rule="evenodd"
                />
              </svg>
              View on GitHub
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
</script>
