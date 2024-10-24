import { describe, beforeEach, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../views/HomeView.vue'


describe('PokeTest ', () => {
  let wrapper: ReturnType<typeof mount>
  beforeEach(() => {
    wrapper = mount(HomeView)
  })

  it('Prueba de la vista home "Get started"', () => {
    expect(wrapper.text()).toContain('Get started')
  })
})


import { setActivePinia, createPinia } from 'pinia'
import {useHttpClient} from '../stores/httpClient'
import {useHttpPokeapi} from '../stores/httpPokeapi'

describe('Testing pinia Store ', () => {
  const URL = 'https://pokeapi.co/api/v2/pokemon'

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Fetches Pokémon data using the httpClient store', async () => {
    
    const http = useHttpClient()
    const response = await http.get({ url: `${URL}/bulbasaur`})
    const result = await response.json()
    expect( result.id ).toBe(1)
  })

  describe('Fetches Pokémon data using the httpPokeapi ', () => {
    let httpPokeapi

    beforeEach(() => {
      httpPokeapi = useHttpPokeapi()
    })

    it('Pokémon name', async () => {
      const pokemon = await httpPokeapi.getPokemonByNameOrId({nameOrId: 'riolu'})
      expect( pokemon.id ).toBe(447)
    })
  
    it('Pokémon Id', async () => {
      const pokemon = await httpPokeapi.getPokemonByNameOrId({nameOrId: 94})
      expect( pokemon.name ).toBe('gengar')
    })
  
    it('Fetches Pokémon data by range', async  () => {
      const start = 1
      const end = 30
      const pokemons = await httpPokeapi.getPokemonsByRange({ start, end })
      expect(pokemons.length).toBe(end - start + 1)
    })
  })
})
