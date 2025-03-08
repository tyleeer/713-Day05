import { createRouter, createWebHistory } from 'vue-router'
// import EventListView from '../views/EventListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: () => import('../views/EventListView.vue'),
      props: (route) => ({
        page: parseInt(route.query.page as string) || 1,
      }),
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
      path: '/event/:id',
      name: 'event-detail-view',
      component: import('../views/EventDetailView.vue'),
      props: true,
    }
  ],
})

export default router
