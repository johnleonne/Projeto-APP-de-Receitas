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
}

export default new FoodsService();

/*
Endpoints:
procurar pelo ingrediente: https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}
procurar pelo nome: https://www.themealdb.com/api/json/v1/1/search.php?s={nome}
procurar pela 1 letra: https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}
*/
