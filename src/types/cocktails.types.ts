export type CreativeCommonsConfirmed = 'Yes' | 'No'

export type Alcohol = 'Yes' | 'No' | null

export type Alcoholic = 'Alcoholic' | 'Non alcoholic' | 'Optional alcohol'

export type Drink = {
  idDrink: string
  strDrink: string
  strCategory: string
  strGlass: string
  strDrinkThumb: string
  strInstructions: string
  strAlcoholic: Alcoholic
  strCreativeCommonsConfirmed: CreativeCommonsConfirmed
  strDrinkAlternate: string | null
  strTags: string | null
  strVideo: string | null
  strIBA: string | null
  strInstructionsES: string | null
  strInstructionsDE: string | null
  strInstructionsFR: string | null
  strInstructionsIT: string
  'strInstructionsZH-HANS': string | null
  'strInstructionsZH-HANT': string | null
  [key: `strIngredient${number}`]: string | null | undefined
  [key: `strMeasure${number}`]: string | null | undefined
  strImageSource: string | null
  strImageAttribution: string | null
  dateModified: string | null
  thumbnailFilename: string | null
}
export type NormalizedDrinkIngredients = {
  name: string
  measure: string | null
}
export type NormalizedDrink = {
  id: string
  name: string
  category: string
  glass: string
  thumb: string
  instructions: string
  alcoholic: Alcoholic
  creativeCommonsConfirmed: CreativeCommonsConfirmed
  drinkAlternative: string | null
  tags: string[]
  videoSrc: string | null
  IBA: string | null
  ingredients: NormalizedDrinkIngredients[]
}

export type Ingredient = {
  idIngredient: string
  strIngredient: string
  strDescription: string | null
  strType: string | null
  strAlcohol: Alcohol
  strABV: string | null
}

export type DrinkSlug = {
  strDrink: string
  strDrinkThumb: string
  idDrink: string
}

export type Category = {
  strCategory: string
}
export type CategoryNormalized = {
  category: string
}

export type Glass = {
  strGlass: string
}
export type GlassNormalized = {
  glass: string
}

export type IngredientName = {
  strIngredient1: string
}
export type IngredienNametNormalized = {
  ingredient: string
}

export type ResponseCocktailApi<T> = {
  drinks: T
}
