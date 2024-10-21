<script setup lang="ts">
import PokeFavorite from './PokeFavorite.vue';

defineProps({
  favorite: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <li class="item">
    <div class="item-name">
      <slot>
        Pokemon name
      </slot>
    </div>
    <div class="item-wrapper_icon">
      <PokeFavorite :favorite="favorite"/>
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
}
.item-name {
  width: 100%;
  font-weight: 500;
}
</style>