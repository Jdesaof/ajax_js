<script setup>
import { ref } from 'vue';

const speech = ref('Hello students!');
const synth = window.speechSynthesis;
const selectedVoice = ref(null);
const voices = ref([]);
if (synth) {
    synth.onvoiceschanged = () => {
        voices.value = synth.getVoices();
        console.log(voices);
    }
}
function speak(){
    const utterThis = new SpeechSynthesisUtterance(speech.value);
    utterThis.voice = selectedVoice.value;
    synth.speak(utterThis);
}

</script>
s
<template>
    <div class="select">
        <select v-model="selectedVoice">
            <option v-for="voice in voices" :value="voice">{{ voice.name }}</option>
        </select>
    </div>
    <textarea class="textarea" v-model="speech"></textarea>
    <button class="button is-primary" @click="speak">Speak</button>
</template>s