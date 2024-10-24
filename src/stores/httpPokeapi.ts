import { defineStore} from 'pinia'
const URL = 'https://pokeapi.co/api/v2/pokemon'
import {useHttpClient} from '@/stores/httpClient'
const http = useHttpClient()

export const useHttpPokeapi = defineStore('httpPokeapi', () => {
  const getPokemonByNameOrId = async ({nameOrId}:{ nameOrId: string | number}) => {
    try {
      const response = await http.get({ url: `${URL}/${nameOrId}` })
      if (!response.ok) {
        throw new Error(`Error al obtener Pokémon: ${nameOrId}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error en getPokemonByNameOrId:', error)
      throw error
    }
  }

  const getPokemonsByRange = async ({ start, end}:{ start: number, end: number }) => {
    try {
      const limit = end - start + 1;
      const offset = start - 1;

      const response = await http.get({ url: `${URL}?limit=${limit}&offset=${offset}`})
      if (!response.ok) {
        throw new Error('Error al obtener Pokémon por rango')
      }
      const data = await response.json()
      return data.results
    } catch (error) {
      console.error('Error en getPokemonsByRange:', error)
      throw error
    }
  }

  return {getPokemonsByRange, getPokemonByNameOrId}
})