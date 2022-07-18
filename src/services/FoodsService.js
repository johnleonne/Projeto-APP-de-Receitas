const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

class FoodsService {
  async requestByIngredient(ingredient) {
    const { meals } = await fetch(`${BASE_URL}filter.php?i=${ingredient}`)
      .then((response) => response.json());

    return meals;
  }

  async requestByName(foodName) {
    const { meals } = await fetch(`${BASE_URL}search.php?s=${foodName}`)
      .then((response) => response.json());

    return meals;
  }

  async requestByFirstLetter(foodNameFirstLetter) {
    const { meals } = await fetch(`${BASE_URL}search.php?f=${foodNameFirstLetter}`)
      .then((response) => response.json());

    return meals;
  }

  async requestByFoodId(id) {
    const { meals } = await fetch(`${BASE_URL}lookup.php?i=${id}`)
      .then((response) => response.json());

    return meals;
  }

  async requestFirst12() {
    const { meals } = await fetch(`${BASE_URL}search.php?s=`)
      .then((response) => response.json());

    return meals;
  }

  async requestFirst5Categories() {
    const indexFive = 5;

    const { meals } = await fetch(`${BASE_URL}list.php?c=list`)
      .then((response) => response.json());

    return meals
      .slice(0, indexFive)
      .map(({ strCategory }) => strCategory);
  }

  async requestByCategory(foodCategory) {
    const { meals } = await fetch(`${BASE_URL}filter.php?c=${foodCategory}`)
      .then((response) => response.json());

    return meals;
  }

  async requestRecommendedDrinks() {
    const sixthIndex = 6;
    const recommendationURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const { drinks } = await fetch(recommendationURL)
      .then((response) => response.json());

    return drinks.slice(0, sixthIndex);
  }
}

export default new FoodsService();

/*
Endpoints:
procurar pelo ingrediente: https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
procurar pelo nome: https://www.themealdb.com/api/json/v1/1/search.php?s={nome}
procurar pela 1 letra: https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}
*/
