import { defineStore } from 'pinia';
import { computed, ref, shallowRef } from 'vue';

import { useDateTime } from '@/hooks/useDuration';

export interface MusicData {
  id?: number;
  title?: string;
  artist?: string;
  album?: string;
  cover?: string;
  blob?: File | Blob;
  source?: number;
  filename?: string;
  filetype?: string;
}

const { secondsToFormattedTime } = useDateTime();

export const useMusicPlayer = defineStore('MUSIC_PLAYER', () => {
  // current player context
  const _player = ref<HTMLAudioElement>(new Audio());
  const _playingData = ref<MusicData>({});
  const _isPlaying = shallowRef<boolean>(false);
  const _timestamp = shallowRef<number>(0);
  const _duration = shallowRef<number>(0);
  const _error = shallowRef<string>('');

  // music queue
  const _queue = ref<MusicData[]>([]);

  const playing = computed(() => {
    return {
      state: _isPlaying.value,
      data: _playingData.value,
      duration: _duration.value,
      timestamp: _timestamp.value,
      error: _error.value
    }
  })

  const push = (data: MusicData) => {
    _queue.value.push(data);
  }

  const pop = () => {
    const latest = _queue.value.pop();
    if (!latest) {
      return;
    }
    _playingData.value = latest;
  }

  const reset = () => {
    _player.value = new Audio();
    _playingData.value = {};
    _isPlaying.value = false;
    _timestamp.value = 0;
    _duration.value = 0
  }

  const updateSystemMetadata = () => {
    if ('mediaSession' in navigator) {
      if (!_playingData.value) {
        navigator.mediaSession.metadata = null;
      }

      const artworks = []

      if (_playingData.value?.cover) {
        artworks.push({
          src: _playingData.value?.cover,
          sizes: "256x256",
          type: "image/png",
        })
      }

      navigator.mediaSession.metadata = new MediaMetadata({
        title: _playingData.value?.title,
        artist: _playingData.value?.artist,
        album: _playingData.value?.artist,
        artwork: artworks,
      })
    }
  }

  const load = async () => {
    if (!_playingData.value || !_playingData.value.blob) {
      return;
    }

    try {
      _player.value.src = URL.createObjectURL(_playingData.value.blob);

      _player.value.ondurationchange = () => {
        if (_player.value?.duration) {
          _duration.value = Number.parseInt(_player.value?.duration.toFixed(0));
        }
      };

      _player.value.onerror = (error) => {
        _error.value = String(error)
        reset();
        console.error("Error loading audio metadata:", error);
      };

      _player.value.ontimeupdate = () => {
        if (_player.value?.currentTime) {
          _timestamp.value = Number.parseInt(_player.value.currentTime.toFixed(0));
        }
      }

      _player.value.onplay = () => {
        if (_player.value) {
          _isPlaying.value = true;
        }
      }

      _player.value.onpause = () => {
        if (_player.value) {
          _isPlaying.value = false;
        }
      }

      _player.value.onended = () => {
        next()
      }

      updateSystemMetadata();
    } catch (error) {
      _error.value = String(error)
      reset();
    }
  }

  const play = async () => {
    if (_player.value) {
      _player.value.play()
        .then(() => {
          _isPlaying.value = true;
        })
        .catch(() => {
          _isPlaying.value = false;
        });
    } else {
      _isPlaying.value = false;
    }
  }

  const pause = () => {
    if (_player.value) {
      _isPlaying.value = false;
      _player.value.pause();
    }
  }

  const toggle = () => {
    if (_isPlaying.value) {
      pause();
    } else {
      play();
    }
  }

  const isNextAvailable = (): boolean => {
    return _queue.value.length > 1
  }

  const isPrevAvailable = (): boolean => {
    return false;
  }

  const next = () => {
    if (!isNextAvailable()) {
      return;
    }

    pop()
    load()
    play()
  }

  const prev = () => {
    if (!isPrevAvailable()) {
      return;
    }

    return;
  }

  const mute = () => {

  }

  const getFormattedTimestamp = (): string => {
    return secondsToFormattedTime(_timestamp.value)
  }

  const getFormattedDuration = (): string => {
    return secondsToFormattedTime(_duration.value);
  }

  return {
    load,
    play,
    pause,
    next,
    prev,
    mute,
    toggle,
    push,
    pop,
    reset,
    updateSystemMetadata,
    isNextAvailable,
    isPrevAvailable,
    getFormattedTimestamp,
    getFormattedDuration,
    playing
  }
})
