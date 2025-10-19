<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :width="sizeValue"
    :height="sizeValue"
    :viewBox="viewBoxValue"
    :style="styles"
    :class="cn({ 'animate-spin': props.spin }, props.class)"
  >
    <path :d="props.path" />
  </Primitive>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Primitive, type PrimitiveProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'

interface Props extends PrimitiveProps {
  path: string
  size?: number
  viewbox?: string
  flip?: 'none' | 'horizontal' | 'vertical'
  rotate?: number
  spin?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'svg',
  size: 18,
  viewbox: '0 0 24 24',
  flip: 'none',
  rotate: 0,
  spin: false,
})

const sizeValue = computed(() => props.size)
const viewBoxValue = computed(() => props.viewbox)

const styles = computed(() => {
  return {
    'font-size': `${sizeValue.value}px !important`,
    transform: `rotate(${props.rotate}deg) scaleX(${['both', 'horizontal'].includes(props.flip) ? -1 : 1}) scaleY(${['both', 'vertical'].includes(props.flip) ? -1 : 1})`,
  }
})
</script>
