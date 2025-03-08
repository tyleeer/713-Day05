import { createRouter, createWebHistory } from 'vue-router'
// import EventListView from '../views/EventListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: () => import('../views/EventListView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/event/12',
      name: 'event-detail-views',
      component: import('../views/EventDetailView.vue'),
    }
  ],
})

export default router
