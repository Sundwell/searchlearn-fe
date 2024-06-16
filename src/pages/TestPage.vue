<template>
  <div class="max-w-xl w-full mx-auto">
    <Card>
      <template #header>
        <div class="relative">
          <span class="absolute top-2 right-2">
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
          <Button label="Завершить тест" />
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
</script>

<style scoped>

</style>
