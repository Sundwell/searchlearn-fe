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
              <div class="flex flex-col gap-y-4">
                <div
                  v-for="test in createdTests"
                  :key="test.id"
                  class="flex flex-col gap-y-2 rounded border-2 bg-primary-50 p-4"
                >
                  <span class="font-bold text-xl mb-2">Название: {{ test.name }}</span>
                  <span class="font-medium">Кол-во вопросов: {{ test.questions.length }}</span>
                  <span class="font-medium">Теги: {{ test.tags.join(', ') }}</span>
                </div>
              </div>
            </div>
            <div class="flex flex-col col-span-3 p-4">
              <h3 class="mb-4 text-center font-medium">
                Управление
              </h3>
              <div
                class="grid grid-cols-2 gap-4 mb-4"
              >
                <template v-if="currentTab === MAIN_TAB">
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
                    @click="currentTab = USERS_TAB"
                  />
                  <Button
                    size="small"
                    icon="pi pi-pencil"
                    label="Редактировать статью"
                    @click="currentTab = EDIT_ARTICLES_TAB"
                  />
                  <Button
                    size="small"
                    icon="pi pi-pencil"
                    label="Редактировать тест"
                    @click="currentTab = EDIT_TESTS_TAB"
                  />
                </template>
                <Button
                  v-else
                  label="Назад"
                  icon="pi pi-caret-left"
                  size="small"
                  class="self-start justify-self-start"
                  @click="currentTab = MAIN_TAB"
                />
              </div>
              <div v-if="currentTab === EDIT_ARTICLES_TAB">
                <DataTable :value="articles">
                  <template #empty>
                    Нет статей
                  </template>

                  <Column
                    header="Заголовок"
                    field="title"
                  />
                  <Column header-class="w-32">
                    <template #body="{ data }">
                      <Button
                        size="small"
                        icon="pi pi-pencil"
                        label="Редактировать"
                        @click="$router.push({ name: 'article-edit', params: { id: data.id } })"
                      />
                    </template>
                  </Column>
                </DataTable>
              </div>
              <div v-else-if="currentTab === EDIT_TESTS_TAB">
                <DataTable :value="tests">
                  <template #empty>
                    Нет тестов
                  </template>

                  <Column
                    header="Название"
                    field="name"
                  />
                  <Column header-class="w-40">
                    <template #body="{ data }">
                      <Button
                        size="small"
                        icon="pi pi-pencil"
                        label="Редактировать"
                        @click="$router.push({ name: 'test-edit', params: { id: data.id } })"
                      />
                    </template>
                  </Column>
                </DataTable>
              </div>
              <div v-else-if="currentTab === USERS_TAB">
                <DataTable :value="users">
                  <template #empty>
                    Нет пользователей
                  </template>

                  <Column
                    header="Email"
                    field="email"
                  />
                  <Column
                    header="Администратор"
                    header-class="w-32"
                  >
                    <template #body="{ data }">
                      <Checkbox
                        :model-value="data.admin"
                        binary
                        @click="toggleAdminForUser(data)"
                      />
                    </template>
                  </Column>
                </DataTable>
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
import { ref } from 'vue'
import { useUserStore } from '../stores/user.js'
import { api } from '../api/api.js'

const { user, setUser } = useUserStore()

const router = useRouter()

if (!user) {
  router.push({ name: 'home' })
}

const createdTests = ref([])

const loadCreatedTests = () => {
  const data = api.tests.getAll({ userId: user.value.id })

  createdTests.value = data
}

if (user.value.admin) {
  loadCreatedTests()
}

const logout = () => {
  setUser(null)
  api.auth.logout()
  router.push({ name: 'home' })
}

const MAIN_TAB = 0
const EDIT_ARTICLES_TAB = 1
const EDIT_TESTS_TAB = 2
const USERS_TAB = 3

const currentTab = ref(MAIN_TAB)

const articles = ref([])

const loadArticles = () => {
  const data = api.articles.getAll()

  articles.value = data
}

const tests = ref([])

const loadTests = () => {
  const data = api.tests.getAll()

  tests.value = data
}

const users = ref([])

const loadUsers = () => {
  const data = api.auth.getAllUsers()

  users.value = data
}

if (user.value.admin) {
  loadArticles()
  loadTests()
  loadUsers()
}

const toggleAdminForUser = (user) => {
  api.auth.patch(user.id, {
    admin: !user.admin,
  })
  loadUsers()
}
</script>

<style scoped>

</style>
