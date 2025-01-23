import React, { useState } from "react";
import Header from "./components/pages/Header";

const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        <div className="recipes">
          {recipes.map((recipe) => (
            <Card
              key={recipe.idMeal}
              title={recipe.strMeal}
              image={recipe.strMealThumb}
              description={recipe.strInstructions.substring(0, 100)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
