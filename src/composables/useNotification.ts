import { ref } from 'vue'

export interface Notification {
  id: number
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message: string
}

const notifications = ref<Notification[]>([])
let notificationId = 0

export function useNotification() {
  const addNotification = (
    type: Notification['type'],
    title: string,
    message: string,
    duration = 5000
  ) => {
    const id = notificationId++
    const notification: Notification = { id, type, title, message }

    notifications.value.push(notification)

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }

  const removeNotification = (id: number) => {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  const showSuccess = (title: string, message: string, duration?: number) => {
    return addNotification('success', title, message, duration)
  }

  const showError = (title: string, message: string, duration?: number) => {
    return addNotification('error', title, message, duration)
  }

  const showInfo = (title: string, message: string, duration?: number) => {
    return addNotification('info', title, message, duration)
  }

  const showWarning = (title: string, message: string, duration?: number) => {
    return addNotification('warning', title, message, duration)
  }

  return {
    notifications,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeNotification,
  }
}
