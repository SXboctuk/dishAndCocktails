import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { DrinkSlugNormalized } from '@/types/cocktails.types'
import useCocktails from '@/composables/useCocktails'
import useCocktailsNormalizerData from '@/composables/useCocktailsNormalizerData'

const useDrinksByIngredientStore = defineStore(
  'cocktails/drinkByIngredient',
  () => {
    const drinksSlugs = ref<Record<string, DrinkSlugNormalized[]>>({})

    const { searchByIngredient } = useCocktails()
    const { normalizeDrinkSlugs } = useCocktailsNormalizerData()

    const getDrinks = (ingredient: string) => {
      const error = ref<string | null>(null)
      const pending = ref<boolean>(false)

      const fetch = (ingredient: string) => {
        pending.value = true
        searchByIngredient(ingredient)
          .then((res) => {
            const dinksSlugRaw = res.data.drinks

            if (dinksSlugRaw) {
              const drinksSlugNormalized = normalizeDrinkSlugs(dinksSlugRaw)
              drinksSlugs.value[ingredient] = drinksSlugNormalized
            } else {
              throw new Error('Drinks not found')
            }
          })
          .catch((e: Error) => (error.value = e.message))
          .finally(() => (pending.value = false))
      }

      if (!drinksSlugs.value[ingredient]) {
        fetch(ingredient)
      }

      return {
        error,
        pending,
        drinksSlugs: computed(() => drinksSlugs.value[ingredient])
      }
    }

    return { getDrinks, drinksSlugs }
  }
)

export default useDrinksByIngredientStore
