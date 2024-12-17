import { createPinia, defineStore } from 'pinia'
import { ref } from 'vue'

// Definér din brugerstore
export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isAuthReady = ref(false)
  const isDarkMode = ref(
    JSON.parse(localStorage.getItem('isDarkMode')) !== null
      ? JSON.parse(localStorage.getItem('isDarkMode'))
      : true, // Standard til dark mode aktiv
  )

  const setUser = (newUser) => {
    user.value = newUser
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode.value))
  }

  return {
    user,
    isAuthReady,
    isDarkMode,
    setUser,
    toggleDarkMode,
  }
})

// Opret en enkelt Pinia-instans
const pinia = createPinia()
export default pinia
