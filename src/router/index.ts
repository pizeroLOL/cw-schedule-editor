import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   component: () => import('@/view/HomeView.vue'),
    // },
    // {
    //   path: '/part',
    //   component: () => import('@/view/PartView.vue'),
    // },
    // {
    //   path: '/node',
    //   component: () => import('@/view/NodeView.vue'),
    // },
    // {
    //   path: '/naming',
    //   component: () => import('@/view/NamingView.vue'),
    // },
  ],
})

export default router
