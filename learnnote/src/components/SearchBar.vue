<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search']);

const query = ref('');

function handleInput() {
  emit('search', query.value);
}
</script>

<template>
  <div class="field mb-5">
    <label class="label">Search character</label>

    <div class="control">
      <input
        v-model="query"
        class="input"
        type="text"
        placeholder="Type a name"
        @input="handleInput"
      />
    </div>
  </div>
</template>