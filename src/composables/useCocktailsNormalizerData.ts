import type {
  Drink,
  NormalizedDrink,
  NormalizedDrinkIngredients
} from '@/types/cocktails.types'

const normalizeDrink = (data: Drink): NormalizedDrink => {
  const ingredients: NormalizedDrinkIngredients[] = []

  for (let i = 1; i <= 15; i++) {
    const ingredient = data[`strIngredient${i}`]
    const measure = data[`strMeasure${i}`]

    if (typeof ingredient === 'string') {
      ingredients.push({ name: ingredient, measure: measure ?? null })
    } else {
      break
    }
  }

  return {
    id: data.idDrink,
    name: data.strDrink,
    category: data.strCategory,
    glass: data.strGlass,
    thumb: data.strDrinkThumb,
    instructions: data.strInstructions,
    alcoholic: data.strAlcoholic,
    creativeCommonsConfirmed: data.strCreativeCommonsConfirmed,
    drinkAlternative: data.strDrinkAlternate,
    tags: data.strTags?.split(',') ?? [],
    videoSrc: data.strVideo,
    IBA: data.strIBA,
    ingredients: ingredients
  }
}

const useCocktailsNormalizerData = () => {
  return { normalizeDrink }
}

export default useCocktailsNormalizerData
