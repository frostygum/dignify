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
</template>
