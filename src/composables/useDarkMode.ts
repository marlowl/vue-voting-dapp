import { ref, watch, onMounted } from 'vue'

export function useDarkMode() {
  const isDark = ref(false)

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
  }

  const setDarkMode = (value: boolean) => {
    isDark.value = value
  }

  // Apply dark mode class to html element
  watch(
    isDark,
    (newValue) => {
      if (newValue) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkMode', 'true')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('darkMode', 'false')
      }
    },
    { immediate: true }
  )

  // Initialize from localStorage
  onMounted(() => {
    const stored = localStorage.getItem('darkMode')
    if (stored !== null) {
      isDark.value = stored === 'true'
    } else {
      // Check system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  })

  return {
    isDark,
    toggleDarkMode,
    setDarkMode,
  }
}
