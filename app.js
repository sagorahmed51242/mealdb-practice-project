
//fetching data from API
const loadMeal = async (searchText) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText?`${searchText}`:' '}`);
    const data = await res.json();

    displayMeal(false, data.meals);
    document.getElementById("show_all_button").addEventListener("click", () => {
        displayMeal(true, data.meals);
    })

}



// showing mead from API
const displayMeal = (isAll, data) => {
    const meal_container = document.getElementById("food_container");
    meal_container.innerHTML = "";

    if(data.length < 6){
        document.getElementById("show_all_button").classList.add("hidden");
    }else{
        document.getElementById("show_all_button").classList.remove("hidden");
    }


    let meals;
    if(isAll){
        meals = data;
        document.getElementById("show_all_button").classList.add("hidden");
    }else{
        meals = data.slice(0, 6);
    }


    meals.forEach((meal) => {
        const {strMealThumb, strMeal, idMeal} = meal;
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="border flex">
                <div><img class="w-[600px]" src="${strMealThumb}"></div>
                <div class="px-5 py-10 flex flex-col justify-center items-start">
                    <h2 class="text-2xl font-semibold">${strMeal}</h2>
                    <p class="text-lg text-[#706F6F] py-4 text-left">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Quisquam, voluptas.</p>
                    <button onclick="showModal('${idMeal}')" class="text-[#FFC107] underline text-lg">View Details</button>
                </div>
            </div>
        `;
        meal_container.appendChild(div);
    })
}




//fetching area Data
const showArea = async () => {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    const data = await res.json();
    showAreaData(data.meals);
}



//showing Area Data
const showAreaData = (data) => {
    const container = document.getElementById("area_container");
    container.innerHTML = "";
    data.forEach((area) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick="loadAreaData('${area.strArea}')" class="py-2 px-3 rounded-md font-semibold text-lg">${area.strArea}</button>
        `;

        container.appendChild(div);
    })
}



//load area data
const loadAreaData = async (area) => {
    console.log(area);
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const data = await res.json();

    displayMeal(false, data.meals);
    document.getElementById("show_all_button").addEventListener("click", () => {
        displayMeal(true, data.meals);
    })
}






//loading data for modal
const showModal = async (id) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await res.json();
    console.log(data.meals[0]);
    createModal(data.meals[0]);
    document.getElementById("modal").classList.remove("hidden");
}


//creating Modal
const createModal = (meal) => {
    console.log(meal);
    const {strMeal, strCategory, strMealThumb, strArea, strYoutube, strInstructions} = meal;
    const container = document.getElementById("modal_content");
    container.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <div>
                <div class="flex justify-between items-center"><h1 class="text-2xl">${strMeal}</h1> <span onclick="closeModal()" class="text-xl p-1 cursor-pointer">x</span></div>
                <hr class="my-2">
                <img class="w-[100%] object-cover h-[300px]" src="${strMealThumb}" alt="">
            </div>
            <div class="flex flex-col gap-1 py-3">
                <h2><span class="font-semibold">Category:</span> ${strCategory}</h2>
                <h2><span class="font-semibold">Area:</span> ${strArea}</h2>
                <h2><span class="font-semibold">Instructions:</span> ${strInstructions}</h2>
                <h2><span class="font-semibold">Youtube:</span> ${strYoutube}</h2>
            </div>
    `;
    container.appendChild(div);
}

//Close Modal
const closeModal = () => {
    document.getElementById("modal").classList.add("hidden");
}


//search meal
const searchMeal = () => {
    const searchText = document.getElementById("search_text").value;
   const value = searchText.trim();
    loadMeal(value)
    document.getElementById("search_text").value = "";
}


//load categoryBased Mead
const showCategoryData = (data) => {
    loadCategoryBasedMeal(data);
}

//load category meal
const loadCategoryBasedMeal = async (meal) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`)
    const data = await res.json();

    displayMeal(false, data.meals);
    document.getElementById("show_all_button").addEventListener("click", () => {
        displayMeal(true, data.meals);
    })
}



//load Category data from APi
const loadCategoryData = async () => {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    const data = await res.json();

    //sending for showing category
    displayCategoryData(data.categories.slice(0,12));
}

// display category data
const displayCategoryData = (data) => {
    const container = document.getElementById("category_container");
    data.forEach((category) => {
        const {strCategory, strCategoryThumb} = category;
        const div = document.createElement("div");
        div.innerHTML =  `
        <button class="text-xl font-bold" onclick="showCategoryData('${strCategory}')"><a
                        href="#food-container"><img src="${strCategoryThumb}">${strCategory}</a></button>
        `;
        container.appendChild(div);
    })
}





//filter handler
const filterContainerHandler = () => {
    filterByLetter = document.getElementById("filter_by_letter");
    filterByArea = document.getElementById("filter_by_area");
    letterContainer = document.getElementById("letter_container");
    AreaContainer = document.getElementById("area_container");
    filterContainer = document.getElementById("filter_container");

    filterByLetter.addEventListener("click", () => {
        letterContainer.classList.remove("hidden");
        letterContainer.classList.add("flex");
        filterContainer.classList.remove("pb-10");
        filterByLetter.classList.add("bg-yellow-700");

        AreaContainer.classList.add("hidden");
        AreaContainer.classList.remove("grid");
        filterByArea.classList.remove("bg-yellow-700");

    })

    filterByArea.addEventListener("click", () => {
        AreaContainer.classList.remove("hidden");
        AreaContainer.classList.add("grid");
        filterContainer.classList.remove("pb-10");
        filterByArea.classList.add("bg-yellow-700");

        letterContainer.classList.add("hidden");
        letterContainer.classList.remove("flex");
        filterByLetter.classList.remove("bg-yellow-700");
    })
}

//call filter handler function
filterContainerHandler();





//filter by letter handler
const filterByLetterHandler = () => {
    const buttons = document.querySelectorAll(".filter_by_letter");
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            loadDataBasedOnLetter(btn.innerText);

        })
    })
}

//call filter handler function
filterByLetterHandler();



const loadDataBasedOnLetter =async (letter) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const data = await res.json();

    //call display function and send data
    displayMeal(false, data.meals);
     document.getElementById("show_all_button").addEventListener("click", () => {
        displayMeal(true, data.meals);
    })
}





//call show area function
showArea();


//call for category data
loadCategoryData();

// call for load all meals
loadMeal();


