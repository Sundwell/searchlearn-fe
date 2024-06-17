<template>
  <div class="max-w-xl w-full mx-auto">
    <Card>
      <template #title>
        <h1>Статьи</h1>
      </template>

      <template #content>
        <DataTable :value="articles">
          <template #empty>
            Нет статей
          </template>

          <Column
            header="Название"
            field="title"
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
import { api } from '../../api/api.js'

const articles = ref([])

const fetchArticles = async () => {
  const data = api.articles.getAll()
  articles.value = data
}

fetchArticles()
</script>

<style scoped>

</style>
