import { createRouter, createWebHistory } from 'vue-router'
import nProgress from 'nProgress'

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
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: () => import('../views/event/LayoutView.vue'),
      props: true,
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: () => import('../views/event/DetailView.vue'),
          props: true,
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: () => import('../views/event/RegisterView.vue'),
          props: true,
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: () => import('../views/event/EditView.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: () => import('../views/NetworkErrorView.vue'),
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: () => import('../views/NotFoundView.vue'),
      props: true,
    }

  ],
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
