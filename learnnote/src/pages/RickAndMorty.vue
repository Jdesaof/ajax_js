<script setup>
import axios from 'axios';
import { ref } from 'vue';
import CharacterCard from '../components/CharacterCard.vue';
let characters = ref([]);
let info = ref({
    count: 0,
    pages: 0,
    next: null,
    prev: null,
});

await getCharacters('https://rickandmortyapi.com/api/character');

async function getCharacters(url) {
    const res = await axios.get(url);
    characters.value = res.data.results;
    info.value = res.data.info;  
}

async function next() {
    await getCharacters(info.value.next);
}

async function prev() {
    await getCharacters(info.value.prev);
}

</script>
<template>
    <div class="is-flex is-justify-content-space-between mb-2">
    <button class="button is-primary" :disabled="!info.prev" @click="prev">Prev</button>
    <button class="button is-primary" :disabled="!info.next" @click="next">Next</button>
</div>
    <div class="columns is-multiline">
        <div class="column" v-for="character in characters">
            <CharacterCard :character="character"></CharacterCard>
        </div>
    </div>
</template>