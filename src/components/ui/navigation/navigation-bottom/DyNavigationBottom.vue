<script setup lang="ts">
import DyNavigationBottomItem from './DyNavigationBottomItem.vue'
import { type DyNavigationBottomProps } from '.'
import { mdiMusicCircle, mdiPause, mdiPlay, mdiSkipBackward, mdiSkipForward } from '@mdi/js';

import { DyButton, DyIcon } from '@/components/ui'
import {
  Card,
  CardContent
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress';

const props = withDefaults(defineProps<DyNavigationBottomProps>(), {
  items: () => [],
  activeMenu: '',
  isMobile: false,
  duration: 1,
  timestamp: 0,
  title: '-',
  artist: '-',
  cover: undefined,
  isPlaying: false,
  hasPlayer: false,
  togglePlayer: () => {},
  handleClick: () => {}
})
</script>

<template>
  <div class="fixed bottom-0 left-0 z-50 w-full h-auto">
    <div class="w-100 h-50">
      <div class="max-w-md m-auto relative h-full">
        <div
          v-if="hasPlayer"
          class="px-2 pb-1 cursor-pointer"
        >
          <div>
            <Progress
              class="h-1 rounded-none rounded-tl rounded-tr"
              :model-value="timestamp ? timestamp : 0"
              :max="duration > 0 ? duration : 1"
            />
          </div>
          <Card
            class="rounded-none rounded-bl rounded-br"
            @click="handleClick"
          >
            <CardContent>
              <div class="grid grid-cols-2">
                <div class="flex gap-2 justify-start items-center">
                  <div
                    v-if="typeof cover !== 'undefined' && cover != ''"
                    class="rounded-lg w-12 h-12 bg-cover bg-center flex-none"
                    :style="{
                      backgroundImage: `url(${cover})`
                    }"
                  />
                  <div
                    v-else  
                    class="rounded-lg bg-gray-300 w-12 h-12 flex justify-center items-center flex-none"
                  >
                    <DyIcon :path="mdiMusicCircle" :size="24" />
                  </div>

                  <div class="pointer-events-none select-none">
                    <h4 class="text-xs font-semibold  overflow-hidden text-ellipsis line-clamp-1">{{ title || '-' }}</h4>
                    <p class="text-xs">{{ artist || '-' }}</p>
                  </div>
                </div>

                <div class="flex gap-1 justify-between items-center justify-self-end">
                  <dy-button
                    variant="outline"
                    size="icon"
                    class="rounded-lg"
                    disabled
                    @click.stop="() => {}"
                  >
                    <dy-icon :path="mdiSkipBackward" />
                  </dy-button>
                  
                  <dy-button
                    variant="outline"
                    size="icon"
                    class="rounded-lg"
                    @click.stop="togglePlayer"
                  >
                    <dy-icon :path="isPlaying ? mdiPause : mdiPlay" />
                  </dy-button>
                  
                  <dy-button
                    variant="outline"
                    size="icon"
                    class="rounded-lg"
                    disabled
                    @click.stop="() => {}"
                  >
                    <dy-icon :path="mdiSkipForward" />
                  </dy-button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div class="flex justify-center h-full max-w-lg mx-auto bg-card [&_svg]:size-5 border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <dy-navigation-bottom-item
            v-for="(navigator, index) in props.items.slice(0, 5)"
            :key="`dy-bnav-${index}`"
            :variant="activeMenu == navigator.name ? 'active' : 'default'"
            :icon="navigator.icon"
            :label="navigator.label"
            @click="() => (navigator.click ? navigator.click() : null)"
          />
        </div>
      </div>
    </div>
    <div class="w-100 h-4 bg-card" v-if="isMobile" />
  </div>
</template>
