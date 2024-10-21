<script setup lang="ts">
import FooterFixed from '@/components/FooterFixed.vue';
import PokeInput from '@/components/PokeInput.vue';
import PokelistItem from '@/components/PokelistItem.vue';

import {ref} from 'vue'
const pokemonList = ref([])
import {res} from '@/mocks/restapi.js'
res().then(({results}:any)=> {
  pokemonList.value = results
})
</script>

<template>
  <div class="pokeView">
    <PokeInput />
    <ul class="pokelist">
      <PokelistItem v-for="{name} in pokemonList" :key="name">{{ name }}</PokelistItem>
    </ul>
  </div>
  <FooterFixed/>
</template>

<style scoped>
.pokeView {
  padding: 0 30px 90px;
}

.pokelist {
  margin-top: 40px;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>