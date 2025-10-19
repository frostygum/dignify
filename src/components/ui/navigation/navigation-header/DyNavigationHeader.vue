<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

import {
  dyNavigationHeaderTextVariants,
  type DyNavigationHeaderVariants,
  dyNavigationHeaderVariants,
} from '.'

import { type DyNavigationHeaderItemProps } from './DyNavigationHeaderItem.vue'

import DyNavigationHeaderItem from './DyNavigationHeaderItem.vue'

export interface DyNavigationHeaderProps {
  variant?: DyNavigationHeaderVariants['variant']
  leftControl?: DyNavigationHeaderItemProps
  rightControl?: DyNavigationHeaderItemProps
  isCenterTitle?: boolean
  title?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<DyNavigationHeaderProps>(), {
  isCenterTitle: false,
  title: '',
})
</script>

<template>
  <div
    :class="
      cn(
        dyNavigationHeaderVariants({
          variant: variant,
        }),
        {
          'pl-4': !props.leftControl || props.leftControl!.isHidden,
          'pr-4': !props.rightControl || props.rightControl!.isHidden,
        },
        props.class,
      )
    "
  >
    <!-- <div
      class="flex-none h-14 w-14 flex items-center justify-center"
      v-if="!leftControl?.isDisabled"
    >
      <dy-button variant="ghost" size="naked" class="rounded [&_svg]:size-6">
        <dy-icon :path="leftControl?.icon ?? mdiArrowLeft" />
      </dy-button>
    </div> -->
    <dy-navigation-header-item
      v-if="props.leftControl && !props.leftControl.isHidden"
      :icon="props.leftControl?.icon"
      @click="props.leftControl?.onClick"
    />
    <div
      :class="cn(dyNavigationHeaderTextVariants({ variant: isCenterTitle ? 'center' : 'default' }))"
    >
      {{ props.title }}
    </div>
    <dy-navigation-header-item
      v-if="props.rightControl && !props.rightControl.isHidden"
      :icon="props.rightControl?.icon"
      @click="props.rightControl?.onClick"
    />
  </div>
  <!-- <div
    class="flex items-center text-gray-700 h-14 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600"
  >
    <div class="flex-none h-14 w-14 flex items-center justify-center">
      <dy-button variant="ghost" size="naked" class="rounded [&_svg]:size-6">
        <dy-icon :path="mdiArrowLeft" />
      </dy-button>
    </div>
    <div class="flex-auto w-100 font-medium truncate text-ellipsis overflow-hidden"></div>
    <div class="flex-none h-14 w-14 flex items-center justify-center">
      <dy-button variant="ghost" size="naked" class="rounded [&_svg]:size-6">
        <dy-icon :path="mdiMessageFast" />
      </dy-button>
    </div>
  </div>



  <div
    class="flex items-center text-gray-700 h-14 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600"
  >
    <div class="flex-none h-14 w-14 flex items-center justify-center">
      <dy-button variant="ghost" size="naked" class="rounded [&_svg]:size-6">
        <dy-icon :path="mdiArrowLeft" />
      </dy-button>
    </div>
    <div class="flex-auto w-100 font-medium truncate text-ellipsis overflow-hidden">
      Dignify wadefak this text is too long to fit in title wow but still fits perfectily
    </div>
    <div class="flex-none h-14 w-14 flex items-center justify-center">
      <dy-button variant="ghost" size="naked" class="rounded [&_svg]:size-6">
        <dy-icon :path="mdiArrowRight" />
      </dy-button>
    </div>
  </div>
-->

  <!-- <div
    class="flex items-center text-gray-700 h-14 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600"
  >
    <div class="flex-none h-14 w-14 flex items-center justify-center">
      <dy-button variant="ghost" size="naked" class="rounded [&_svg]:size-6">
        <dy-icon :path="mdiArrowLeft" />
      </dy-button>
    </div>
    <div class="flex-auto w-100 font-medium truncate text-ellipsis overflow-hidden text-center">
      Accounts
    </div>
    <div class="flex-none h-14 w-14 flex items-center justify-center">
      <dy-button variant="ghost" size="naked" class="rounded [&_svg]:size-6">
        <dy-icon :path="mdiArrowRight" />
      </dy-button>
    </div>
  </div> -->

  <!-- <div
    class="flex items-center text-gray-700 h-14 pl-4 border-b border-gray-200 dark:bg-gray-700 dark:border-gray-600"
  >
    <div class="flex-auto w-100 font-medium truncate text-ellipsis overflow-hidden">Home</div>
    <div class="flex-none h-14 w-14 flex items-center justify-center">
      <dy-button variant="ghost" size="naked" class="rounded [&_svg]:size-6">
        <dy-icon :path="mdiArrowRight" />
      </dy-button>
    </div>
  </div>  -->
</template>
