<script setup lang="ts">
import { onMounted } from 'vue';

import FooterFixed from '@/components/FooterFixed.vue';
import PokeInput from '@/components/PokeInput.vue';
import PokeFavorite from '@/components/PokeFavorite.vue';

import { storeToRefs } from 'pinia';
import { usePokeStore } from '@/stores/pokeStore'
import GoBackHome from '@/components/GoBackHome.vue';
import { useRouter } from 'vue-router';
const store = usePokeStore()
const { setPokemonToSearch, initPokemonList, setFavorite } = store
const { pokemonToSearch, pokemonListFiltered, searching } = storeToRefs(store)


interface pokemonTypeInList {
  name: string,
  favorite: boolean,
  id: string
}

onMounted(() => {
  initPokemonList()
})


const router = useRouter()
const goTo = (pokemon: pokemonTypeInList) => {
  router.push({ name: 'pokeinfo', params: { nameOrId: pokemon.name }})
}

</script>

<template>
  <RouterView />
  <div class="pokeView">
    <PokeInput @toSearch="setPokemonToSearch" :value="pokemonToSearch" />
    <!-- {{ searching }} -->
    <GoBackHome v-show="!searching && !pokemonListFiltered.length && pokemonToSearch" />
    <TransitionGroup name="list" tag="ul" class="pokelist">
      <li class="item" v-for="pokemon in pokemonListFiltered" :key="pokemon.id">
        <div class="item-name" @click="goTo(pokemon)">
          {{ pokemon.name }}
        </div>
        <div class="item-wrapper_icon">
          <PokeFavorite @click="setFavorite(pokemon)" :favorite="pokemon.favorite" />
        </div>
      </li>
    </TransitionGroup>
    <FooterFixed />
  </div>
</template>

<style scoped>
.pokeView {
  padding: 0 30px 80px;
}

.pokelist {
  margin-top: 40px;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

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

.list-enter-active,
.list-leave-active {
  transition: all .3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>