<script setup>
import { ref } from 'vue';

let items = ref(['sai', 'mahl', 'õlu', 'vodka'])
let newItem = ref('');

function add(){
  if(newItem.value.trim() !== '') {
    items.value.push(newItem.value.trim());
  }
  newItem.value = '';
}
</script>

<template>
    <div class="container">
        <div class="field has-addons mt-2">
            <div class="control is-expanded">
                <input v-model="newItem" class="input" type="text" @keypress.enter="add">
            </div>
            <div class="control">
                <button class="button is-info" @click="add">
                    Add item
                </button>
            </div>
        </div>
        <div class="content">
        <h1>All items</h1>
        <ul>
          <li v-for="item in items">{{ item }}</li>
        </ul>
      </div>
    </div>
</template>

<style></style>