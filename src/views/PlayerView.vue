<script setup lang="ts">

import { ref, computed } from 'vue';
import {
  Card,
  CardContent
} from '@/components/ui/card';
import { DyButton, DyIcon } from '@/components/ui';
import {
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
import { useWindowSize } from '@/hooks/useWindowSize';

const player = useMusicPlayer();
const window = useWindowSize();

const { playing } = storeToRefs(player)

const title = ref<string>('-');
const artist = ref<string>('-');

const computedArrayTimestamp = computed(() => {
  return [playing.value.timestamp]
})
</script>

<template>
  <main>
    <div
      class="p-4 grid grid-cols-1 gap-4"
      :style="{
        height: `${window.height.value < 139 ? window.height.value : window.height.value - 139}px`
      }"
    >
      <Card
        class="bg-white h-full bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] bg-[size:16px_16px]"
      >
        <CardContent class="h-full flex flex-col">
          <div class="w-full flex grow justify-center items-center">
            <div>
              <DyCasette />
              <div
                v-if="title || artist"
                class="mt-4 mb-6"
              >
                <h3 class="font-bold text-center">{{ playing.data.title || '-' }}</h3>
                <p class="text-center">{{ playing.data.artist || '-' }}</p>
              </div>
            </div>
          </div>

          <Slider
            v-model="computedArrayTimestamp"
            :default-value="[0]"
            :max="playing.duration > 0 ? playing.duration : 1"
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
            <dy-button
              variant="outline"
              size="icon_xs"
              disabled
              @click="() => {}"
            >
              <dy-icon class="w-5 h-5" :path="mdiShuffle" />
            </dy-button>

            <div class="flex justify-between gap-1">
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
                @click="() => player.toggle()"
              >
                <dy-icon :path="playing.state ? mdiPause : mdiPlay" />
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

            <dy-button
              variant="outline"
              size="icon_xs"
              disabled
              @click="() => {}"
            >
              <dy-icon :path="mdiRepeat" />
            </dy-button>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>
</template>
