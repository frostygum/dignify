<script setup lang="ts">
import { DyButton } from '@/components/ui'
import { cn } from '@/lib/utils'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DateFormatter, type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { ref } from 'vue'

export interface DyDatePickerProps {
  defaultValue?: DateValue | undefined
}

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const value = ref<DateValue>()
const isOpen = ref<boolean>(false)

value.value = today(getLocalTimeZone())

const setIsOpen = (value: boolean) => {
  isOpen.value = value
}
</script>

<template>
  <Popover :open="isOpen" @update:open="setIsOpen">
    <PopoverTrigger as-child>
      <dy-button
        variant="outline"
        @click="() => setIsOpen(true)"
        :class="cn('justify-start text-left font-normal', !value && 'text-muted-foreground')"
      >
        <span class="mr-2 h-4 w-4">
          {{ 'c' }}
        </span>
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date' }}
      </dy-button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" @update:model-value="setIsOpen(false)" />
    </PopoverContent>
  </Popover>
</template>
