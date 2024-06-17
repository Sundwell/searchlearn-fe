import { createApp } from 'vue'
import './assets/main.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
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
    datatable: {
      emptyMessage: 'p-4',
      emptyMessageCell: 'text-center text-2xl font-medium',
    },
  },
  ptOptions: {
    mergeSections: true,
    mergeProps: false,
  },
})
app.use(ToastService)
app.use(router)

app.mount('#app')
