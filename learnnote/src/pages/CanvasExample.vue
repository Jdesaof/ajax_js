<script setup>
import { onMounted } from 'vue';

let x = 200;
let y = 200;

onMounted(() => {
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");

    setInterval(() => {
        ctx.clearRect(0, 0, 1200, 800);

        ctx.beginPath();
        ctx.arc(x, y, 60, 0, 2 * Math.PI);
        ctx.strokeStyle = "#00FF00";
        ctx.stroke();
        ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
        ctx.fill();
        ctx.closePath();

    }, 1000 / 60);
});

function move(event) {
    let rect = event.target.getBoundingClientRect();

    let pos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    };

    x = pos.x;
    y = pos.y;
}
</script>

<template>
    <canvas @mousemove="move" id="myCanvas" width="1200" height="800"></canvas>
</template>

<style>
canvas {
    border: 1px solid blue;
}
</style>