<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Primitive } from 'reka-ui'
import { type ButtonProps, dyButtonVariants } from '.'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
  click: () => {},
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    @click="props.click"
    :class="cn(dyButtonVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
