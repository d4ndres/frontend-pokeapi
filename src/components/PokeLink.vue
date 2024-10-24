<script setup lang="ts">
defineProps({
  disable: {
    type: Boolean,
    default: false
  },
  icon: {
  },
  to: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <RouterLink :to="to" class="button" :class="{ disable }">
    <span class="button-icon" v-if="icon">
      <component :is="icon" width="20" height="20" />
    </span>
    <slot>
      Get started
    </slot>
  </RouterLink>
</template>

<style scoped>
.button {
  min-width: 150px;
  padding: 11px 20px;
  /* padding: 0.6rem 1.1rem; */
  border-radius: 60px;
  background-color: var(--color-primary);
  outline: none;
  border: none;
  color: #fff;
  cursor: pointer;
  transition: .3s;
  display: flex;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
}
.button.disable {
  background-color: var(--color-disable);
}

.button:active {
  background-color: var(--color-pressed);
}
</style>