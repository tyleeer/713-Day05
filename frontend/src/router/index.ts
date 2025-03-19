import { createRouter, createWebHistory } from 'vue-router'
// import nProgress from 'nProgress'
import { useEventStore } from '@/stores/event'
import eventService from '@/services/EventService'
import { useAuthStore } from '@/stores/auth'

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
      path: '/participants',
      name: 'participant-list-view',
      component: () => import('../views/ParticipantListView.vue'),
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
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: () => import('../views/event/LayoutView.vue'),
      props: true,
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return eventService
          .getEvent(id)
          .then((response) => {
            // need to setup the data for the event
            eventStore.setEvent(response.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'event' },
              }
            } else {
              return { name: 'network-error-view' }
            }
          })
      },
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
          beforeEnter: () => {
            const authStore = useAuthStore()
            if (!authStore.isAdmin) {
              return { name: '404-resource-view', params: { resource: 'you are not allowed to access' } }
            }
          }
        },
      ]
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },

})

// router.beforeEach(() => {
//   nProgress.start()
// })

// router.afterEach(() => {
//   nProgress.done()
// })

export default router
