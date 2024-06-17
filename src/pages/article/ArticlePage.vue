<template>
  <Card
    v-if="article"
    class="flex-auto"
  >
    <template #title>
      <h1 class="text-center">
        {{ article.title }}
      </h1>
    </template>

    <template #content>
      <Editor
        v-model="article.content"
        editor-style="height: 32rem"
        readonly
        :pt="{
          toolbar: 'hidden',
          content: '!border-t !border-solid !border-t-[#e5e7eb]',
        }"
      />
    </template>

    <template #footer>
      <div class="flex justify-end">
        <Button
          label="Назад"
          @click="$router.push({ name: 'articles' })"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../../api/api.js'

const route = useRoute()

const article = ref()

const fetchArticle = () => {
  const data = api.articles.getOne(route.params.id)

  article.value = data
}

fetchArticle()
</script>

<style scoped>

</style>
