<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';

import FooterFixed from '@/components/FooterFixed.vue';
import PokeInput from '@/components/PokeInput.vue';
import PokeFavorite from '@/components/PokeFavorite.vue';

import { storeToRefs } from 'pinia';
import { usePokeStore } from '@/stores/pokeStore'
import GoBackHome from '@/components/GoBackHome.vue';
const store = usePokeStore()
const { setPokemonToSearch, initPokemonList, setFavorite } = store
const { pokemonToSearch, pokemonListFiltered, searching } = storeToRefs(store)


// Eventos personalizados del scroll
const el = ref<HTMLElement | null>(null)
import {useScrollEvents} from '@/stores/scrollEvents'
import PokeLoader from '@/components/PokeLoader.vue';
const scrollEventsStore = useScrollEvents()
const {setElInfiniteScroll, updateScroll, handleInfiniteScroll} = scrollEventsStore 

onMounted(() => {
  initPokemonList()
  window.addEventListener('scroll', updateScroll);
  window.addEventListener('scroll', handleInfiniteScroll);
  setElInfiniteScroll(el.value as HTMLElement )
});

onUnmounted(() => {
  window.addEventListener('scroll', updateScroll);
  window.removeEventListener('scroll', handleInfiniteScroll);
});

</script>

<template>
  <RouterView />
  <div class="pokeView">

    <PokeInput @toSearch="setPokemonToSearch" :value="pokemonToSearch" />

    <PokeLoader v-show="searching && !pokemonListFiltered.length"></PokeLoader>
    <GoBackHome v-show="!searching && !pokemonListFiltered.length && pokemonToSearch" />
    
    <div ref="el">
      <TransitionGroup name="list" tag="ul" class="pokelist">
        <li class="item" v-for="pokemon in pokemonListFiltered" :key="pokemon.id">
          <RouterLink class="item-name" :to="{name: 'pokeinfo', params: { nameOrId: pokemon.name }}">
            {{ pokemon.name }}
          </RouterLink>
          <div class="item-wrapper_icon">
            <PokeFavorite @click="setFavorite(pokemon)" :favorite="pokemon.favorite" />
          </div>
        </li>
      </TransitionGroup>
    </div>
    <Transition name="slide-footer">
      <FooterFixed v-show="!(searching && !pokemonListFiltered.length) && !(!searching && !pokemonListFiltered.length && pokemonToSearch)"/>
    </Transition>
  </div>
</template>

<style scoped>
.pokeView {
  padding: 0 30px 100px;
}

/* podría ser 768 en ves de 630 */
@media (min-width: 630px) {
  .pokeView {
    padding: 0 0 100px;
  }
}



.pokelist {
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


/* Animaciones vue elementos de lista */
.list-enter-active,
.list-leave-active {
  transition: all .3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


/* Animación del footer */
.slide-footer-enter-active, .slide-footer-leave-active {
  transition: transform 0.3s ease;
}

.slide-footer-enter-from {
  transform: translateY(100%);
}

.slide-footer-leave-to {
  transform: translateY(100%);
}
</style>