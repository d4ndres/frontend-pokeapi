import {defineStore} from 'pinia'
import { ref } from 'vue';

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

  return {
    scrollDirection,
    updateScroll
  }
})
