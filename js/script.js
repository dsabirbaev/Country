

////////////////////// Normalize data ///////////////////////

const allCountries = data.map((el) => {
    return {
        image: el.flags.png,
        name: el.name,
        population: `${el.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
        region: el.region,
        capital: el.capital
    }
})





////////////////////  Render dates for html page

let cards = document.querySelector('.countries-cards');



function renderData(data){
    data.forEach((value) => {
        let card = document.createElement('div');
        card.classList.add('countries-card');

        card.innerHTML = `
            
            <img class="countries-card__img" src="${value.image}" alt="flag">
           
            <div class="countries-card__body">
                <h5 class="countries-card__body--name">${value.name}</h5>
                <ul class="countries-card__body--list">
                    <li>Population: <span>${value.population}</span></li>
                    <li>Region: <span>${value.region}</span></li>
                    <li>Capital: <span>${value.capital}</span></li>
                </ul>
            </div>
        `

        cards.append(card);
    })
}




renderData(allCountries);

//////////////////////////////////////////////////////////////

//////////////////// Select option for filter countries by name;

const names = [];
const select = document.querySelector('.countries-search__select');
data.forEach((value) => {
    names.push(value.name);
})

names.forEach((value) => {
    let option = document.createElement('option');
    option.textContent = value;
    select.append(option);
})

select.addEventListener('change', (e) => {
    cards.innerHTML = "";

    const result = data.filter((el) => {
        return el.name.toLowerCase() == e.target.value.toLowerCase()
    })

    renderData(result);
})

/////////////////////////////////////////////////////////////////////////

let country = document.querySelectorAll('.countries-card');
let countryItem = document.querySelector('.country-item');


country.forEach((value) => {
    value.addEventListener('click', (e) => {
        window.location.href = "./country.html";

    })
})





/////// Dark and light mode

const darkModeBtn = document.querySelector('.header__mode');
const darkModeBtnText = document.querySelector('.header__mode p');
const header = document.querySelector('header');
const body = document.querySelector('body');
const card = document.querySelectorAll('.countries-card');
const cardBody = document.querySelectorAll('.countries-card__body');

const inputMode = document.querySelector('.countries-search__input');
const selectMode = document.querySelector('.countries-search__select');

let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
    header.classList.add("header-mode-theme");
    darkModeBtnText.textContent = "Light Mode";
    body.classList.add("body-mode-theme");
    inputMode.classList.add("card-mode-theme");
    selectMode.classList.add("card-mode-theme");
    card.forEach((value) => {
        value.classList.add("card-mode-theme");
    })
    cardBody.forEach((value) => {
        value.classList.add("card-mode-theme");
    })
    // cardBody.classList.add("body-mode-theme");
    localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
    header.classList.remove("header-mode-theme");
    darkModeBtnText.textContent = "Dark Mode";
    body.classList.remove("body-mode-theme");
    inputMode.classList.remove("card-mode-theme");
    selectMode.classList.remove("card-mode-theme");
    card.forEach((value) => {
        value.classList.remove("card-mode-theme");
    })
    cardBody.forEach((value) => {
        value.classList.remove("card-mode-theme");
    })
    localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
    enableDarkMode(); // set state of darkMode on page load
}

darkModeBtn.addEventListener("click", (e) => {
    darkMode = localStorage.getItem("dark-mode"); // update darkMode when clicked
    if (darkMode === "disabled") {
      enableDarkMode();
    } else {
      disableDarkMode();
    }

   
});