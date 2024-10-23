<script setup lang="ts">
import PokeLink from './PokeLink.vue';
</script>

<template>
  <div class="goBackHome">
    <h2 class="goBackHome-title">Uh-oh!</h2>
    <p class="goBackHome-description">You look lost on your journey!</p>
    <PokeLink class="goBackHome-link" :to="{name: 'pokelist'}">Go back home</PokeLink>
  </div>
</template>

<style scoped>
.goBackHome {
  margin-top: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.goBackHome-title {
  margin-bottom: 10px;
  font-size: 36px;
}
.goBackHome-description {
  margin-bottom: 25px;
  font-size: 20px;
}

.goBackHome-link {
  width: max-content;
}
</style>