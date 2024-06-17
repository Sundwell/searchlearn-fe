<template>
  <Card>
    <template #title>
      <h1 class="text-center">
        {{ isEditing ? 'Редактирование теста' : 'Новый тест' }}
      </h1>
    </template>

    <template #content>
      <div class="grid grid-cols-5 gap-x-4 items-start">
        <section class="grid items-start gap-y-4 sticky top-12">
          <section class="grid gap-y-2">
            <label for="name">Название</label>
            <InputText
              id="name"
              v-model="form.name"
              placeholder="Название..."
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
        <section class="grid grid-cols-2 col-span-4 gap-4">
          <div
            v-for="(question, index) in form.questions"
            :key="question.id"
            class="rounded border-2 shadow p-4 flex flex-col"
          >
            <section class="flex justify-between items-center mb-4">
              <span class="text-lg">Вопрос №{{ index + 1 }}</span>
              <Button
                v-if="form.questions.length > 1"
                label="Удалить вопрос"
                icon="pi pi-trash"
                severity="danger"
                size="small"
                @click="form.questions.splice(index, 1)"
              />
            </section>
            <InputText
              v-model="form.questions[index].title"
              placeholder="Заголовок"
              class="mb-4"
            />
            <span class="mb-2">Ответы</span>
            <section class="flex flex-col gap-y-1">
              <div
                v-for="(answer, answerIndex) in question.answers"
                :key="answer.id"
                class="flex gap-x-2 items-center"
              >
                <RadioButton
                  v-model="form.questions[index].correctAnswer"
                  :value="answer.id"
                  :name="`answerFor${question.id}`"
                />
                <InputText
                  v-model="form.questions[index].answers[answerIndex].text"
                  size="small"
                  class="flex-auto"
                />
                <Button
                  v-if="form.questions[index].answers.length > 2"
                  icon="pi pi-trash"
                  rounded
                  severity="danger"
                  @click="removeAnswer(index, answerIndex)"
                />
              </div>
              <div class="flex flex-col gap-y-1 mt-2">
                <label>
                  Теги
                </label>
                <Chips
                  v-model="form.questions[index].tags"
                  :allow-duplicate="false"
                  :pt="{
                    container: 'w-full',
                  }"
                />
              </div>
              <div
                class="mt-2 h-14 rounded flex items-center justify-center w-full bg-primary-50 hover:bg-primary-100 cursor-pointer border"
                @click="addAnswer(index)"
              >
                <Button
                  icon="pi pi-plus"
                  rounded
                />
              </div>
            </section>
          </div>
          <div
            class="rounded border bg-primary-50 hover:bg-primary-100 cursor-pointer p-2 flex items-center justify-center min-h-40"
            @click="addQuestion"
          >
            <Button
              icon="pi pi-plus"
              rounded
            />
          </div>
        </section>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-x-2 justify-end">
        <Button
          label="Назад"
          severity="secondary"
          @click="$router.push({ name: 'profile' })"
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
import { useUserStore } from '../../../stores/user.js'

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
  name: '',
  tags: [],
  questions: [],
})

const generateEmptyAnswer = () => ({
  id: crypto.randomUUID(),
  text: '',
})

const addAnswer = (index) => {
  form.value.questions[index].answers.push(generateEmptyAnswer())
}

const generateQuestion = () => ({
  id: crypto.randomUUID(),
  title: '',
  answers: [
    generateEmptyAnswer(),
    generateEmptyAnswer(),
  ],
  correctAnswer: null,
  tags: [],
})

const addQuestion = () => {
  form.value.questions.push(generateQuestion())
}

const removeAnswer = (index, answerIndex) => {
  form.value.questions[index].answers.splice(answerIndex, 1)
}

const loadTest = () => {
  const test = api.tests.getOneForEdit(props.id)

  form.value.name = test.name
  form.value.tags = test.tags
  form.value.questions = test.questions
}

if (isEditing.value) {
  loadTest()
} else {
  form.value.questions.push(generateQuestion())
}

const updateTest = () => {
  api.tests.update(props.id, form.value)
}

const { user } = useUserStore()

const createTest = () => {
  api.tests.create(form.value, user.id)
}

const router = useRouter()

const submit = () => {
  if (isEditing.value) {
    updateTest()
  } else {
    createTest()
  }

  router.push({ name: 'tests' })
}
</script>
