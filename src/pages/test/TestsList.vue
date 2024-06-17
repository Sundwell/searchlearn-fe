<template>
  <div class="max-w-3xl w-full mx-auto">
    <Card>
      <template #title>
        <h1>Список тестов</h1>
      </template>

      <template #content>
        <DataTable :value="tests">
          <template #empty>
            Нет тестов
          </template>

          <Column
            header="Название"
            field="name"
          />
          <Column header="Теги">
            <template #body="{ data }">
              <div class="flex flex-wrap gap-2">
                <Tag
                  v-for="tag in data.tags"
                  :key="tag"
                  :value="`#${tag}`"
                />
              </div>
            </template>
          </Column>
          <Column
            header-class="w-20"
          >
            <template #body="{ data }">
              <div
                v-if="user"
                class="flex justify-end"
              >
                <Button
                  size="small"
                  label="Начать"
                  @click="$router.push({ name: 'test', params: { id: data.id } })"
                />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/user.js'
import { api } from '../../api/api.js'

const { user } = useUserStore()

const tests = ref([])

const fetchTests = () => {
  const data = api.tests.getAll()

  tests.value = data
}

fetchTests()
</script>

<style scoped>

</style>
