<script setup>
import axios from 'axios';
import { ref, computed, watch, nextTick } from 'vue';

import CharacterCard from '../components/CharacterCard.vue';
import PaginationBar from '../components/PaginationBar.vue';

const characters = ref([]);
const currentPage = ref(1);
const isLoading = ref(false);
const listTop = ref(null);

const info = ref({
  count: 0,
  pages: 0,
  next: null,
  prev: null,
});

const totalPages = computed(() => info.value.pages);

async function getCharacters(page) {
  isLoading.value = true;

  console.log('Loading page:', page);

  const res = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );

  characters.value = res.data.results;
  info.value = res.data.info;

  await nextTick();

  listTop.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  isLoading.value = false;
}

function changePage(page) {
  currentPage.value = page;
}

watch(
  currentPage,
  (page) => {
    getCharacters(page);
  },
  { immediate: true }
);
</script>

<template>
  <div ref="listTop"></div>

<PaginationBar
  :current-page="currentPage"
  :total-pages="totalPages"
  :disabled="isLoading"
  @page-change="changePage"
/>

<p v-if="isLoading" class="has-text-centered my-4">
  Loading...
</p>

<p v-else-if="errorMessage" class="notification is-danger">
  {{ errorMessage }}
</p>

<Transition v-else name="fade" mode="out-in">
  <div :key="currentPage" class="columns is-multiline">
    <div
      class="column is-one-quarter"
      v-for="character in characters"
      :key="character.id"
    >
      <CharacterCard :character="character" />
    </div>
  </div>
</Transition>

  <PaginationBar
    :current-page="currentPage"
    :total-pages="totalPages"
    @page-change="changePage"
  />
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>