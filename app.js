
const autoLoadData = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => autoDisplay(data.meals))
    const res = await fetch(url);
    const data = await res.json()
    autoDisplay(data.meals)


}
const autoDisplay = meals => {

    const row = document.getElementById("card-contain");
    row.textContent = ""
    meals.forEach(meal => {



        const col = document.createElement("div")
        col.classList.add("col")

        col.innerHTML = `<div onClick="loadMeal(${meal.idMeal})" class="card " style="width: 20rem";>
                        <img   src="${meal.strMealThumb}" class="card-img-top  " alt="...">
                        <div class="card-body">
                            <h5 class="card-title font-bold">${meal.strMeal}</h5>
                            <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
                            
                        </div>
                    </div>`
        row.appendChild(col)

        // console.log(meal)        
    });


}
autoLoadData()

document.getElementById("inputField").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        // console.log("enter")
        loadData()
    }
})
const loadData = async () => {
    const inputField = document.getElementById("inputField");
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputField.value}`

    try {
        const res = await fetch(url);
        const data = await res.json();
        if (inputField.value != 0) {
            displayData(data.meals)
            
        }

    }
    catch (error) {
        erroMassage()
        console.log(error)
    }
    // .then(res => res.json())
    // .then(data => displayData(data.meals))
    // console.log(inputField.value)
    inputField.value = " "
}

const erroMassage = () => {
    const row = document.getElementById("card-contain");
    const h1 = document.createElement("h1")
    h1.innerText = "Result not Found. . ."
    h1.classList.add("errMsg")
    row.appendChild(h1)


}

const displayData = meals => {
    const row = document.getElementById("card-contain");
    row.textContent = ""
    meals.forEach(meal => {
        // console.log(meal)
        
       
            const col = document.createElement("div")
            col.classList.add('col')

            col.innerHTML = `<div onClick="loadMeal(${meal.idMeal})" class="card " style="width: 20rem";>
                        <img   src="${meal.strMealThumb}" class="card-img-top  " alt="...">
                        <div class="card-body">
                            <h5 class="card-title font-bold">${meal.strMeal}</h5>
                            <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
                            
                        </div>
                    </div>`
            row.appendChild(col)
        

    });

}
const loadMeal = async mealId => {
    // console.log(mealId);

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    // .then(res => res.json())
    // .then(data => displaySingleMeal(data.meals[0]))
    displaySingleMeal(data.meals[0])
    // console.log(data

}
const displaySingleMeal = mealId => {
    const row = document.getElementById("card-contain");
    row.textContent = ""

    const col = document.createElement("div")
    col.classList.add('col')

    col.innerHTML = `<div class=" mb-3  mx-auto" style="width:20rem;  border:1px solid gray">
  <img src="${mealId.strMealThumb}" class="card-img-top "  alt="...">
  <div class="card-body">
    <h5 class="card-title">${mealId.strMeal}</h5>
    <p class="card-text">${mealId.strInstructions}</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div>
<div class=" d-flex mx-auto mb-4"><button onClick="autoLoadData()
"  type="button" class="btn btn-secondary mx-auto"> &#60;
 Back</button></div>
`
    row.appendChild(col)


    // console.log(mealId)
} 