<script setup>
import { computed, ref } from 'vue';
let i = 1;

let items = ref([
    {id: i++, text: 'Sai', isDone: false}, 
    {id: i++, text: 'Mahl', isDone: true}, 
    {id: i++, text: 'Õlu', isDone: false}, 
    {id: i++, text: 'vodka', isDone: true},
])
let newItem = ref('');

let doneItems = computed(() => items.value.filter(item => item.isDone));
let ToDoItems = computed(() => items.value.filter(item => !item.isDone));

function add(){
  if(newItem.value.trim() !== '') {
    items.value.push({id: i++, text: newItem.value.trim(), isDone: false});
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
          <li v-for="item in items" :key="item.id">
            {{ item.text }}
            <input type="checkbox" v-model="item.isDone">
          </li>
        </ul>

        <h1>Done items</h1>
        <ul>
          <li v-for="item in doneItems" :key="item.id">
            {{ item.text }}
            <input type="checkbox" v-model="item.isDone">
          </li>
        </ul>

        <h1>ToDo items</h1>
        <ul>
          <li v-for="item in ToDoItems" :key="item.id">
            {{ item.text }}
            <input type="checkbox" v-model="item.isDone">
          </li>
        </ul>

      </div>
    </div>
</template>

<style></style>