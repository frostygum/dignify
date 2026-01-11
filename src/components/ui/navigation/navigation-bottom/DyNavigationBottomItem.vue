<script setup lang="ts">
import { type ButtonProps, DyButton, DyIcon } from '@/components/ui'
import { mdiCog } from '@mdi/js'
import { cn } from '@/lib/utils'

import { type DyNavigationBottomItemProps, dyNavigationBottomItemVariants } from '.'

const props = withDefaults(defineProps<DyNavigationBottomItemProps>(), {
  variant: 'default',
  click: () => {},
})

const renderButtonVariant = (
  variant: DyNavigationBottomItemProps['variant'],
): ButtonProps['variant'] => {
  switch (variant) {
    case 'active':
      return 'secondary'
    case 'primary':
      return 'default'
    default:
      return 'ghost'
  }
}
</script>

<template>
  <dy-button
    :variant="renderButtonVariant(props.variant)"
    size="plain"
    @click="props.click"
    :class="cn(dyNavigationBottomItemVariants({ variant }), props.class)"
  >
    <div class="flex flex-col items-center">
      <dy-icon class="w-5 h-5" :path="icon ?? mdiCog" />
      <span class="text-[0.6rem] pointer-events-none select-none">{{ props.label }}</span>
    </div>
  </dy-button>
</template>
