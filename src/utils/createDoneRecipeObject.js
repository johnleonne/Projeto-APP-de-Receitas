export default function createDoneRecipeObject(recipe, type) {
  return ({
    id: recipe.idDrink ?? recipe.idMeal,
    type: type === '/foods' ? 'food' : 'drink',
    nationality: recipe.strArea ?? '',
    category: recipe.strCategory ?? '',
    alcoholicOrNot: recipe.strAlcoholic ?? '',
    name: recipe.strDrink ?? recipe.strMeal,
    image: recipe.strDrinkThumb ?? recipe.strMealThumb,
    doneDate: new Date(Date.now()).toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
    tags: recipe.strTags?.split(',') ?? [],
  });
}
