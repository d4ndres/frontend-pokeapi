<script setup lang="ts">

defineProps(['modelValue', 'open'])
const emit = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close', null)
}
</script>


<template>
  <div class="overflow" v-show="modelValue || open">
    <div @mousedown="close" :class="{'open': modelValue || open}" class="curtain">
      <div @mousedown.stop  class="overflow-body">
        <slot :close="close" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.overflow {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 50;
  transition: display .3s ease allow-discrete;
}
.curtain {
  width: 100vw;
  height: 100vh;
  transition: all .3s ease;
  backdrop-filter: blur(0px);
  background: rgba(0,0,0,.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.curtain.open {
  background: rgba(0,0,0,.7);
  backdrop-filter: blur(4px);
  transition: .3s ease;

  @starting-style {
    background: rgba(0,0,0,.7);
    backdrop-filter: blur(0px);
  }
}

.curtain.open .overflow-body {
  display: flex;
  justify-content: center;
  align-items: center;

  transform: scale(100%);
  transition: all .3s ease;
  @starting-style {
    transform: scale(0%);
  }
}

.curtain .overflow-body {
  transform: scale(0%);
  transition: all .3s ease;
}
</style>