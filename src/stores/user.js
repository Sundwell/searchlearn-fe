import { ref } from 'vue'

const user = ref(null)

export const useUserStore = () => {
  const setUser = (newUser) => {
    user.value = newUser
  }

  return {
    user,
    setUser,
  }
}
