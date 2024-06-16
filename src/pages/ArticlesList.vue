<template>
  <div class="max-w-xl w-full mx-auto">
    <Card>
      <template #title>
        <h1>Статьи</h1>
      </template>

      <template #content>
        <DataTable :value="articles">
          <Column
            header="Название"
            field="name"
          />
          <Column
            header-class="w-20"
          >
            <template #body="{ data }">
              <div class="flex justify-end">
                <Button
                  size="small"
                  label="Читать"
                  @click="$router.push({ name: 'article', params: { id: data.id } })"
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

const articles = ref([
  {
    id: 1,
    name: 'Статья 1',
  },
  {
    id: 2,
    name: 'Статья 2',
  },
  {
    id: 3,
    name: 'Статья 3',
  },
  {
    id: 4,
    name: 'Длинное название статьи, lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ',
  },
])
</script>

<style scoped>

</style>
