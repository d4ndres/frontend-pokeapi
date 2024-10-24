import {defineStore} from 'pinia'
import { ref } from 'vue';
import {usePokeStore} from '@/stores/pokeStore'
const pokeStore = usePokeStore()
const {addFromToEventScroll} = pokeStore

export const useScrollEvents = defineStore('scrollEvents', () => {

  const lastScrollY = ref(window.scrollY);
  const scrollDirection = ref<string | null>(null);
  
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
    console.log(element?.getBoundingClientRect().bottom, window.innerHeight)
  
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
