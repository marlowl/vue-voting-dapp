<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'max-w-sm w-full bg-white dark:bg-slate-800 shadow-lg rounded-lg pointer-events-auto ring-1 overflow-hidden',
          notificationClasses[notification.type],
        ]"
        class="animate-slide-up"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <component :is="iconComponent(notification.type)" class="h-6 w-6" aria-hidden="true" />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium">{{ notification.title }}</p>
              <p class="mt-1 text-sm opacity-90">{{ notification.message }}</p>
            </div>
            <div class="ml-4 flex flex-shrink-0">
              <button
                type="button"
                class="inline-flex rounded-md hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2"
                @click="removeNotification(notification.id)"
              >
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { useNotification } from '@/composables/useNotification'
import type { Notification } from '@/composables/useNotification'

const { notifications, removeNotification } = useNotification()

const notificationClasses = {
  success: 'ring-green-500 text-green-800 dark:text-green-400',
  error: 'ring-red-500 text-red-800 dark:text-red-400',
  info: 'ring-blue-500 text-blue-800 dark:text-blue-400',
  warning: 'ring-yellow-500 text-yellow-800 dark:text-yellow-400',
}

const iconComponent = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return CheckCircleIcon
    case 'error':
      return XCircleIcon
    case 'info':
      return InformationCircleIcon
    case 'warning':
      return ExclamationTriangleIcon
    default:
      return InformationCircleIcon
  }
}
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(2rem);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
</style>
