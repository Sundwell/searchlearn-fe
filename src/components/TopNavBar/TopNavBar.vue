<template>
  <Dialog
    v-model:visible="isAboutModalDisplayed"
    header="О проекте"
    modal
    class="max-w-lg w-full"
  >
    <p class="text-lg">
      Проект создан студентом ИжГТУ для повышения грамотности пользователей сети интернет в области информационного поиска.
    </p>
  </Dialog>

  <section class="flex items-center justify-between py-4">
    <RouterLink :to="{ name: 'home' }">
      <img
        src="./img/logo.svg"
        alt="logo"
      >
    </RouterLink>

    <RegisterModal v-model:is-visible="isRegisterModalDisplayed" />

    <section class="flex gap-x-8">
      <section class="flex gap-x-2">
        <Button
          rounded
          raised
          class="uppercase"
          label="О проекте"
          @click="isAboutModalDisplayed = true"
        />
        <Button
          rounded
          raised
          class="uppercase"
          label="Тесты"
          @click="$router.push({ name: 'tests' })"
        />
        <Button
          rounded
          raised
          class="uppercase"
          label="Статьи"
          @click="$router.push({ name: 'articles' })"
        />
      </section>
      <Button
        rounded
        raised
        icon="pi pi-user"
        @click="isRegisterModalDisplayed = true"
      />
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import RegisterModal from '../RegisterModal.vue'

const isAboutModalDisplayed = ref(false)

const isRegisterModalDisplayed = ref(false)
</script>

<style scoped>

</style>
