const API_KEY = "d1435d772b0a43148f8ad1a56ed31c1e";
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
	recipeListEl.innerHTML = "";
	recipes.forEach((recipe) => {
		const recipeItemEl = document.createElement("li");
		recipeItemEl.classList.add("recipe-item");
		recipeImgEl = document.createElement("img");
		recipeImgEl.src = recipe.image;
		recipeImgEl.alt = "recipe image";

		recipeTitleEl = document.createElement("h2");
		recipeTitleEl.innerText = recipe.title;

		recipeIngredientsEl = document.createElement("p");
		recipeIngredientsEl.innerHTML = `
    <strong>Ingredients:</strong> ${recipe.extendedIngredients
			.map((ingredient) => ingredient.original)
			.join(", ")}`;

		recipeLinkEl = document.createElement("a");
		recipeLinkEl.href = recipe.sourceUrl;
		recipeLinkEl.innerText = "View Recipe";

		recipeItemEl.appendChild(recipeImgEl);
		recipeItemEl.appendChild(recipeTitleEl);
		recipeItemEl.appendChild(recipeIngredientsEl);
		recipeItemEl.appendChild(recipeLinkEl);
		recipeListEl.appendChild(recipeItemEl);
	});
}

async function getRecipes() {
	const response = await fetch(
		`https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
	);
	const data = await response.json();
	return data.recipes;
}

async function init() {
	const recipes = await getRecipes();
	displayRecipes(recipes);
}

init();
