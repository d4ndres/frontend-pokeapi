<script setup lang="ts">
import PokeButton from '@/components/PokeButton.vue'
</script>

<template>
  <div class="homeView">
    <div class="homeView-image">
      <img src="@/assets/pikaicon.svg" />
    </div>
    <div class="homeView-content">
      <h2 class="homeView-content_title">Welcome to Pokédex</h2>
      <p class="homeView-content_description">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
      <div class="homeView-content-link">
        <RouterLink :to="{ name: 'pokelist'}">
          <PokeButton>Get started</PokeButton>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homeView {
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  text-align: center
}

/* En mi pantalla se mira mucho mejor sin el margen */
@media (max-height: 700px) {
  .homeView {
    margin-top: 0px;
  }
}

.homeView-image {
  margin: 35px 25px;
}
.homeView-content {
  margin: 25px 30px;
}
.homeView-content_title {
  margin-bottom: 30px;
}
.homeView-content_description {
  margin-bottom: 50px;
}
.homeView-content-link {
  display: flex;
  justify-content: center;
}

</style>