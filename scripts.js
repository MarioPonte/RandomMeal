const getMealBtn = document.getElementById('getMeal');
const mealContainer = document.getElementById('meal');

getMealBtn.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
        createMeal(res.meals[0]);
    })
});

function createMeal(meal){
    const ingredients = [];
    for(var i=1; i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        }else{
            break;
        }
    }

    console.log(ingredients);


    mealContainer.innerHTML = `
        <div class="mealContent container text-center">
                <div class="row">
                    <div class="col-sm">
                        <img id="recipeImg" src="${meal.strMealThumb}" alt="Meal Img" />
                    </div>
                    <div class="col-sm">
                        <h4 id="recipeName">${meal.strMeal}</h4>
                        <div class="mealType">
                            <p><strong>Category:</strong> ${meal.strCategory}</p>
                            <p><strong>Area:</strong> ${meal.strArea}</p>
                            <p><strong>Tags:</strong> ${meal.strTags}</p>
                        </div>
                        <div class="mealIngredients">
                            <h5>Ingredients</h5>
                            <ul>
                                ${ingredients.map(ingredient => `
                                    <li>${ingredient}</li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="column seven">
                        <p class="instructionsMeal">${meal.strInstructions}</p>
                        <h5>Video Recipe</h5>
                        <div class="videoWrapper">
                            <iframe class="videoFrame" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" />
                        </div>
                    </div>
                </div>
        </div>
    `;
}