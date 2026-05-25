<script setup>
import axios from 'axios';
import { ref } from 'vue';
import CharacterCard from '../components/CharacterCard.vue';
let characters = ref([]);
const res = await axios.get('https://rickandmortyapi.com/api/character');
characters.value = res.data.results;

</script>
<template>
    <div class="columns is-multiline">
        <div class="column" v-for="character in characters">
            <CharacterCard :character="character"></CharacterCard>
        </div>
    </div>
</template>