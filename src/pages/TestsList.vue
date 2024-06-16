<template>
  <div class="max-w-xl w-full mx-auto">
    <Card>
      <template #title>
        <h1>Список тестов</h1>
      </template>

      <template #content>
        <DataTable :value="tests">
          <Column
            header="Название"
            field="name"
          />
          <Column
            header-class="w-20"
          >
            <template #body>
              <div class="flex justify-end">
                <Button
                  size="small"
                  label="Начать"
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

const tests = ref([
  {
    id: 1,
    name: 'Тест 1',
  },
  {
    id: 2,
    name: 'Тест 2',
  },
  {
    id: 3,
    name: 'Тест 3',
  },
  {
    id: 4,
    name: 'Длинное название теста, lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
  },
])
</script>

<style scoped>

</style>
