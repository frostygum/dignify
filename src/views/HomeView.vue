<script setup lang="ts">
import { DyButton } from '@/components/ui'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { storeToRefs } from 'pinia'
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

const { count } = storeToRefs(counterStore)

const audioPlayer = ref<HTMLAudioElement | null>(null); // Reference to the audio element
const volumeControl = ref<number>(1);

const handleFileChange = (event: Event) => {
  if (event.target === null)
    return;

  const inputFileEvent = event.target as HTMLInputElement;
  if (inputFileEvent.files === null ||  inputFileEvent.files?.length == 0)
    return;

  const file = inputFileEvent.files[0];
  
  if (file && audioPlayer.value) {
    // Create a URL for the selected file
    // Assign the URL to the audio player's src
    // This needs to be done after the DOM is updated, so a watcher or nextTick might be needed if not using a ref directly for src
    audioPlayer.value.src =  URL.createObjectURL(file);
    audioPlayer.value.play()
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
          <audio
            ref="audioPlayer"
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
        </CardContent>
      </Card>
    </div>
  </main>
</template>
