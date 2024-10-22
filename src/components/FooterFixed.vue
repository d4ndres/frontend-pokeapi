<script setup lang="ts">
import IconList from './icons/IconList.vue';
import IconStar from './icons/IconStar.vue';
import PokeLink from './PokeLink.vue';
</script>

<template>
  <div class="footer">
    <div class="footer-content">
      <PokeLink :to="{name: 'all'}" :disable="false" class="button" :icon="IconList">
        All
      </PokeLink>
      <PokeLink :to="{name: 'favorites'}" :disable="true" class="button" :icon="IconStar">
        Favorites
      </PokeLink>
    </div>
  </div>
</template>

<style scoped>
.footer {
  height: 80px;
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 18px 30px;
  background-color: #fff;
  box-shadow: 0px -5px 4px 0px rgba(0, 0, 0, 0.051);
}
.footer-content {
  max-width: 570px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.button {
  width: 100%;
}

</style>