<script setup lang="ts">
import { DyButton, DyIcon } from '@/components/ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  mdiPause,
  mdiPlay,
  mdiVolumeHigh,
  mdiVolumeOff
} from '@mdi/js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { parseBlob, selectCover } from 'music-metadata';
import { uint8ArrayToBase64 } from 'uint8array-extras';

const counterStore = useCounterStore()

const { count } = storeToRefs(counterStore)

const audioPlayer = ref<HTMLAudioElement | null>(null); // Reference to the audio element
const volumeControl = ref<number>(1);
const isMuted = ref<boolean>(false);
const isPlaying = ref<boolean>(false);
const coverImageBase64 = ref<string>('');
const currentTime = ref<number>(0);

const handleFileChange = (event: Event) => {
  if (event.target === null)
    return;

  const inputFileEvent = event.target as HTMLInputElement;
  if (inputFileEvent.files === null ||  inputFileEvent.files?.length == 0)
    return;

  const file = inputFileEvent.files[0];
  console.log(file);

  try {
    parseBlob(file).then((res) => {
      if (!res.common.picture) {
        console.log('no cover image detected')
        return;
      }
      
      const cover = selectCover(res.common.picture);
      if (!cover) {
        console.log('no cover image detected')
        return;
      }

      const img = `data:${cover.format};base64,${uint8ArrayToBase64(cover.data)}`;
      coverImageBase64.value = img;
    })
  } catch (e) {
    console.log(e)
  }
  
  if (file && audioPlayer.value) {
    audioPlayer.value.src = URL.createObjectURL(file);
  } else {
    if (audioPlayer.value)
      audioPlayer.value.src = '';
  }
}

const handleVolumeChange = (e: Event) => {
  if (e.target === null)
    return;

  const inputRangeEvent = e.target as HTMLInputElement;
  if (inputRangeEvent.value == null)
    return;

  if (audioPlayer.value) {
    audioPlayer.value.volume = Number(inputRangeEvent.value);
  }
}

const handlePlayAudioPlayer = () => {
  if (audioPlayer.value) {
    isPlaying.value = !isPlaying.value

    if (isPlaying.value)
      audioPlayer.value.pause();
    else
      audioPlayer.value.play();
  }
}

const handleTimeUpdate = () => {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer?.value.currentTime;
  }
}

const handleMuteAudioPlayer = () => {
  isMuted.value = !isMuted.value
}
</script>

<template>
  <main>
    <div class="p-4 grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Count</CardTitle>
          <CardDescription>This is sample counter using pinia</CardDescription>
        </CardHeader>
        <CardContent>{{ count }}</CardContent>
        <CardFooter class="gap-4">
          <dy-button class="w-full" variant="outline" @click="() => counterStore.clear()">
            Clear
          </dy-button>
          <dy-button class="w-full" variant="default" @click="() => counterStore.increment()">
            Increment
          </dy-button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Music Player</CardTitle>
          <CardDescription>This is sample music player</CardDescription>
        </CardHeader>
        <CardContent>
          <img :src="coverImageBase64" />
          <audio
            ref="audioPlayer"
            @timeupdate="handleTimeUpdate"
            :muted="isMuted"
            controls
          />
          <input
            type="file"
            accept="audio/*"
            @change="handleFileChange"
          />
          <input
            type="range"
            :value="volumeControl"
            min="0"
            max="1"
            step="0.01"
            @input="handleVolumeChange"
          />
          <Card>
            <CardContent>
              <dy-button variant="outline" size="icon_xs" @click="() => handlePlayAudioPlayer()">
                <dy-icon class="w-5 h-5" :path="isPlaying ? mdiPlay : mdiPause" />
              </dy-button>
              
              <dy-button variant="outline" size="icon_xs" @click="() => handleMuteAudioPlayer()">
                <dy-icon class="w-5 h-5" :path="isMuted ? mdiVolumeOff : mdiVolumeHigh" />
              </dy-button>

              <span>{{ currentTime ?? '00:00' }}</span>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  </main>
</template>
