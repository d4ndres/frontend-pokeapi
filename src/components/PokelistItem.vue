<script setup lang="ts">
import { ref } from 'vue';
import PokeFavorite from './PokeFavorite.vue';
import PokeModal from './PokeModal.vue';

interface pokemonTypeInList {
  name: string,
  favorite: boolean,
  id: string
}

interface props {
  pokemon: pokemonTypeInList
}

defineProps<props>()

import {usePokeStore} from '@/stores/pokeStore'
const store = usePokeStore()
const {setFavorite} = store

const showModal = ref(false)

</script>

<template>
  <Teleport to="body">
    <PokeModal v-model="showModal">{{pokemon.name}}</PokeModal>
  </Teleport>
  <li class="item">
    <div class="item-name" @click="showModal = true">
      {{ pokemon.name }}
    </div>
    <div class="item-wrapper_icon">
      <PokeFavorite @click="setFavorite(pokemon)" :favorite="pokemon.favorite"/>
    </div>
  </li>
</template>

<style>
.item {
  background-color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 10px;
  content-visibility: auto;
}
.item-name {
  width: 100%;
  font-weight: 500;
}
</style>