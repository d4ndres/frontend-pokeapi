<script setup lang="ts">
defineProps({
  disable: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button :class="{
    disable
  }">
    <slot>
      Get started
    </slot>
  </button>
</template>

<style scoped>
button {
  padding: 0.6rem 1.1rem;
  border-radius: 60px;
  background-color: var(--color-primary);
  outline: none;
  border: none;
  color: #fff;
  cursor: pointer;
  transition: .3s;
}
button.disable {
  background-color: var(--color-disable);
}

button:active {
  background-color: var(--color-pressed);
}

</style>