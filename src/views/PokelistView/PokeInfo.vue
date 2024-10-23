<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { usePokeStore } from '@/stores/pokeStore'
import { storeToRefs } from 'pinia';
import PokeButton from '@/components/PokeButton.vue';
import PokeModal from '@/components/PokeModal.vue';
import PokeFavorite from '@/components/PokeFavorite.vue';

const store = usePokeStore()
const { searchPokemon, setFavoriteById, pokemonToShowReset } = store
const { pokemonToShow } = storeToRefs(store)

const props = defineProps(['nameOrId'])

onMounted(async () => {
  await searchPokemon(props.nameOrId)
  console.log(pokemonToShow.value)
})

const copyToClipBoard = () => {
  if (!pokemonToShow.value || !pokemonToShow) return

  const stats = Object.entries(pokemonToShow.value).filter(([key]) => key !== 'image').map(([key, value]) => {
    if (key === 'types' || key === 'favorite') {
      return `${key}: [${Object.values(value)}]`
    } else {
      return `${key}: ${value}`
    }
  }).join(', ');
  navigator.clipboard.writeText(stats)
}


const router = useRouter()
const close = () => {
  pokemonToShowReset()
  router.push({ name: 'pokelist' })
}

const open = true

</script>


<template>
  <PokeModal :open="open" @close="close">
    <div class="pokeinfo">
      <div class="pokeinfo-background">
        <img :src="pokemonToShow?.image" :alt="pokemonToShow?.name">
      </div>
      <div class="pokeinfo-content">
        <ul class="pokeinfo-stats">
          <li>
            <strong>Name:</strong> {{ pokemonToShow?.name }}
          </li>  
          <li>
            <strong>Weight:</strong> {{ pokemonToShow?.weight }}
          </li>
          <li>
            <strong>Height:</strong> {{ pokemonToShow?.height }}
          </li>
          <li>
            <strong>Types:</strong> {{ pokemonToShow?.types.join(', ') }}
          </li>
        </ul>
        <div class="pokeinfo-actions">
          <PokeButton @click="copyToClipBoard">Share to my friends</PokeButton>
          <PokeFavorite @click="setFavoriteById(pokemonToShow?.id || 1)" :favorite="pokemonToShow?.favorite" />
        </div>
      </div>
    </div>
  </PokeModal>
</template>

<style scoped>
.pokeinfo {
  max-width: 570px;
  width: 100%;
  margin: 30px;
  background-color: #fff;
}


.pokeinfo-background {
  width: 100%;
  height: 220px;
  background-image: url('@/assets/poke_bg.png');
  background-size: 220%;
  background-position: center 90%;
  display: flex;
  justify-content: center;
}

.pokeinfo-background img {
  object-fit: cover;
  height: 100%;
}

.pokeinfo-content {
  margin: 10px 28px 20px;
}

.pokeinfo-actions {
  font-size: 10px;
  display: flex;
  justify-content: space-between;
  gap: 2px;
}

.pokeinfo-stats {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.pokeinfo-stats > * {
  padding: 10px 0;
  border-bottom: 1px var(--color-bg-alt2) solid;
}
</style>