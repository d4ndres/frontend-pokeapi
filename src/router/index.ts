import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokelist',
      name: 'pokelist',
      component: () => import('@/views/PokelistView.vue'),
      redirect: to => '/pokelist/all',
      children: [
        {
          path: 'all',
          name: 'all',
          component: () => import('@/views/PokelistView/AllView.vue')
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: () => import('@/views/PokelistView/FavoritesView.vue')
        },
      ]
    }
  ]
})

export default router
