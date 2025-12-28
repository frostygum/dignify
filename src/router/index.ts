import { mdiChevronDown, mdiChevronLeft, mdiCog, mdiDotsVertical } from '@mdi/js'
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
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: 'Home',
        layout: 'MobileViewUserLayout',
        navigation: {
          right: {
            icon: mdiCog,
            route: '/configurations',
          },
        },
      },
    },
    {
      path: '/player',
      name: 'player',
      component: () => import('../views/MusicPlayerView.vue'),
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
      path: '/configurations',
      name: 'configurations',
      component: () => import('../views/ConfigView.vue'),
      meta: {
        title: 'Configurations',
        layout: 'MobileViewUserLayout',
      },
    },
    {
      path: '/play',
      name: 'Playground',
      component: () => import('../views/PlaygroundView.vue'),
      meta: {
        title: 'Playground',
        layout: 'MobileViewUserLayout',
        fullscreen: true,
        navigation: {
          left: {
            icon: mdiChevronLeft,
            route: '/configurations',
          }
        },
      },
    },
  ],
})
