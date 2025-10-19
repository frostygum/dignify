<script setup lang="ts">
import { DyIcon } from '@/components/ui'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import Separator from '@/components/ui/separator/Separator.vue'
import { del, init } from '@/stores/transactions.service'
import { mdiCashRegister, mdiChevronRight, mdiDelete, mdiNumeric0Box, mdiShare } from '@mdi/js'

import { useDialogStore } from '@/stores/useDialog'

const dialogStore = useDialogStore()

const asyncTimeout = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const resetDatabase = async () => {
  dialogStore.setIsDisable('positive', true)
  dialogStore.setIsLoading('positive', true)

  await asyncTimeout(1000).then(() =>
    del().then(() =>
      init().finally(() => {
        dialogStore.setIsDisable('positive', false)
        dialogStore.setIsLoading('positive', false)
        dialogStore.toggle()
      }),
    ),
  )
}
</script>

<template>
  <main>
    <div class="p-4 grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Storage</CardTitle>
        </CardHeader>
        <CardFooter>
          <div class="w-full rounded-md grid grid-cols-1 bg-secondary text-secondary-foreground">
            <div
              class="w-full flex rounded-md justify-between items-center px-4 py-2 hover:bg-primary/5 cursor-pointer"
              @click="
                () => {
                  dialogStore.open({
                    title: 'Reset Database',
                    contents: 'Are you sure want to reset database ?',
                    actions: {
                      negative: {
                        label: 'Cancel',
                      },
                      positive: {
                        label: 'Yes',
                        onClick: resetDatabase,
                      },
                    },
                  })
                }
              "
            >
              <div class="flex items-center gap-2">
                <dy-icon :path="mdiDelete" />
                <div>Reset</div>
              </div>
              <dy-icon :path="mdiChevronRight" />
            </div>
            <div class="px-4">
              <Separator />
            </div>
            <div
              class="w-full flex rounded-md justify-between items-center px-4 py-2 hover:bg-primary/5 cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <dy-icon :path="mdiShare" />
                <div>Backup</div>
              </div>
              <dy-icon :path="mdiChevronRight" />
            </div>
          </div>
        </CardFooter>
      </Card>

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
