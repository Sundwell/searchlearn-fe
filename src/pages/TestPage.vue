<template>
  <div class="max-w-xl w-full mx-auto">
    <Dialog
      v-model:visible="isResultsModalDisplayed"
      header="Результаты"
      modal
      class="max-w-lg w-full"
    >
      <div class="flex flex-col">
        <span class="text-medium text-lg mb-4">{{ test.name }}</span>
        <div class="flex flex-col gap-y-2">
          <p>Ваш результат: 2/3</p>
          <p>На основе анализа ваших ошибок рекомендуем ознакомиться с обучающими материалами:</p>
          <div class="flex flex-col gap-y-2">
            <a
              href="https://google.com"
              class="text-primary hover:underline"
            >
              1. Материал один
            </a>
            <a
              href="https://google.com"
              class="text-primary hover:underline"
            >
              2. Материал два
            </a>
          </div>
        </div>
      </div>

      <template #footer>
        <section class="w-full flex justify-between gap-x-2">
          <Button
            icon="pi pi-refresh"
            label="Пройти еще раз"
          />
          <Button label="К списку тестов" />
        </section>
      </template>
    </Dialog>
    <Card>
      <template #header>
        <div class="pb-2 pt-4 px-6 flex justify-between items-center">
          <span class="text-lg font-medium">
            {{ test.name }}
          </span>
          <span>
            {{ currentlyDisplayedCount }}/{{ totalQuestions }}
          </span>
        </div>
      </template>

      <template #content>
        <div class="grid gap-y-4">
          <Card
            v-for="(question, index) in currentQuestions"
            :key="question.id"
            class="shadow-none border"
            :pt="{
              body: 'py-0',
            }"
          >
            <template #title>
              <span class="text-base text-center">{{ question.questionIndex }}. {{ question.text }}</span>
            </template>

            <template #content>
              <div class="grid gap-y-1">
                <div
                  v-for="(option, optionIndex) in question.options"
                  :key="option.id"
                  class="flex align-items-center"
                >
                  <RadioButton
                    v-model="answers[question.id]"
                    :input-id="`option${question.id}${optionIndex}`"
                    name="test"
                    :value="option"
                  />
                  <label
                    :for="`option${question.id}${optionIndex}`"
                    class="ml-2"
                  >
                    {{ option }}
                  </label>
                </div>
              </div>
            </template>
          </Card>
        </div>
      </template>

      <template #footer>
        <section class="flex justify-between">
          <Button
            icon="pi pi-caret-left"
            :disabled="currentPage === 0"
            @click="currentPage--"
          />
          <Button
            label="Завершить тест"
            @click="isResultsModalDisplayed = true"
          />
          <Button
            icon="pi pi-caret-right"
            :disabled="currentPage === totalPages - 1"
            @click="currentPage++"
          />
        </section>
      </template>
    </Card>
  </div>
</template>

<script setup>
import {
  computed,
  ref,
} from 'vue'

const test = ref({
  id: 1,
  name: 'Название теста',
  questions: [
    {
      id: 1,
      text: 'How do you feel?',
      options: [
        'I am feel',
        'Not bad',
        'Not good',
        'More options?',
      ],
    },
    {
      id: 2,
      text: 'How do you feel about?',
      options: [
        'I am feel',
        'Not bad',
      ],
    },
    {
      id: 3,
      text: 'More questions?',
      options: [
        'No, thanks',
        'Yes, please',
        'More options?',
      ],
    },
  ],
})

test.value.questions.forEach((question, idx) => {
  question.questionIndex = idx + 1
})

const answers = ref(Object.fromEntries(test.value.questions.map(({ id }) => ([
  id,
  '',
]))))

const perPage = ref(1)

const currentPage = ref(0)

const totalQuestions = computed(() => {
  return test.value.questions.length
})

const currentQuestions = computed(() => {
  return test.value.questions.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1),
  )
})

const totalPages = computed(() => {
  return Math.ceil(totalQuestions.value / perPage.value)
})

const currentlyDisplayedCount = computed(() => {
  if (currentPage.value === totalPages.value - 1) {
    return totalQuestions.value
  }

  return perPage.value * (currentPage.value + 1)
})

const isResultsModalDisplayed = ref(false)
</script>

<style scoped>

</style>
