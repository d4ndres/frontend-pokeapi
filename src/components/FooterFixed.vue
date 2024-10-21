<script setup lang="ts">
import IconList from './icons/IconList.vue';
import IconStar from './icons/IconStar.vue';
import PokeButton from './PokeButton.vue';
</script>

<template>
  <div class="footer">
    <PokeButton :disable="false" class="button" :icon="IconList">
      All
    </PokeButton>
    <PokeButton :disable="true" class="button" :icon="IconStar">
      Favorites
    </PokeButton>
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
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.button {
  width: 100%;
}

</style>