<script setup lang="ts">
import FooterFixed from '@/components/FooterFixed.vue';
import PokeInput from '@/components/PokeInput.vue';

import { storeToRefs } from 'pinia';
import {usePokeStore} from '@/stores/pokeStore'
const store = usePokeStore()
const {setPokemonToSearch} = store
const {pokemonToSearch} = storeToRefs(store)

</script>

<template>
  <div class="pokeView">
    <PokeInput @toSearch="setPokemonToSearch" :value="pokemonToSearch"/>
    <RouterView />
  </div>
  <FooterFixed />
</template>

<style scoped>
.pokeView {
  padding: 0 30px 80px;
}

</style>