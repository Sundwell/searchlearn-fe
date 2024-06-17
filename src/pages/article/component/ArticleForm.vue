<template>
  <Card>
    <template #title>
      <h1 class="text-center">
        {{ isEditing ? 'Редактирование статьи' : 'Новая статья' }}
      </h1>
    </template>

    <template #content>
      <div class="grid grid-cols-5 gap-x-4 items-start">
        <section class="grid items-start gap-y-4">
          <section class="grid gap-y-2">
            <label for="title">Заголовок</label>
            <InputText
              id="title"
              v-model="form.title"
              placeholder="Заголовок..."
            />
          </section>
          <section class="grid gap-y-2">
            <label for="tags">Теги</label>
            <Chips
              id="tags"
              v-model="form.tags"
              :allow-duplicate="false"
              :pt="{
                container: 'w-full',
              }"
              placeholder="Теги..."
            />
          </section>
        </section>
        <Editor
          v-model="form.content"
          class="col-span-4"
          editor-style="height: 32rem"
        />
      </div>
    </template>

    <template #footer>
      <div class="flex gap-x-2 justify-end">
        <Button
          label="Назад"
          severity="secondary"
          @click="$router.push({ name: 'articles' })"
        />
        <Button
          :label="isEditing ? 'Сохранить' : 'Создать'"
          @click="submit"
        />
      </div>
    </template>
  </Card>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../../api/api.js'

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
})

const isEditing = computed(() => {
  return !!props.id
})

const form = ref({
  content: '',
  title: '',
  tags: [],
})

const loadArticle = () => {
  const article = api.articles.get(props.id)

  form.value.content = article.content
  form.value.title = article.title
  form.value.tags = article.tags
}

if (isEditing.value) {
  loadArticle()
}

const updateArticle = () => {
  api.articles.update(props.id, form.value)
}

const createArticle = () => {
  api.articles.create(form.value)
}

const router = useRouter()

const submit = () => {
  if (isEditing.value) {
    updateArticle()
  } else {
    createArticle()
  }

  router.push({ name: 'articles' })
}
</script>
