import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { NormalizedDrink } from '@/types/cocktails.types'
import useCocktails from '@/composables/useCocktails'
import useCocktalsNoormalizerData from '@/composables/useCocktailsNormalizerData'

const useDetailsStore = defineStore('cocktails/details', () => {
  const { normalizeDrink } = useCocktalsNoormalizerData()
  const { lookupFullCocktailDetailsByID } = useCocktails()
  const drinks = ref<Record<string, NormalizedDrink>>({})

  function getDetails(id: string) {
    const pending = ref<boolean>(false)
    const error = ref<string | null>(null)
    function fetch(id: string) {
      error.value = null
      pending.value = true

      lookupFullCocktailDetailsByID(id)
        .then((res) => {
          const drinkRes = res.data.drinks[0]
          if (drinkRes) {
            drinks.value[id] = normalizeDrink(drinkRes)
          } else {
            throw new Error('Cocktail not found')
          }
        })
        .catch((e: Error) => (error.value = e.message))
        .finally(() => (pending.value = false))
    }
    if (!drinks.value[id]) {
      fetch(id)
    }
    return { error, pending, details: computed(() => drinks.value[id]) }
  }

  return { getDetails, drinks }
})

export default useDetailsStore
