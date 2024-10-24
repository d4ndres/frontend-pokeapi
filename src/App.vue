<script setup lang="ts">

import {onMounted, onUnmounted} from 'vue'
import {useScrollEvents} from '@/stores/scrollEvents'
const scrollEventsStore = useScrollEvents()
const {updateScroll} = scrollEventsStore 


onMounted(() => {
  window.addEventListener('scroll', updateScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll);
});
</script>

<template>
  <main class="main">
    <RouterView />
  </main>
</template>

<style scoped>
.main {
  max-width: 570px;
  margin: 0 auto;
}
</style>