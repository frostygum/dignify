import { mdiChevronDown, mdiChevronLeft, mdiDotsVertical, mdiMagnify } from '@mdi/js'
import { createRouter, createWebHistory } from 'vue-router'

interface RouteMetaNavigationItem {
  icon?: string
  route?: string
}

interface RouteMetaNavigation {
  left?: RouteMetaNavigationItem
  right?: RouteMetaNavigationItem
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    layout?: string
    navigation?: RouteMetaNavigation
  }
}

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'library',
      component: () => import('../views/LibraryView.vue'),
      meta: {
        title: 'Library',
        layout: 'MobileViewUserLayout',
        navigation: {
          right: {
            icon: mdiMagnify,
          },
        },
      },
    },
    {
      path: '/player',
      name: 'player',
      component: () => import('../views/PlayerView.vue'),
      meta: {
        layout: 'MobileViewUserLayout',
        navigation: {
          left: {
            icon: mdiChevronDown,
            route: '/configurations',
          },
          right: {
            icon: mdiDotsVertical,
            route: '/configurations',
          },
        },
      },
    },
    {
      path: '/configs',
      name: 'configs',
      component: () => import('../views/ConfigView.vue'),
      meta: {
        title: 'Configurations',
        layout: 'MobileViewUserLayout',
      },
    },
    {
      path: '/playground',
      name: 'Playground',
      component: () => import('../views/PlaygroundView.vue'),
      meta: {
        title: 'Playground',
        layout: 'MobileViewUserLayout',
        fullscreen: true,
        navigation: {
          left: {
            icon: mdiChevronLeft,
            route: '/configs',
          }
        },
      },
    },
  ],
})
