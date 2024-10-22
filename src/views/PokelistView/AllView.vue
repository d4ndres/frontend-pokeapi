<script setup lang="ts">
import { onMounted } from 'vue'
import PokelistItem from '@/components/PokelistItem.vue';
import {usePokeStore} from '@/stores/pokeStore'
import { storeToRefs } from 'pinia';
const store = usePokeStore()
const {initPokemonList} = store
const {pokemonListFiltered} = storeToRefs(store)

onMounted(() => {
  initPokemonList()
})

</script>

<template>
  <ul class="pokelist">
    <PokelistItem v-for="{ name } in pokemonListFiltered" :key="name">{{ name }}</PokelistItem>
  </ul>
</template>

<style scoped>
.pokelist {
  margin-top: 40px;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>