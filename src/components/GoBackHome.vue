<script setup lang="ts">
import PokeButton from './PokeButton.vue';
import { usePokeStore } from '@/stores/pokeStore'
const store = usePokeStore()
const { setPokemonToSearch } = store
</script>

<template>
  <div class="goBackHome">
    <h2 class="goBackHome-title">Uh-oh!</h2>
    <p class="goBackHome-description">You look lost on your journey!</p>
    <PokeButton class="goBackHome-link" @click="setPokemonToSearch('')">Go back home</PokeButton>
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