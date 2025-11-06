<template>
  <button
    class="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
    @click="toggleDarkMode"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <SunIcon v-if="isDark" class="h-5 w-5 text-yellow-500" />
    <MoonIcon v-else class="h-5 w-5 text-slate-700" />
  </button>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggleDarkMode } = useDarkMode()
</script>
