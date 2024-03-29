import { computed, ref, toRef } from 'vue'
import { defineStore } from 'pinia'
import type { GlassNormalized } from '@/types/cocktails.types'
import useCocktails from '@/composables/useCocktails'
import useCocktailsNormalizerData from '@/composables/useCocktailsNormalizerData'

export const useGlassesStore = defineStore('cocktails/glasses', () => {
  const glasses = ref<GlassNormalized[]>([])
  const pending = ref<boolean>(false)
  const error = ref<string | null>(null)

  function init() {
    const { listOfGlasses } = useCocktails()
    const { normalizeGlasses } = useCocktailsNormalizerData()

    error.value = null
    pending.value = true

    listOfGlasses()
      .then((res) => (glasses.value = normalizeGlasses(res.data.drinks)))
      .catch((e: Error) => (error.value = e.message))
      .finally(() => (pending.value = false))
  }

  function glassesFilter(name: string) {
    return () =>
      glasses.value.filter((glass) =>
        glass.toLowerCase().includes(name.toLowerCase())
      )
  }
  return {
    glasses: computed(() => glasses.value),
    glassesFilter: glassesFilter,
    pending: computed(() => pending.value),
    error: computed(() => error.value),

    init
  }
})
