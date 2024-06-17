<template>
  <Dialog
    v-model:visible="isVisible"
    :header="isLogin ? 'Вход в аккаунт' : 'Введите данные для регистрации'"
    modal
    :draggable="false"
    dismissable-mask
    class="max-w-lg w-full"
  >
    <section class="grid gap-y-4">
      <section class="grid gap-y-2">
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model="form.email"
          type="email"
          placeholder="example@mail.com"
        />
      </section>
      <section class="grid gap-y-2">
        <label for="password">Пароль</label>
        <Password
          v-model="form.password"
          input-id="password"
          placeholder="****"
          toggle-mask
          :feedback="false"
        />
      </section>
      <section
        v-if="!isLogin"
        class="grid gap-y-2"
      >
        <label for="password-confirmation">Подтверждение пароля</label>
        <Password
          v-model="form.passwordConfirmation"
          input-id="password-confirmation"
          placeholder="****"
          toggle-mask
          :feedback="false"
        />
      </section>
      <section
        v-if="!isLogin"
        class="flex gap-x-2 items-center"
      >
        <Checkbox
          v-model="form.admin"
          input-id="admin"
          binary
        />
        <label for="admin">Вы администратор?</label>
      </section>
      <div>
        <Button
          size="small"
          link
          :label="isLogin ? 'Регистрация' : 'Вход а аккаунт'"
          @click="isLogin = !isLogin"
        />
      </div>
    </section>

    <template #footer>
      <Button
        :label="isLogin ? 'Войти' : 'Регистрация'"
        @click="submit"
      />
    </template>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '../stores/user.js'
import { api } from '../api/api.js'

const form = ref({
  email: '',
  password: '',
  passwordConfirmation: '',
  admin: false,
})

const isLogin = ref(false)

const { add } = useToast()

const isVisible = defineModel('isVisible', {
  default: false,
})

const { setUser } = useUserStore()

const register = () => {
  const user = api.auth.register({
    email: form.value.email,
    password: form.value.password,
    admin: form.value.admin,
  })

  if (user) {
    setUser(user)
    isVisible.value = false
  } else {
    add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Такой пользователь уже существует',
      life: 3000,
    })
  }
}

const login = () => {
  const user = api.auth.login({
    email: form.value.email,
    password: form.value.password,
  })

  if (user) {
    setUser(user)
    isVisible.value = false
  } else {
    add({
      severity: 'error',
      summary: 'Ошибка',
      detail: 'Неверный логин или пароль',
      life: 3000,
    })
  }
}

const submit = () => {
  if (isLogin.value) {
    login()
  } else {
    register()
  }
}
</script>

<style scoped>

</style>
