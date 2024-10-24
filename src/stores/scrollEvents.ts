import {defineStore} from 'pinia'
import { ref } from 'vue';
import {usePokeStore} from '@/stores/pokeStore'
const pokeStore = usePokeStore()
const {addFromToEventScroll} = pokeStore

type direction = 'down' | 'up'

export const useScrollEvents = defineStore('scrollEvents', () => {

  const lastScrollY = ref(window.scrollY);
  const scrollDirection = ref<direction | null>(null);
  
  const updateScroll = () => {
    const currentScrollY = window.scrollY;
  
    if (currentScrollY > lastScrollY.value) {
      scrollDirection.value = 'down';
    } else if (currentScrollY < lastScrollY.value) {
      scrollDirection.value = 'up';
    }
  
    lastScrollY.value = currentScrollY;
  };

  const el = ref<HTMLElement | null>(null)
  const setElInfiniteScroll = (element : HTMLElement) => {
    el.value = element
  }
  const handleInfiniteScroll = () => {
    if( !el.value ) return
  
    const element = el.value
    
    if( element?.getBoundingClientRect().bottom < window.innerHeight ) {
      addFromToEventScroll()
    }
  }

  return {
    scrollDirection,
    updateScroll,
    handleInfiniteScroll,
    setElInfiniteScroll
  }
})
