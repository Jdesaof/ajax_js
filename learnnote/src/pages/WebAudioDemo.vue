<script setup>
import { ref, computed, onBeforeUnmount } from 'vue';

const result = ref(null);
const error = ref(null);
const isPlaying = ref(false);
const isLoading = ref(false);
let audioContext = null;
let oscillator = null;
let gain = null;
let disposed = false;

const buttonText = computed(() => {
  return isPlaying.value ? 'Stop Sound' : 'Play Sound';
});

async function runDemo() {
  if (isLoading.value) return;
  error.value = null;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    error.value = 'Web Audio API is not supported in this browser.';
    return;
  }

  isLoading.value = true;
  try {
    if (isPlaying.value) {
      oscillator.stop();
      oscillator.disconnect();
      oscillator = null;
      isPlaying.value = false;
    } else {
      if (!audioContext) {
        audioContext = new AudioContext();
        gain = audioContext.createGain();
        gain.gain.value = 0.1;
        gain.connect(audioContext.destination);
      }
      await audioContext.resume();
      if (disposed) return;

      oscillator = audioContext.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = 440;
      oscillator.connect(gain);
      oscillator.start();
      isPlaying.value = true;
    }

    result.value = {
      soundPlaying: isPlaying.value,
      frequency: '440 Hz',
      waveform: 'sine',
      time: new Date().toLocaleTimeString(),
    };
  } catch (err) {
    error.value = err.message || 'Audio playback was blocked or denied.';
  } finally {
    isLoading.value = false;
  }
}

onBeforeUnmount(() => {
  disposed = true;
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
  }
  if (audioContext && audioContext.state !== 'closed') {
    audioContext.close().catch(() => {});
  }
});
</script>

<template>
  <div class="container">
    <h1 class="title">My Web API Demo — Web Audio API</h1>

    <p class="mb-4">
      The Web Audio API lets a page create and play sound.
      This demo plays a simple 440 Hz tone.
    </p>

    <div class="audio-demo-box box has-text-centered">
      <h2 class="title is-3">Web Audio Demo Area</h2>

      <p>
        Click the button to start or stop the sound.
      </p>

      <p class="mt-3">
        The tone uses a sine wave at a low volume.
      </p>

      <button class="button is-primary mt-5" :disabled="isLoading" @click="runDemo">
        {{ buttonText }}
      </button>

      <div v-if="result" class="notification is-info mt-5 result-box">
        <h2 class="title is-5">API Result</h2>
        <pre>{{ result }}</pre>
      </div>
    </div>

    <div v-if="error" class="notification is-danger mt-4">
      ⚠️ {{ error }}
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
}

.audio-demo-box {
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
