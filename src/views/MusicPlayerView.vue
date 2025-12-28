<script setup lang="ts">

import { ref, computed } from 'vue';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import { DyButton, DyIcon } from '@/components/ui';
import {
  mdiMusicCircle,
  mdiPause,
  mdiPlay, mdiRepeat,
  mdiShuffle,
  mdiSkipBackward,
  mdiSkipForward
} from '@mdi/js';
import DyCasette from '@/components/casette/DyCasette.vue';
import { Slider } from '@/components/ui/slider';
import { storeToRefs } from 'pinia';
import { useMusicPlayer } from '@/stores/useMusicPlayerStore';

const player = useMusicPlayer();

const { isPlaying, currentMusic, currentDuration, currentTimestamp } = storeToRefs(player)

const title = ref<string>('-');
const artist = ref<string>('-');

const timestamp = computed(() => {
  const a = [];
  a.push(currentTimestamp.value)
  return a;
})
</script>

<template>
  <main>
    <div class="p-4 grid grid-cols-1 gap-4">
      <Card
        class="bg-white bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] bg-[size:16px_16px]"
      >
        <CardContent>
          <div class="w-full flex justify-center">
            <DyCasette />
          </div>
        </CardContent>
      </Card>

      <Card
        class="bg-white bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] bg-[size:16px_16px]"
      >
        <CardContent>
          <div class="w-full flex justify-center">
            <div
              v-if="typeof currentMusic.cover !== 'undefined' && currentMusic.cover != ''"
              class="rounded-lg w-48 h-48 flex justify-center items-center bg-cover bg-center"
              :style="{
                backgroundImage: `url(${currentMusic.cover})`
              }"
            />
            <div
              v-else
              class="rounded-lg bg-blue-500 w-48 h-48 flex justify-center items-center"
            >
              <DyIcon :path="mdiMusicCircle" :size="48" />
            </div>
          </div>

          <div
            v-if="title || artist"
            class="mt-4 mb-6"
          >
            <h3 class="font-bold text-center">{{ currentMusic.title || '-' }}</h3>
            <p class="text-center">{{ currentMusic.artist || '-' }}</p>
          </div>

          <Slider
            v-model="timestamp"
            :default-value="[0]"
            :max="currentDuration > 0 ? currentDuration : 1"
            :step="0.1"
            class="relative flex items-center select-none touch-none h-5"
            disabled
          />
          <div class="w-full flex justify-between">
            <span>{{ player.getFormattedTimestamp() }}</span>
            <span>{{ player.getFormattedDuration() }}</span>
          </div>
          <div>

          </div>
          <br />
          <div class="flex justify-between items-center">
            <dy-button variant="outline" size="icon_xs" @click="() => {}">
              <dy-icon class="w-5 h-5" :path="mdiShuffle" />
            </dy-button>

            <div class="flex justify-between w-2/5">
              <dy-button
                variant="outline"
                size="icon_lg"
                class="rounded-lg [&_svg]:size-6"
                disabled
                @click="() => {}"
              >
                <dy-icon :path="mdiSkipBackward" />
              </dy-button>

              <dy-button
                variant="outline"
                size="icon_lg"
                class="rounded-lg [&_svg]:size-6"
                @click="() => player.togglePlayer()"
              >
                <dy-icon :path="isPlaying ? mdiPause : mdiPlay" />
              </dy-button>

              <dy-button
                variant="outline"
                size="icon_lg"
                class="rounded-lg [&_svg]:size-6"
                disabled
                @click="() => {}"
              >
                <dy-icon :path="mdiSkipForward" />
              </dy-button>
            </div>

            <dy-button variant="outline" size="icon_xs" @click="() => {}">
              <dy-icon :path="mdiRepeat" />
            </dy-button>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
</template>
