import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';

import { useDateTime } from '@/hooks/useDuration';

export interface MusicData {
  id?: number;
  title?: string;
  artist?: string;
  album?: string;
  cover?: string;
  blob?: File;
  source?: string;
  filename?: string;
  filetype?: string;
}

const { secondsToFormattedTime } = useDateTime();

export const useMusicPlayer = defineStore('MUSIC_PLAYER', () => {
  const _player = ref<HTMLAudioElement>(new Audio());
  const isPlaying = shallowRef<boolean>(false);
  const currentMusic = ref<MusicData>({});
  const currentTimestamp = shallowRef<number>(0);
  const currentDuration = shallowRef<number>(0);

  const reset = () => {
    _player.value = new Audio();
    isPlaying.value = false;
    currentMusic.value = {};
    currentTimestamp.value = 0;
    currentDuration.value = 0
  }

  const setCurrentMusic = (data: MusicData) => {
    currentMusic.value = data;
  }

  const updateMetadata = () => {
    if ('mediaSession' in navigator) {
      const artworks = []

      if (currentMusic.value?.cover) {
        artworks.push({
          src: currentMusic.value?.cover,
          sizes: "256x256",
          type: "image/png",
        })
      }

      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentMusic.value?.title,
        artist: currentMusic.value?.artist,
        album: currentMusic.value?.artist,
        artwork: artworks,
      })
    }
  }

  const play = async () => {
    if (_player.value) {
      _player.value.play()
        .then(() => {
          isPlaying.value = true;
        })
        .catch(() => {
          isPlaying.value = false;
        });
    } else {
      isPlaying.value = false;
    }
  }

  const pause = () => {
    if (_player.value) {
      isPlaying.value = false;
      _player.value.pause();
    }
  }

  const togglePlayer = () => {
    if (isPlaying.value) {
      pause();
    } else {
      play();
    }
  }

  const getFormattedTimestamp = (): string => {
    return secondsToFormattedTime(currentTimestamp.value)
  }

  const getFormattedDuration = (): string => {
    return secondsToFormattedTime(currentDuration.value);
  }

  const next = () => {

  }

  const prev = () => {

  }

  const mute = () => {

  }

  const startPlayer = async () => {
    if (!currentMusic.value) {
      isPlaying.value = false;
      return;
    }

    try {
      if (currentMusic.value.blob) {
        _player.value.src = URL.createObjectURL(currentMusic.value.blob);

        _player.value.ondurationchange = () => {
          if (_player.value?.duration) {
            currentDuration.value = Number.parseInt(_player.value?.duration.toFixed(0));
          }
        };

        _player.value.onerror = (error) => {
          reset();
          console.error("Error loading audio metadata:", error);
        };

        _player.value.ontimeupdate = () => {
          if (_player.value?.currentTime) {
            currentTimestamp.value = Number.parseInt(_player.value.currentTime.toFixed(0));
          }
        }

        _player.value.onplay = () => {
          if (_player.value) {
            isPlaying.value = true;
          }
        }

        _player.value.onpause = () => {
          if (_player.value) {
            isPlaying.value = false;
          }
        }

        await play();
        updateMetadata();
      }
    } catch {
      isPlaying.value = false;
    }
  }

  return {
    setCurrentMusic,
    startPlayer,
    play,
    pause,
    next,
    prev,
    mute,
    togglePlayer,
    getFormattedTimestamp,
    getFormattedDuration,
    isPlaying,
    currentMusic,
    currentTimestamp,
    currentDuration
  }
})
