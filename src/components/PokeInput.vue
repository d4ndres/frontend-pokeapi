<script setup lang="ts">
import {getCurrentInstance, onMounted, ref} from 'vue'
import IconLens from './icons/IconLens.vue'

let $el
let $input: { focus: () => void; }

onMounted(() => {
  $el = getCurrentInstance()?.vnode.el
  $input = $el?.querySelector('input')
})

const focusToInput = () => {
  $input.focus()
}

const searchTimeout = ref<number | null>(null)

const emit = defineEmits(['update:modelValue', 'input', 'toSearch'])
const emitInput = (ev: Event) => {
  const target = ev.target as HTMLInputElement
  emit('update:modelValue', target.value )
  emit('input', target.value )

  if(searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }

  searchTimeout.value = setTimeout(() => {
    emit('toSearch', target.value)
  }, 700)
}

</script>

<template>
  <div class="pokeInput"  @click="focusToInput" >
    <div class="pokeInput-icon">
      <IconLens />
    </div>
    <input class="pokeInput-input" type="text" placeholder="Search" @input="emitInput">
  </div>
</template>

<style scoped>
.pokeInput {
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.04);
  background-color: #fff;
  display: flex;
}
.pokeInput-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 10px 16px 15px;
}
.pokeInput-input {
  outline: none;
  border: none;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
}
.pokeInput-input::placeholder {
  color: var(--color-disable);
  font-weight: 500;
}

</style>