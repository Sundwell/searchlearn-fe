<template>
  <div class="container flex flex-col min-h-screen">
    <Toast />
    <TopNavBar />
    <RouterView class="flex-auto mb-4" />
  </div>
</template>

<script setup>
import Toast from 'primevue/toast'
import TopNavBar from './components/TopNavBar/TopNavBar.vue'
import { useUserStore } from './stores/user.js'
import { api } from './api/api.js'

const { setUser } = useUserStore()

const loadUser = () => {
  const user = api.auth.getCurrentUser()

  if (user) {
    setUser(user)
  }
}

loadUser()
</script>
