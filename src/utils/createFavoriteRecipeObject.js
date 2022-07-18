export default function createFavoriteRecipeObject(recipe, type) {
  return ({
    id: recipe.idDrink ?? recipe.idMeal,
    type: type === 'foods' ? 'food' : 'drink',
    nationality: recipe.strArea ?? '',
    alcoholicOrNot: recipe.strAlcoholic ?? '',
    category: recipe.strCategory ?? '',
    name: recipe.strDrink ?? recipe.strMeal,
    image: recipe.strDrinkThumb ?? recipe.strMealThumb,
  });
}
