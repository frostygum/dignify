<script setup lang="ts">
import { DyIcon } from '@/components/ui';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import Separator from '@/components/ui/separator/Separator.vue';
import { mdiMusicNote, mdiSkull } from '@mdi/js';


import { onMounted, shallowRef, } from 'vue';

import { useRouter } from 'vue-router';
import { client } from '@/plugins/sqlocal/client';
import { musicTableSchema } from '@/plugins/sqlocal/schemas/music.schema';

const router = useRouter()
const totalMusic = shallowRef<number>(0);

async function countMusic() {
  try {
    const cnt = await client.$count(musicTableSchema)
    totalMusic.value = cnt
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  countMusic()
})
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
            >
              <div class="flex items-center gap-2">
                <dy-icon :path="mdiMusicNote" />
                <div>Total Music</div>
              </div>
              <div>
                {{ totalMusic }}
              </div>
            </div>
            
            <div class="px-4">
              <Separator />
            </div>

            <div
              class="w-full flex rounded-md justify-between items-center px-4 py-2 hover:bg-primary/5 cursor-pointer"
              @click="() => {
                router.push('/play')
              }"
            >
              <div class="flex items-center gap-2">
                <dy-icon :path="mdiSkull" />
                <div>Playground</div>
              </div>
              <div>
                <span class="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 inset-ring inset-ring-red-400/20">
                  Experimental
                </span>
              </div>
            </div>

          </div>
        </CardFooter>
      </Card>
    </div>
  </main>
</template>
