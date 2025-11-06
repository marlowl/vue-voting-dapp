<template>
  <div
    :class="[
      'card cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.02]',
      isSelected ? 'ring-2 ring-primary-500' : '',
    ]"
    @click="$emit('select', candidate.id)"
  >
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <div class="flex items-center gap-3">
          <div
            class="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white font-bold text-lg"
          >
            {{ candidate.id }}
          </div>
          <div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">
              {{ candidate.name }}
            </h3>
            <p class="text-sm text-slate-600 dark:text-slate-400">Candidate #{{ candidate.id }}</p>
          </div>
        </div>
      </div>

      <div class="text-right">
        <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">
          {{ candidate.voteCount }}
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          {{ candidate.voteCount === 1 ? 'vote' : 'votes' }}
        </p>
      </div>
    </div>

    <div v-if="isSelected" class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
      <div class="flex items-center justify-center gap-2 text-primary-600 dark:text-primary-400">
        <CheckCircleIcon class="h-5 w-5" />
        <span class="font-medium">Selected</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import type { Candidate } from '@/stores/election'

defineProps<{
  candidate: Candidate
  isSelected: boolean
}>()

defineEmits<{
  select: [id: number]
}>()
</script>
