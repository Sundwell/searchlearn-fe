<template>
  <Dialog
    v-model:visible="isAboutModalDisplayed"
    header="О проекте"
    modal
    dismissable-mask
    :draggable="false"
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
        :label="user?.email"
        icon="pi pi-user"
        @click="goToProfile"
      />
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RegisterModal from '../AuthModal.vue'
import { useUserStore } from '../../stores/user.js'

const isAboutModalDisplayed = ref(false)

const isRegisterModalDisplayed = ref(false)

const { user } = useUserStore()
const router = useRouter()

const goToProfile = () => {
  if (user.value) {
    router.push({ name: 'profile' })
  } else {
    isRegisterModalDisplayed.value = true
  }
}
</script>

<style scoped>

</style>
