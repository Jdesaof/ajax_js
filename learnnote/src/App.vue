<script setup>
import { ref } from 'vue';
import RouterTabs from './components/RouterTabs.vue';

</script>

<template>
    <RouterTabs></RouterTabs>
  <div class="container">
      <RouterView></RouterView>
  </div>
</template>

<style></style>