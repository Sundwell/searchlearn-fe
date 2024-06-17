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
    component: () => import('./pages/test/TestsList.vue'),
  },
  {
    path: '/tests/:id',
    name: 'test',
    component: () => import('./pages/test/TestPage.vue'),
  },
  {
    path: '/tests/create',
    name: 'test-create',
    component: () => import('./pages/test/TestCreate.vue'),
  },
  {
    path: '/tests/:id/edit',
    name: 'test-edit',
    component: () => import('./pages/test/TestEdit.vue'),
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
    path: '/articles/edit/:id',
    name: 'article-edit',
    component: () => import('./pages/article/ArticleEdit.vue'),
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
