import {defineStore} from 'pinia'
import { ref, computed } from 'vue'
import {useHttpPokeapi} from './httpPokeapi'
const httpPokeapi = useHttpPokeapi()

interface pokemonTypeInList {
  name: string,
  favorite: boolean,
  id: string
}
interface pokemonToShowType {
  image: string,
  name: string,
  id: number,
  weight: number,
  height: number,
  types: Array<string>
}

export const usePokeStore = defineStore('pokeStore', () => {
  // Funcionalidades relacionadas a los favoritos
  const onlyFavorites = ref(false)
  const setOnlyFavorites = ( value : boolean ) => {
    onlyFavorites.value = value
  }

  // Funcionalidades colaterales del input
  const pokemonToShow = ref<pokemonToShowType | null>()
  const searching = ref(false)

  const pokemonToSearch = ref<string>('')  
  const setPokemonToSearch = async ( newValue : string ) => {
    pokemonToSearch.value = newValue.toLowerCase()
    if( !newValue ) return
    searching.value = true
    await searchPokemon(newValue.toLowerCase())
    searching.value = false
  }

  const searchPokemon = async ( nameOrId : string | number ) => {
    
    try {
      if( pokemonToShow.value?.name == nameOrId || pokemonToShow.value?.id == nameOrId ) return
      
      const data = await httpPokeapi.getPokemonByNameOrId({ nameOrId })
      
      const len = pokemonList.value.length
      
      if(!pokemonListFiltered.value.length) {
        pokemonListPush([{
          name: data.name,
          favorite: false,
          id: data.id
        }])

        
        if( data.id - 1 > len) {
          httpPokeapi.getPokemonsByRange({start: len + 1, end: data.id - 1})
          .then( result => {
            pokemonList.value = [
              ...pokemonList.value.slice(0, len),
              ...result,
              ...pokemonList.value.slice(len)
            ] 
          })
        }


        // setToRangeFloorId(data.id)
      }

      if( data ) {
        pokemonToShow.value = {
          image: data.sprites.front_default,
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
    if(!pokemonList.value.length) {
      pokemonList.value = await httpPokeapi.getPokemonsByRange({start: 1, end: 30})

    }
  }
  const addFromToEventScroll = async () => {
    const length = pokemonList.value.length
    const data = await httpPokeapi.getPokemonsByRange({start: length + 1, end: length+30})
    pokemonListPush(data)
  }

  const pokemonListFiltered = computed(() => 
    pokemonList.value.filter( (pokemon:pokemonTypeInList) => {
      if( onlyFavorites.value ) {
        return (pokemon.name.includes(pokemonToSearch.value) ||
          pokemon.id == pokemonToSearch.value) && 
          pokemon.favorite
      } else {
        return pokemon.name.includes(pokemonToSearch.value) || pokemon.id == pokemonToSearch.value
      }
    })
  )

  const setFavorite = ( pokemon : pokemonTypeInList ) => {
    const index = pokemonList.value.findIndex( item => pokemon.id == item.id )
    const item = pokemonList.value[index]
    const updatedPokemon = {
      ...item,
      favorite: !item.favorite
    }
    pokemonList.value.splice(index, 1, updatedPokemon)
  }

  return { 
    pokemonList, 
    pokemonListFiltered,
    initPokemonList, 
    addFromToEventScroll, 
    setFavorite,
    pokemonToSearch,
    setPokemonToSearch,
    onlyFavorites,
    setOnlyFavorites,
    searching,
    searchPokemon,
    pokemonToShow
  }
})