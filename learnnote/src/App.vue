<script setup>
import { ref } from 'vue';
import Tabs from './components/Tabs.vue';

import ToDo from './pages/ToDo.vue';
import Modals from './pages/Modals.vue';

let tabTitles = ref([
  'ToDo',
  'Modals',
]);

let tabActive = ref(0);

let contents = [
  ToDo,
  Modals,
];

</script>

<template>
  <Tabs :titles="tabTitles" :active="tabActive" @setActive="tabActive = $event"></Tabs>
  <div class="container">
    <component :is="contents[tabActive]"></component>
  </div>
</template>

<style></style>