<script setup>
import { ref } from 'vue';
import Tabs from './components/Tabs.vue';

let tabTitles = ref([
  'Title 1',
  'Title 2',
  'Title 3',
  'Title 4',
])

let tabActive = ref(0);

let contents = ref([
  'Content 1',
  'Content 2',
  'Content 3',
  'Content 4',
])

</script>

<template>
  <div class="container">
    <Tabs :titles="tabTitles" :active="tabActive" @setActive="tabActive = $event"></Tabs>
    <p>{{ contents[tabActive] }}</p>
  </div>
</template>

<style></style>