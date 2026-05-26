<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const demoBox = ref(null);
const result = ref(null);
const error = ref(null);
const isFullscreen = ref(false);

const buttonText = computed(() => {
  return isFullscreen.value ? 'Exit Fullscreen' : 'Enter Fullscreen';
});

function updateFullscreenState() {
  const activeElement = document.fullscreenElement;

  isFullscreen.value = activeElement === demoBox.value;

  result.value = {
    fullscreenActive: Boolean(activeElement),
    currentElement: activeElement
      ? 'Fullscreen Demo Area'
      : null,
    time: new Date().toLocaleTimeString(),
  };
}

async function runDemo() {
  error.value = null;

  if (!demoBox.value) {
    error.value = 'Demo element was not found.';
    return;
  }

  if (!demoBox.value.requestFullscreen) {
    error.value = 'Fullscreen API is not supported in this browser.';
    return;
  }

  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await demoBox.value.requestFullscreen();
    }

    updateFullscreenState();
  } catch (err) {
    error.value = err.message || 'Fullscreen request was blocked or denied.';
  }
}

onMounted(() => {
  document.addEventListener('fullscreenchange', updateFullscreenState);
});

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', updateFullscreenState);
});
</script>

<template>
  <div class="container">
    <h1 class="title">My Web API Demo — Fullscreen API</h1>

    <p class="mb-4">
      The Fullscreen API lets a page request fullscreen mode for a specific
      element. This demo opens only the demo area in fullscreen mode.
    </p>

    <div
      ref="demoBox"
      class="fullscreen-demo-box box has-text-centered"
    >
      <h2 class="title is-3">Fullscreen Demo Area</h2>

      <p>
        Click the button to enter or exit fullscreen mode.
      </p>

      <p class="mt-3">
        You can also press Esc to leave fullscreen.
      </p>

      <button class="button is-primary mt-5" @click="runDemo">
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

.fullscreen-demo-box {
  min-height: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.fullscreen-demo-box:fullscreen {
  background: #222;
  color: white;
  padding: 4rem;
  min-height: 100vh;
}

.fullscreen-demo-box:fullscreen .title {
  color: white;
}
</style>