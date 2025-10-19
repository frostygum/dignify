<script setup lang="ts">
import { DyIcon } from '@/components/ui'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Separator from '@/components/ui/separator/Separator.vue'
import { mdiCashRegister, mdiNumeric0Box } from '@mdi/js'
</script>

<template>
  <main>
    <div class="p-4 grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Finance</CardTitle>
        </CardHeader>
        <CardFooter>
          <div class="w-full rounded-md grid grid-cols-1 bg-secondary text-secondary-foreground">
            <div
              class="w-full flex rounded-md justify-between items-center px-4 py-2 hover:bg-primary/5 cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <dy-icon :path="mdiCashRegister" />
                <div>Currency</div>
              </div>
              <div>IDR</div>
            </div>
            <div class="px-4">
              <Separator />
            </div>
            <div
              class="w-full flex rounded-md justify-between items-center px-4 py-2 hover:bg-primary/5 cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <dy-icon :path="mdiNumeric0Box" />
                <div>Digits</div>
              </div>
              <div>0</div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  </main>
</template>
