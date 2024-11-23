import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
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
      children: [
        {
          path: ':nameOrId',
          name: 'pokeinfo',
          component: () => import('@/views/PokelistView/PokeInfo.vue'),
          props: route => ({ nameOrId: route.params.nameOrId })
          
        }
      ]
    }
  ]
})

export default router
