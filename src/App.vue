<template>
  <div class="container flex flex-col min-h-screen">
    <TopNavBar />
    <RouterView class="flex-auto mb-4" />
  </div>
</template>

<script setup>
import TopNavBar from './components/TopNavBar/TopNavBar.vue'
</script>
