<template>
  <Dialog
    v-model:visible="isVisible"
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
</template>

<script setup>
const isVisible = defineModel('isVisible', false)
</script>

<style scoped>

</style>
