<script setup lang="ts">
import {
  type DyNavigationBottomItemProps,
  DyNavigationBottom,
  DyNavigationHeader,
} from '@/components/ui'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useMobile } from '@/hooks'
import {
  mdiCog, mdiDotsCircle,
  mdiHome,
  mdiMagnify
} from '@mdi/js'
import DyMobileWrapper from './components/layouts/DyMobileWrapper.vue'

import { useRouter } from 'vue-router'

import { useMusicPlayer } from '@/stores/useMusicPlayerStore'
import { useDialogStore } from '@/stores/useDialog'
import { storeToRefs } from 'pinia'
import DyButton from './components/ui/button/DyButton.vue'
import DyIcon from './components/ui/icon/DyIcon.vue'
import { Toaster } from '@/components/ui/sonner'

import 'vue-sonner/style.css'

const router = useRouter()
const isMobile = useMobile()
const playerStore = useMusicPlayer()
const dialogStore = useDialogStore()

const { playing } = storeToRefs(playerStore)
const { isOpen, content } = storeToRefs(dialogStore)


const navigators: DyNavigationBottomItemProps[] = [
  {
    label: 'Library',
    name: 'library',
    icon: mdiHome,
    variant: 'active',
    click: () => router.replace('/'),
  },
  {
    label: 'Search',
    name: 'search',
    icon: mdiMagnify,
    click: () => {},
  },
  {
    label: 'Config',
    name: 'configs',
    icon: mdiCog,
    variant: 'default',
    click: () => router.replace('/configs'),
  }
]
</script>

<template>
  <Toaster />
  <Dialog :open="isOpen" @update:open="dialogStore.toggle">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {{ content?.title }}
        </DialogTitle>
        <DialogDescription>
          {{ content?.contents }}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="w-full flex justify-between">
        <dy-button
          variant="link"
          v-if="content?.actions?.negative"
          @click="
            () =>
              content?.actions?.negative?.onClick
                ? content?.actions?.negative?.onClick()
                : dialogStore.toggle()
          "
          :disabled="content?.actions?.negative?.isDisabled"
        >
          {{ content?.actions?.negative?.label }}
          <dy-icon v-if="content?.actions?.negative?.isLoading" :path="mdiDotsCircle" spin />
        </dy-button>
        <dy-button
          variant="default"
          v-if="content?.actions?.positive"
          @click="
            () =>
              content?.actions?.positive?.onClick
                ? content?.actions?.positive?.onClick()
                : dialogStore.toggle()
          "
          :disabled="content?.actions?.positive?.isDisabled"
        >
          {{ content?.actions?.positive?.label }}
          <dy-icon v-if="content?.actions?.positive?.isLoading" :path="mdiDotsCircle" spin />
        </dy-button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <dy-mobile-wrapper>
    <dy-navigation-header
      variant="default"
      :is-center-title="false"
      :left-control="
        $route.meta.navigation && $route.meta.navigation.left
          ? {
              icon: $route.meta.navigation.left.icon,
              onClick: $route.meta.navigation.left.route
                ? () => router.push($route.meta.navigation?.left?.route ?? '')
                : undefined,
            }
          : undefined
      "
      :right-control="
        $route.meta.navigation && $route.meta.navigation.right
          ? {
              icon: $route.meta.navigation.right.icon,
              onClick: $route.meta.navigation.right.route
                ? () => router.push($route.meta.navigation?.right?.route ?? '')
                : undefined,
            }
          : undefined
      "
      :title="String($route.meta.title ?? '')"
    />
    <router-view v-slot="{ Component }">
      <!-- Use a dynamic name for per-route transitions or a static name for all routes -->
      <transition :name="'fade'" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <div class="w-100" :class="{ 'h-20': !isMobile, 'h-24': isMobile }" />
  </dy-mobile-wrapper>
  <dy-navigation-bottom
    v-if="$route.meta.fullscreen ? false : true"
    :active-menu="$route.name ? String($route.name) : undefined"
    :items="navigators"
    :is-mobile="isMobile"
    :is-playing="playing.state"
    :title="playing.data.title"
    :artist="playing.data.artist"
    :cover="playing.data.cover"
    :duration="playing.duration"
    :timestamp="playing.timestamp"
    :has-player="$route.name != 'player'"
    :toggle-player="() => playerStore.toggle()"
    :handle-click="() => router.push('/player')"
  />
</template>
