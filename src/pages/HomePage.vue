<template>
  <div class="grid grid-cols-2 items-center gap-x-8">
    <AuthModal v-model:is-visible="isAuthModalDisplayed" />
    <section class="max-w-xl">
      <h1 class="mb-12 font-bold text-4xl">
        Изучай информационный поиск <span class="text-primary">онлайн</span>
      </h1>
      <p class="mb-12">
        Сегодня информационный поиск является неотъемлемой частью нашей жизни, начните учиться правильно и быстро находить необходимую вам информацию уже сейчас.
      </p>
      <Button
        label="Начать бесплатно"
        @click="isAuthModalDisplayed = true"
      />
    </section>
    <section class="max-w-xl">
      <ul class="sl-list list-disc text-2xl font-medium flex flex-col gap-y-4">
        <li>
          Тестирование
        </li>
        <li>
          Обучающие материалы
        </li>
        <li>
          Система рекомендаций
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AuthModal from '../components/AuthModal.vue'

const isAuthModalDisplayed = ref(false)
</script>

<style scoped>
.sl-list > li::marker {
  @apply text-primary;
}
</style>
