<template>
  <Card
    class="flex-auto"
  >
    <template #title>
      <h1 class="text-center">
        {{ article.name }}
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

const article = ref({
  id: 1,
  name: 'Vue.js',
  content: '<p><strong>Основы информационного поиска</strong></p><p><br></p><h1><strong>Еще <em><u>немного</u></em> </strong><span class="ql-font-serif">текста</span><strong> разного, </strong></h1><ol><li>раз</li><li>два</li><li>три</li></ol>',
})
</script>

<style scoped>

</style>
