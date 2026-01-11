<script setup lang="ts">
import { DyIcon } from '@/components/ui';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import Separator from '@/components/ui/separator/Separator.vue';
import { mdiFileImport, mdiMusicNote, mdiSkull } from '@mdi/js';


import { onMounted, shallowRef, ref} from 'vue';


import { uint8ArrayToBase64 } from 'uint8array-extras';
import { type MusicData } from '@/stores/useMusicPlayerStore';
import { parseBlob, selectCover } from 'music-metadata';
import { useRouter } from 'vue-router';
import { client } from '@/plugins/sqlocal/client';
import { musicTableSchema } from '@/plugins/sqlocal/schemas/music.schema';

const router = useRouter()
const totalMusic = shallowRef<number>(0);

const _fileInputRef = ref<HTMLInputElement | null>(null);

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

const triggerInportFile = () => {
  if (_fileInputRef.value != null) {
    _fileInputRef.value.click();
  }
}

async function saveMusic(data: MusicData) {
  if (!data.blob) {
    return;
  }

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
}

const handleFileImportChange = (event: Event) => {
  if (event.target === null) {
    return;
  }

  const inputFileEvent = event.target as HTMLInputElement;
  if (inputFileEvent.files === null ||  inputFileEvent.files?.length == 0) {
    return;
  }

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
        data.source = 0;

        return resolve(data);
      })
      .catch((e) => {
        console.error(e);
        return resolve(null);
      });
  });
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
                router.push('/playground')
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

      <Card>
        <CardHeader>
          <CardTitle>Integration</CardTitle>
        </CardHeader>
        <CardFooter>
          <div class="w-full rounded-md grid grid-cols-1 bg-secondary text-secondary-foreground">
            <div
              class="w-full flex rounded-md justify-between items-center px-4 py-2 hover:bg-primary/5 cursor-pointer"
              @click="() => triggerInportFile()"
            >
              <div class="flex items-center gap-2">
                <dy-icon :path="mdiFileImport" />
                <div>Import Music</div>
                <input
                  class="hidden"
                  ref="_fileInputRef"
                  type="file"
                  accept=".wav,.aif,.aiff,.flac,.alac,.aac,.ogg,.mp3"
                  multiple
                  @change="handleFileImportChange"
                />
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  </main>
</template>
