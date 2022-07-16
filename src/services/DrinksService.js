const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

class DrinksService {
  async requestByIngredient(ingredient) {
    const { drinks } = await fetch(`${BASE_URL}filter.php?i=${ingredient}`)
      .then((response) => response.json());

    return drinks;
  }

  async requestByName(drinkName) {
    const { drinks } = await fetch(`${BASE_URL}search.php?s=${drinkName}`)
      .then((response) => response.json());

    return drinks;
  }

  async requestByFirstLetter(drinkNameFirstLetter) {
    const { drinks } = await fetch(`${BASE_URL}search.php?f=${drinkNameFirstLetter}`)
      .then((response) => response.json());

    return drinks;
  }

  async requestByDrinkId(id) {
    const { drinks } = await fetch(`${BASE_URL}lookup.php?i=${id}`)
      .then((response) => response.json());

    return drinks;
  }

  async requestFirst12() {
    const { drinks } = await fetch(`${BASE_URL}search.php?s=`)
      .then((response) => response.json());

    return drinks;
  }

  async requestFirst5Categories() {
    const indexFive = 5;

    const { drinks } = await fetch(`${BASE_URL}list.php?c=list`)
      .then((response) => response.json());

    return drinks.slice(0, indexFive).map(({ strCategory }) => strCategory);
  }

  async requestByCategory(drinkCategory) {
    const { drinks } = await fetch(`${BASE_URL}filter.php?c=${drinkCategory}`)
      .then((response) => response.json());

    return drinks;
  }
}

export default new DrinksService();

/*
Endpoints:
procurar pelo ingrediente: https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
procurar pelo nome: https://www.themealdb.com/api/json/v1/1/search.php?s={nome}
procurar pela 1 letra: https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}
*/
