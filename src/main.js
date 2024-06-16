import { createApp } from 'vue'
import './assets/main.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.use(PrimeVue, {
  ripple: true,
  pt: {
    password: {
      input: {
        root: 'w-full',
      },
    },
  },
  ptOptions: {
    mergeSections: true,
    mergeProps: false,
  },
})
app.use(router)

app.mount('#app')
