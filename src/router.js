import {
  createRouter,
  createWebHistory,
} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/HomePage.vue'),
  },
  {
    path: '/tests',
    name: 'tests',
    component: () => import('./pages/TestsList.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }
