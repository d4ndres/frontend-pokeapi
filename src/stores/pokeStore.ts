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
  types: Array<string>,
  favorite: boolean
}

const initialPokemonToShow = {
  image: 'string',
  name: 'string',
  id: 0,
  weight: 0,
  height: 0,
  types: [],
  favorite: false
}

export const usePokeStore = defineStore('pokeStore', () => {
  // Funcionalidades relacionadas a los favoritos
  const onlyFavorites = ref(false)
  const setOnlyFavorites = ( value : boolean ) => {
    onlyFavorites.value = value
  }

  // Funcionalidades colaterales del input
  const pokemonToShow = ref<pokemonToShowType>(initialPokemonToShow)
  const pokemonToShowReset = () => {
    pokemonToShow.value = initialPokemonToShow
  }

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
          getPokemonByRangeMapped({start: len + 1, end: data.id - 1})
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
          types: data.types.map( (item: { type: { name: string } }) => item.type.name ),
          favorite: getFavoriteById(data.id)
        }
      }
    } catch (error) {
      // to Logger
      console.log(error)
    }
    
  }
  
  
  // Funcionalidades de la lista a mostrar
  const pokemonList = ref<pokemonTypeInList[]>([])

  const getPokemonByRangeMapped = async ( { start, end} : { start: number, end: number })  => {
    const data =  await httpPokeapi.getPokemonsByRange({start, end})
    console.log(data)
    const lengthOfList = pokemonList.value.length

    return data.map(( info : { name: string }, index : number ) => ({
      name: info.name,
      favorite: false,
      id: String( lengthOfList + index + 1 )
    }))
  }

  const pokemonListPush = ( data: pokemonTypeInList[] ) => {
    pokemonList.value = [ ...pokemonList.value, ...data]
  }

  const initPokemonList = async () => {
    if(!pokemonList.value.length) {
      pokemonList.value = await getPokemonByRangeMapped({start: 1, end: 30})

    }
  }

  const isAutoSearch = ref(false)
  const addFromToEventScroll = async () => {

    if(!isAutoSearch.value) {
      const length = pokemonList.value.length
      isAutoSearch.value = true
      const data = await getPokemonByRangeMapped({start: length + 1, end: length+30})
      isAutoSearch.value = false
      pokemonListPush(data)
    }
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

  const setFavoriteById = ( id : string | number ) => {
    const index = pokemonList.value.findIndex( item => id == item.id )
    const item = pokemonList.value[index]
    const updatedPokemon = {
      ...item,
      favorite: !item.favorite
    }
    pokemonList.value.splice(index, 1, updatedPokemon)


    pokemonToShow.value = {
      ...pokemonToShow?.value,
      favorite: !pokemonToShow.value?.favorite
    }
  }

  const getFavoriteById = ( id : string | number ) => {

    const index = pokemonList.value.findIndex( item => id == item.id )
    return pokemonList.value[index].favorite
  }

  const setFavorite = ( pokemon : pokemonTypeInList ) => {
    setFavoriteById(pokemon.id)
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
    pokemonToShow,
    setFavoriteById,
    pokemonToShowReset
  }
})