import { defineStore} from 'pinia'


export const useHttpClient = defineStore('httpClient', () => {

  const get = async ({ url }: { url: string }): Promise<Response> => {
    return await fetch(url)
  }

  return { get }
})