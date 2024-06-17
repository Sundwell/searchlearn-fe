<template>
  <div
    v-if="test"
    class="max-w-xl w-full mx-auto"
  >
    <Dialog
      v-model:visible="isResultsModalDisplayed"
      header="Результаты"
      modal
      class="max-w-lg w-full"
    >
      <div class="flex flex-col">
        <span class="text-medium text-lg mb-4">{{ test.name }}</span>
        <div class="flex flex-col gap-y-2">
          <p>Ваш результат: {{ results.correctCount }}/{{ totalQuestions }}</p>

          <template v-if="results.correctCount === totalQuestions">
            <p>
              Отличный результат! Можете пройти еще тестов нажав <RouterLink
                class="text-primary hover:underline"
                :to="{ name: 'tests' }"
              >
                сюда
              </RouterLink>
            </p>
          </template>
          <template v-else>
            <p>На основе анализа ваших ошибок рекомендуем ознакомиться с обучающими материалами:</p>
            <div class="flex flex-col gap-y-2">
              <a
                v-for="(suggestion, index) in results.suggestions"
                :key="suggestion.id"
                :href="$router.resolve({ name: 'article', params: { id: suggestion.id } }).href"
                class="text-primary hover:underline"
                target="_blank"
              >
                {{ index + 1 }}. {{ suggestion.title }}
              </a>
            </div>
          </template>
        </div>
      </div>

      <template #footer>
        <section class="w-full flex justify-between gap-x-2">
          <Button
            icon="pi pi-refresh"
            label="Пройти еще раз"
            @click="startAgain"
          />
          <Button
            label="К списку тестов"
            @click="$router.push({ name: 'tests' })"
          />
        </section>
      </template>
    </Dialog>
    <Card>
      <template #header>
        <div class="flex flex-col">
          <div class="mb-2 pt-4 px-6 flex justify-between items-center">
            <span class="text-lg font-medium">
              {{ test.name }}
            </span>
            <span>
              {{ currentlyDisplayedCount }}/{{ totalQuestions }}
            </span>
          </div>
          <div class="flex flex-wrap gap-2 px-6 pb-2">
            <Tag
              v-for="tag in test.tags"
              :key="tag"
              :value="`#${tag}`"
            />
          </div>
        </div>
      </template>

      <template #content>
        <div class="grid gap-y-4">
          <Card
            v-for="question in currentQuestions"
            :key="question.id"
            class="shadow-none border"
            :pt="{
              body: 'py-0',
            }"
          >
            <template #title>
              <span class="text-base text-center">{{ question.questionIndex }}. {{ question.title }}</span>
            </template>

            <template #content>
              <div class="grid gap-y-1">
                <div
                  v-for="(answer, answerIndex) in question.answers"
                  :key="answer.id"
                  class="flex items-center"
                >
                  <RadioButton
                    v-model="answers[question.id]"
                    :input-id="`option${question.id}${answerIndex}`"
                    name="test"
                    :value="answer.id"
                  />
                  <label
                    :for="`option${question.id}${answerIndex}`"
                    class="ml-2"
                  >
                    {{ answer.text }}
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
            :disabled="!isAnswersFilled"
            @click="finishTest"
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
import { useRoute } from 'vue-router'
import { api } from '../../api/api.js'

const test = ref()

const route = useRoute()

const answers = ref({})

const loadTest = () => {
  const data = api.tests.getOne(route.params.id)

  data.questions.forEach((question, idx) => {
    question.questionIndex = idx + 1
  })

  test.value = data
}

loadTest()

const perPage = 5

const currentPage = ref(0)

const totalQuestions = computed(() => {
  return test.value?.questions?.length
})

const currentQuestions = computed(() => {
  return test.value?.questions?.slice(
    perPage * currentPage.value,
    perPage * (currentPage.value + 1),
  )
})

const isAnswersFilled = computed(() => {
  return Object.keys(answers.value).length === totalQuestions.value
})

const totalPages = computed(() => {
  return Math.ceil(totalQuestions.value / perPage)
})

const currentlyDisplayedCount = computed(() => {
  if (currentPage.value === totalPages.value - 1) {
    return totalQuestions.value
  }

  return perPage * (currentPage.value + 1)
})

const isResultsModalDisplayed = ref(false)

const results = ref({
  correctCount: 0,
  suggestions: [],
})

const finishTest = () => {
  const {
    correctCount,
    suggestions,
  } = api.tests.passTest(test.value.id, answers.value)

  results.value.correctCount = correctCount
  results.value.suggestions = suggestions

  isResultsModalDisplayed.value = true
}

const startAgain = () => {
  answers.value = {}
  currentPage.value = 0
  isResultsModalDisplayed.value = false
}
</script>

<style scoped>

</style>
