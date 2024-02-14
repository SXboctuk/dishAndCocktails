import {
  type ResponseCocktailApi,
  type Alcoholic,
  type Category,
  type Drink,
  type DrinkSlug,
  type Glass,
  type Ingredient,
  type IngredientName
} from '@/types/cocktails.types'
import axios from 'axios'

const BASE_API_URL = import.meta.env.VITE_COCKTAIL_BASE_URL
const API_URL_SLUG = import.meta.env.VITE_COCKTAIL_API_URL_SLUG
const API_URL = BASE_API_URL + API_URL_SLUG

const cocktailAPI = {
  searchCocktailByName: (param: string) =>
    axios.get<ResponseCocktailApi<Drink[]>>(
      `${API_URL}/search.php?s=a${param}`
    ),
  searchByIngredient: (ingredient: string) =>
    axios.get<ResponseCocktailApi<DrinkSlug[]>>(
      `${API_URL}/filter.php?i=${ingredient}`
    ),
  searchIngredientByName: (param: string) =>
    axios.get<ResponseCocktailApi<Ingredient[]>>(
      `${API_URL}/search.php?i=${param}`
    ),

  lookupFullCocktailDetailsByID: (id: string) =>
    axios.get<ResponseCocktailApi<Drink[]>>(`${API_URL}/lookup.php?i=${id}`),
  lookupIngredientByID: (id: string) =>
    axios.get<ResponseCocktailApi<Ingredient[]>>(
      `${API_URL}/lookup.php?iid=${id}`
    ),
  lookupRandomCocktail: () =>
    axios.get<ResponseCocktailApi<Drink[]>>(`${API_URL}/random.php`),

  filterByAlcoholic: (isAlcoholic: Alcoholic) =>
    axios.get<ResponseCocktailApi<DrinkSlug[]>>(
      `${API_URL}/filter.php?a=${isAlcoholic}`
    ),
  filterByCategory: (category: string) =>
    axios.get<ResponseCocktailApi<DrinkSlug[]>>(
      `${API_URL}/filter.php?c=${category}`
    ),
  filterByGlass: (glass: string) =>
    axios.get<ResponseCocktailApi<DrinkSlug[]>>(
      `${API_URL}/filter.php?g=${glass}`
    ),

  listAllCoctailsByFirstLetter: (letter: string) =>
    axios.get<ResponseCocktailApi<Drink[]>>(
      `${API_URL}/search.php?f=${letter}`
    ),

  listOfCategories: () =>
    axios.get<ResponseCocktailApi<Category[]>>(`${API_URL}/list.php?c=list`),
  listOfGlasses: () =>
    axios.get<ResponseCocktailApi<Glass[]>>(`${API_URL}/list.php?g=list`),
  listOfIngredients: () =>
    axios.get<ResponseCocktailApi<IngredientName[]>>(
      `${API_URL}/list.php?i=list`
    ),

  cocktailThumbImage: (path: string) => axios.get<Blob>(`${path}/preview`),
  cocktailFullImage: (path: string) => axios.get<Blob>(`${path}`),
  ingredientThumbImage: (ingredientName: string) =>
    axios.get<Blob>(`${BASE_API_URL}/images/ingredients/${ingredientName}.png`),
  ingredienThumbURL: (name: string) =>
    `${BASE_API_URL}/images/ingredients/${name}.png`
}

export default cocktailAPI
