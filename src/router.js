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
  {
    path: '/tests/:id',
    name: 'test',
    component: () => import('./pages/TestPage.vue'),
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('./pages/article/ArticlesList.vue'),
  },
  {
    path: '/articles/:id',
    name: 'article',
    component: () => import('./pages/article/ArticlePage.vue'),
  },
  {
    path: '/articles/create',
    name: 'article-create',
    component: () => import('./pages/article/ArticleCreate.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('./pages/UserProfile.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }
