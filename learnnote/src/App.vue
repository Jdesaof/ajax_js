<script setup>
import { ref } from 'vue';
import Modal from './components/Modal.vue';

let modal1Active = ref(false);
let modal2Active = ref(false);
</script>

<template>
  <div class="container">
    <button class="button-is-primary" @click="modal1Active = true">Open modal 1</button>
    <button class="button-is-info" @click="modal2Active = true">Open modal 2</button>
    <Modal :active="modal1Active" @close="modal1Active = false">
      <div class="box">I'm in a box.</div>
    </Modal>
    <Modal :active="modal2Active" @close="modal2Active = false" url="https://picsum.photos/1280/960?r=2"></Modal>
  </div>
</template>

<style></style>