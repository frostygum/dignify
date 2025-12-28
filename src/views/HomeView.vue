<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { DyButton, DyIcon } from '@/components/ui';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  mdiFileImport, mdiPlay
} from '@mdi/js';
import { parseBlob, selectCover } from 'music-metadata';
import { uint8ArrayToBase64 } from 'uint8array-extras';
import { useMusicPlayer, type MusicData } from '@/stores/useMusicPlayerStore';
// import { useSQLocal } from "@/hooks/useSQLocal";

const fileInputRef = ref<HTMLInputElement | null>(null);
const playlist = ref<MusicData[]>([]);
const player = useMusicPlayer();
// const client = useSQLocal();

import { client } from '@/plugins/sqlocal/client';
import { musicTableSchema } from '@/plugins/sqlocal/schemas/music.schema'
import { sql } from 'drizzle-orm';

const parseMusicData = (file: File): Promise<MusicData | null> => {
  return new Promise((resolve) => {
    parseBlob(file)
      .then((res) => {
        const data: MusicData = { blob: file };

        if (res.common.picture) {
          const cover = selectCover(res.common.picture);
          if (cover) {
            data.cover = `data:${cover.format};base64,${uint8ArrayToBase64(cover.data)}`;
          } else {
            console.error('failed to parsed detected cover image')
          }
        } else {
          console.error('no cover image detected')
        }

        data.title = res.common.title || '-';
        data.artist = res.common.artist || '-';
        data.album = res.common.album || '-';
        data.filename = file.name ?? '-';
        data.filetype = file.type ?? '-';
        data.source = 'local';

        return resolve(data);
      })
      .catch((e) => {
        console.error(e);
        return resolve(null);
      });
  });
}

const handleFileChange = (event: Event) => {
  if (event.target === null)
    return;

  const inputFileEvent = event.target as HTMLInputElement;
  if (inputFileEvent.files === null ||  inputFileEvent.files?.length == 0)
    return;

  for (const element of inputFileEvent.files) {
    parseMusicData(element)
      ?.then(data => {
        if (data) {
          saveMusic(data)
          // playlist.value.push(data)
        }
      });
  }
}

const handleLoadMusic = async (id: number) => {
  try {
    if (id) {
      const result = await client
        .select()
        .from(musicTableSchema)
        .where(sql`${musicTableSchema.id} = ${id}`)
        .limit(1)

      const data = result[0];

      player.setCurrentMusic({
        title: data.title,
        artist: data.artist,
        album: data.album,
        cover: data.cover,
        blob: new Blob([data.blob]),
        filename: data.filename,
        filetype: data.filetype,
        source: data.source
      })
      player.startPlayer();
    }
  } catch (e) {
    console.error(e)
  }
}

const handleInportFile = () => {
  if (fileInputRef.value != null) {
    fileInputRef.value.click();
  }
};

async function countMusic() {
  try {
    const cnt = await client.$count(musicTableSchema)
    if (cnt == 0) return;

    const list = await client
      .select({
        id: musicTableSchema.id,
        title: musicTableSchema.title,
        artist: musicTableSchema.artist
      })
      .from(musicTableSchema)

    list.forEach((item) => {
      playlist.value.push({
        id: item.id,
        title: item.title,
        artist: item.artist ?? ''
      })
    });
  } catch (err) {
    console.log(err)
  }
}

async function saveMusic(data: MusicData) {
  try {
    const arrayBuffer = await data.blob.arrayBuffer();

    client
      .insert(musicTableSchema)
      .values({
        title: data.title ?? '',
        artist: data.artist,
        album: data.album,
        cover: data.cover,
        blob: data.blob ? new Uint8Array(arrayBuffer) : null,
        filename: data.filename,
        filetype: data.filetype,
        source: 0
      })
      .then(() => {
        console.log(`Success import music with title: [${data.title}]`)
      })
      .catch((e) => {
        console.error(`Failed import music with title: [${data.title}]`, e)
      })
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  countMusic();
})
</script>


<template>
  <main>
    <div class="p-4 grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Music Player</CardTitle>
          <CardDescription>This is sample music player</CardDescription>
        </CardHeader>
        <CardContent>
          <dy-button variant="outline" size="sm" @click="handleInportFile">
            <dy-icon class="w-5 h-5" :path="mdiFileImport" />
            Import
          </dy-button>
          <input
            class="hidden"
            ref="fileInputRef"
            type="file"
            accept=".wav,.aif,.aiff,.flac,.alac,.aac,.ogg,.mp3"
            multiple
            @change="handleFileChange"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          Playlist
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 gap-2">
            <Card
              v-for="file in playlist"
              :key="file.title"
            >
              <CardContent>
              <div class="flex justify-between items-center">
                  <div>
                    <p class="text-sm font-bold overflow-hidden text-ellipsis line-clamp-1">{{ file.title }}</p>
                    <p class="text-xs">{{ file.artist }}</p>
                  </div>
                  <div>
                    <dy-button variant="outline" size="icon_xs" @click="() => handleLoadMusic(file.id)">
                      <dy-icon class="w-5 h-5" :path="mdiPlay" />
                    </dy-button>
                  </div>
              </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>

    <div class="h-24">

    </div>
  </main>
</template>
