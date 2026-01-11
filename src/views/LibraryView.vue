<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { DyButton, DyIcon } from '@/components/ui';
import Separator from '@/components/ui/separator/Separator.vue';
import { mdiFileImport, mdiMusicNotePlus } from '@mdi/js';
import { useMusicPlayer, type MusicData } from '@/stores/useMusicPlayerStore';
import { client } from '@/plugins/sqlocal/client';
import { musicTableSchema } from '@/plugins/sqlocal/schemas/music.schema';
import { sql } from 'drizzle-orm';
import { storeToRefs } from 'pinia';

const tracks = ref<MusicData[]>([]);
const player = useMusicPlayer();

const { playing } = storeToRefs(player);

const hadlePlayMusic = async (id: number | undefined) => {
  if (!id) {
    return;
  }

  const result = await client
    .select()
    .from(musicTableSchema)
    .where(sql`${musicTableSchema.id} = ${id}`)
    .limit(1)

  const data = result[0];

  player.push({
    id: data.id,
    title: data.title,
    artist: data.artist || undefined,
    album: data.album || undefined,
    cover: data.cover || undefined,
    blob: data.blob ? new Blob([data.blob as BlobPart]) : undefined,
    filename: data.filename || undefined,
    filetype: data.filetype || undefined,
    source: data.source || undefined
  });
  player.pop();
  player.load();
  player.play();
}

async function getListOfTracks() {
  try {
    const list = await client
      .select({
        id: musicTableSchema.id,
        title: musicTableSchema.title,
        artist: musicTableSchema.artist
      })
      .from(musicTableSchema)

    list.forEach((item) => {
      tracks.value.push({
        id: item.id,
        title: item.title,
        artist: item.artist ?? ''
      })
    });
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  getListOfTracks();
})
</script>


<template>
  <main>
    <div class="grid grid-cols-1">
      <div
        v-for="file in tracks"
        :key="file.title"
      >
        <div
          class="w-full flex gap-2 justify-between items-center px-4 py-2 hover:bg-primary/5 cursor-pointer"
          :class="{
            'bg-blue-100': file.id == playing.data.id
          }"
          @click="() => hadlePlayMusic(file.id)"
        >
          <div class="flex items-center gap-2 justify-between">
            <div>
              <div
                class="rounded-lg bg-gray-300 w-10 h-10 flex justify-center items-center"
              >
                <dy-icon :path="mdiFileImport" />
              </div>
            </div>
            <div>
              <p class="text-sm font-medium overflow-hidden text-ellipsis line-clamp-1">
                {{ file.title }}
              </p>
              <p class="text-xs font-normal">
                {{ file.artist }}
              </p>
            </div>
          </div>
          <div class="flex gap-2">
            <dy-button variant="outline" size="icon_xs" @click="() => {}" disabled>
              <dy-icon class="w-5 h-5" :path="mdiMusicNotePlus" />
            </dy-button>
          </div>
        </div>
        <div class="px-4">
          <Separator orientation="horizontal" />
        </div>
      </div>
    </div>

    <div class="h-24">

    </div>
  </main>
</template>
