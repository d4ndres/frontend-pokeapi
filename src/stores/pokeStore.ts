import {defineStore} from 'pinia'
import { ref, computed } from 'vue'
import {useHttpPokeapi} from './httpPokeapi'
const httpPokeapi = useHttpPokeapi()

interface pokemonTypeInList {
  name: string,
  id: string
}
interface pokemonToShowType {
  name: string,
  id: number,
  weight: number,
  height: number,
  types: Array<string>
}

export const usePokeStore = defineStore('pokeStore', () => {
  
  // Funcionalidades colaterales del input
  const pokemonToShow = ref<pokemonToShowType | null>()

  const pokemonToSearch = ref<string>('')  
  const setPokemonToSearch = ( newValue : string ) => {
    pokemonToSearch.value = newValue.toLowerCase()
    if( !newValue ) return 
    searchPokemon(newValue.toLowerCase())
  }

  const searchPokemon = async ( nameOrId : string | number ) => {
    try {
      if( pokemonToShow.value?.name == nameOrId || pokemonToShow.value?.id == nameOrId ) return

      const data = await httpPokeapi.getPokemonByNameOrId({ nameOrId })
      
      if(!pokemonListFiltered.value.length) {
        pokemonListPush([{
          name: data.name,
          id: data.id
        }])

        setToRangeFloorId(data.id)
      }

      if( data ) {
        pokemonToShow.value = {
          name: data.name,
          id: data.id,
          weight: data.weight,
          height: data.height,
          types: data.types.map( (item: { type: { name: string } }) => item.type.name )
        }
      }
    } catch (error) {
      // to Logger
      console.log(error)
    }

  }
  
  
  // Funcionalidades de la lista a mostrar
  const pokemonList = ref<pokemonTypeInList[]>([]) 

  const pokemonListPush = ( data: pokemonTypeInList[] ) => {
    pokemonList.value = [ ...pokemonList.value, ...data]
  }

  const initPokemonList = async () => {
    pokemonList.value = await httpPokeapi.getPokemonsByRange({start: 1, end: 30})
  }
  const addFromToEventScroll = async () => {
    const length = pokemonList.value.length
    const data = await httpPokeapi.getPokemonsByRange({start: length + 1, end: length+30})
    pokemonListPush(data)
  }
  const setToRangeFloorId = async ( id : number) => {
    pokemonList.value = await httpPokeapi.getPokemonsByRange({start: 1, end: id})
  }

  const pokemonListFiltered = computed(() => pokemonList.value.filter( (pokemon:pokemonTypeInList) => 
    pokemon.name.includes(pokemonToSearch.value) ||
    pokemon.id == pokemonToSearch.value
  ))

  return { 
    pokemonList, 
    pokemonListFiltered,
    initPokemonList, 
    addFromToEventScroll, 
    pokemonToSearch,
    setPokemonToSearch,

  }
})