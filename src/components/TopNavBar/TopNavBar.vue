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

  <Dialog
    v-model:visible="isRegisterModalDisplayed"
    header="Введите данные для регистрации"
    modal
    class="max-w-lg w-full"
  >
    <section class="grid gap-y-4">
      <section class="grid gap-y-2">
        <label for="email">Email</label>
        <InputText
          id="email"
          type="email"
          placeholder="example@mail.com"
        />
      </section>
      <section class="grid gap-y-2">
        <label for="password">Пароль</label>
        <Password
          id="password"
          placeholder="****"
          toggle-mask
          :feedback="false"
        />
      </section>
      <section class="grid gap-y-2">
        <label for="password-confirmation">Подтверждение пароля</label>
        <Password
          id="password-confirmation"
          placeholder="****"
          toggle-mask
          :feedback="false"
        />
      </section>
    </section>

    <template #footer>
      <Button label="Регистрация" />
    </template>
  </Dialog>

  <section class="flex items-center justify-between py-4">
    <RouterLink :to="{ name: 'home' }">
      <img
        src="./img/logo.svg"
        alt="logo"
      >
    </RouterLink>

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
        />
        <Button
          rounded
          raised
          class="uppercase"
          label="Статьи"
        />
      </section>
      <Button
        rounded
        raised
        icon="pi pi-user"
      />
    </section>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const isAboutModalDisplayed = ref(false)

const isRegisterModalDisplayed = ref(false)
</script>

<style scoped>

</style>
