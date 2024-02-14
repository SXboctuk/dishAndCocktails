import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IngredienNametNormalized } from '@/types/cocktails.types'
import useCocktails from '@/composables/useCocktails'
import useCocktailsNormalizerData from '@/composables/useCocktailsNormalizerData'

export const useIngredientsStore = defineStore('cocktails/ingredients', () => {
  const ingredients = ref<IngredienNametNormalized[]>([])
  const pending = ref<boolean>(false)
  const error = ref<string | null>(null)

  function init() {
    const { listOfIngredients } = useCocktails()
    const { normalizeIngredientNames } = useCocktailsNormalizerData()

    error.value = null
    pending.value = true

    listOfIngredients()
      .then(
        (res) => (ingredients.value = normalizeIngredientNames(res.data.drinks))
      )
      .catch((e: Error) => (error.value = e.message))
      .finally(() => (pending.value = false))
  }

  return { ingredients, pending, error, init }
})
