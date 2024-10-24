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
  focused.value = true
  $input.focus()
}

import { storeToRefs } from 'pinia';
import {useScrollEvents} from '@/stores/scrollEvents'
const scrollEventsStore = useScrollEvents()
const {scrollDirection} = storeToRefs(scrollEventsStore)
const focused = ref(false)


const searchTimeout = ref<number | null>(null)
const emit = defineEmits(['update:modelValue', 'input', 'toSearch'])
const emitInput = (ev: Event) => {
  const target = ev.target as HTMLInputElement
  emit('update:modelValue', target.value )
  emit('input', target.value )

  if(searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }

  if(target.value) {
    searchTimeout.value = setTimeout(() => {
      emit('toSearch', target.value)
    }, 700)
  } else {
    emit('toSearch', target.value)
  }
}

defineProps(['value', 'modelValue'])


</script>

<template>
  <div class="pokeView-wrapper_input" :class="{ 'hide': scrollDirection === 'down' && !focused}">
    <div class="pokeInput"  @click="focusToInput" >
      <div class="pokeInput-icon">
        <IconLens />
      </div>
      <input class="pokeInput-input" type="text" placeholder="Search" 
      :value="modelValue || value"
      @input="emitInput" 
      @blur="focused = false"
      @focused="focused = true">
    </div>
  </div>
</template>

<style scoped>

.pokeView-wrapper_input {
  padding: 35px 0 40px;
  background-color: var(--color-bg);
  position: sticky;
  top: 0;
  z-index: 1;
  /* opacity: 1; */
  transition: .5s ease-out;
  transform: translateY(0%);
}

.pokeView-wrapper_input.hide {
  /* opacity: 0; */
  transform: translateY(-100%);
}


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