<script setup lang="ts">
import DyNavigationBottomItem from './DyNavigationBottomItem.vue'
import { type DyNavigationBottomProps } from '.'

const props = withDefaults(defineProps<DyNavigationBottomProps>(), {
  items: () => [],
  isMobile: false,
})
</script>

<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full h-auto border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600"
  >
    <div class="w-100 h-16">
      <div class="max-w-md m-auto relative h-full">
        <div class="grid grid-cols-5 h-full max-w-lg mx-auto bg-card [&_svg]:size-5">
          <dy-navigation-bottom-item
            v-for="(navigator, index) in props.items.slice(0, 5)"
            :key="`dy-bnav-${index}`"
            :variant="navigator.variant"
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
