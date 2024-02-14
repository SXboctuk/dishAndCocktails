import cocktailAPI from '@/api/cocktail.api'

const useCocktails = () => {
  return { ...cocktailAPI }
}

export default useCocktails
