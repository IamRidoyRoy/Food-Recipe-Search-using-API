const searchFood = () => {
    const searchField = document.getElementById('searchField');
    const SearchText = searchField.value;
    searchField.value = '';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${SearchText}`;
    //  if empty search
    if (SearchText.length == '') {
        const noResult = document.getElementById('no-result');
        noResult.innerHTML = `
        <h1>No result found!</h1>
        `;
    }
    else {
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
    }

}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result')
    searchResult.textContent = '';

    // Show if no result found
    if (meals.length == 0) {
        const noResult = document.getElementById('no-result');
        noResult.innerHTML = `
        <h1>No result found!</h1>
        `;
    }
    meals.forEach(meal => {
        // console.log(meal)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick = "mealDetails(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}...</p>
                </div>
        </div>
        `;
        searchResult.appendChild(div);
    })
}

const mealDetails = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]))

}

const displayMealDetails = meal => {
    const singleMealDetails = document.getElementById('single-meal-details');
    singleMealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 200)}...</p>
        <a target="_blank" href="${meal.strYoutube}" class="btn btn-primary">Go YouTube</a>
    </div>
    `;
    singleMealDetails.appendChild(div);
    console.log(meal)
}