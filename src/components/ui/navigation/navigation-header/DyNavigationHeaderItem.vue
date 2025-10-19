<script setup lang="ts">
import { DyButton, DyIcon } from '@/components/ui'
import { mdiCog } from '@mdi/js'

export interface DyNavigationHeaderItemProps {
  label?: string
  icon?: string
  onClick?: () => void
  isDisabled?: boolean
  isHidden?: boolean
}

const props = withDefaults(defineProps<DyNavigationHeaderItemProps>(), {
  icon: mdiCog,
  isHidden: false,
})
</script>

<template>
  <div class="flex-none h-14 w-14 flex items-center justify-center">
    <dy-button
      v-if="!props.isHidden"
      @click="props.onClick"
      variant="ghost"
      size="naked"
      class="rounded [&_svg]:size-6"
    >
      <dy-icon :path="props.icon" />
    </dy-button>
  </div>
</template>
