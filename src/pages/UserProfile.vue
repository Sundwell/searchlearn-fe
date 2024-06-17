<template>
  <div class="max-w-5xl w-full mx-auto">
    <Card>
      <template #title>
        <div class="flex items-center gap-2">
          Профиль пользователя
          <Tag
            v-if="user.admin"
            value="Администратор"
            severity="danger"
          />
        </div>
      </template>

      <template #content>
        <div
          v-if="user"
          class="flex flex-col gap-y-2 mb-4"
        >
          <div><b>Email:</b> {{ user.email }}</div>
          <div><b>Аккаунт создан:</b> {{ user.createdAt }}</div>
        </div>
        <Button
          class="self-start"
          label="Выйти с аккаунта"
          size="small"
          icon="pi pi-sign-out"
          @click="logout"
        />

        <template v-if="user.admin">
          <Divider layout="horizontal" />
          <section class="grid grid-cols-5 rounded border px-4 shadow">
            <div class="flex flex-col col-span-2 border-r p-4">
              <h3 class="mb-4 text-center font-medium">
                Созданные тесты
              </h3>
            </div>
            <div class="flex flex-col col-span-3 p-4">
              <h3 class="mb-4 text-center font-medium">
                Управление
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <Button
                  size="small"
                  icon="pi pi-plus"
                  label="Добавить статью"
                  @click="$router.push({ name: 'article-create' })"
                />
                <Button
                  size="small"
                  icon="pi pi-plus"
                  label="Создать новый тест"
                  @click="$router.push({ name: 'test-create' })"
                />
                <Button
                  size="small"
                  icon="pi pi-users"
                  label="Пользователи"
                />
                <Button
                  size="small"
                  icon="pi pi-pencil"
                  label="Редактировать статью"
                />
                <Button
                  size="small"
                  icon="pi pi-pencil"
                  label="Редактировать тест"
                />
              </div>
            </div>
          </section>
        </template>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { api } from '../api/api.js'

const { user, setUser } = useUserStore()

const router = useRouter()

if (!user) {
  router.push({ name: 'home' })
}

const logout = () => {
  setUser(null)
  api.auth.logout()
  router.push({ name: 'home' })
}
</script>

<style scoped>

</style>
