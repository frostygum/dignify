<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn('rounded-xl border bg-card text-card-foreground p-4 grid gap-4 grid-cols-1', props.class)
    "
  >
    <slot />
  </div>
</template>
