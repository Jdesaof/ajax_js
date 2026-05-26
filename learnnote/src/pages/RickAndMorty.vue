<script setup>
import axios from 'axios';
import { ref, computed, watch, nextTick } from 'vue';

import CharacterCard from '../components/CharacterCard.vue';
import PaginationBar from '../components/PaginationBar.vue';
import SearchBar from '../components/SearchBar.vue';

const characters = ref([]);
const currentPage = ref(1);
const searchQuery = ref('');

const isLoading = ref(false);
const errorMessage = ref('');
const emptyMessage = ref('');

const listTop = ref(null);

const info = ref({
  count: 0,
  pages: 0,
  next: null,
  prev: null,
});

const totalPages = computed(() => info.value.pages);

async function scrollToCharactersTop() {
  await nextTick();

  listTop.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}

async function fetchCharacters() {
  isLoading.value = true;
  errorMessage.value = '';
  emptyMessage.value = '';

  try {
    const params = {
      page: currentPage.value,
    };

    const trimmedQuery = searchQuery.value.trim();

    if (trimmedQuery) {
      params.name = trimmedQuery;
    }

    const res = await axios.get('https://rickandmortyapi.com/api/character', {
      params,
    });

    characters.value = res.data.results;
    info.value = res.data.info;

    await scrollToCharactersTop();
  } catch (error) {
    if (error.response?.status === 404) {
      characters.value = [];

      info.value = {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      };

      emptyMessage.value = 'No characters found.';
      await scrollToCharactersTop();
      return;
    }

    errorMessage.value = 'Failed to load characters.';
  } finally {
    isLoading.value = false;
  }
}

function changePage(page) {
  currentPage.value = page;
}

// Answer to the questions:
// 1. While typing "morty", 5 API requests were made: one request for each typed character.
// 2. If a slow request from keystroke 2 arrives after keystroke 5, it can overwrite the latest results with outdated data.
// 3. This causes request flooding on the server and makes the user experience worse, because the UI may show results for an older query instead of the current one.
function handleSearch(query) {
  searchQuery.value = query;

  if (currentPage.value !== 1) {
    currentPage.value = 1;
  } else {
    fetchCharacters();
  }
}

watch(
  currentPage,
  () => {
    fetchCharacters();
  },
  { immediate: true }
);
</script>

<template>
  <div ref="listTop"></div>

  <SearchBar @search="handleSearch" />

  <PaginationBar
    :current-page="currentPage"
    :total-pages="totalPages"
    @page-change="changePage"
  />

  <p v-if="isLoading" class="has-text-centered my-4">
    Loading...
  </p>

  <p v-else-if="errorMessage" class="notification is-danger">
    {{ errorMessage }}
  </p>

  <p v-else-if="emptyMessage" class="notification is-warning">
    {{ emptyMessage }}
  </p>

  <Transition v-else name="fade" mode="out-in">
    <div :key="`${currentPage}-${searchQuery}`" class="columns is-multiline">
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