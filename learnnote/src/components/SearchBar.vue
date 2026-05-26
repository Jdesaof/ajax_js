<script setup>
import { ref } from 'vue';

const emit = defineEmits(['search']);

const query = ref('');

function submitSearch() {
  emit('search', query.value);
}
</script>

<template>
  <form class="field has-addons mb-5" @submit.prevent="submitSearch">
    <div class="control is-expanded">
      <input
        v-model="query"
        class="input"
        type="text"
        placeholder="Search character"
      />
    </div>

    <div class="control">
      <button class="button is-primary" type="submit">
        Search
      </button>
    </div>
  </form>
</template>