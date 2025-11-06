<template>
  <div class="flex items-center justify-center">
    <div
      :class="[
        'animate-spin rounded-full border-b-2',
        sizeClasses[size],
        colorClasses[color],
      ]"
    ></div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'xl'
    color?: 'primary' | 'white' | 'slate'
  }>(),
  {
    size: 'md',
    color: 'primary',
  }
)

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
}

const colorClasses = {
  primary: 'border-primary-600',
  white: 'border-white',
  slate: 'border-slate-600',
}
</script>
