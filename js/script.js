

////////////////////// Normalize data ///////////////////////

const allCountries = data.map((el) => {
    const currencies = el.currencies ? el.currencies.map(value => value.name) : [];
    const languages = el.languages ? el.languages.map(value => value.name) : [];
    const borders = el.borders ? el.borders.map(value => value) : [];
    return {
        image: el.flags.png,
        name: el.name,
        population: `${el.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
        region: el.region,
        capital: el.capital,
        subregion: el.subregion,
        nativeName: el.nativeName,
        topLevelDomain: el.topLevelDomain,
        currency: currencies,
        lang: languages,
        borders: borders
    }
})

const countriesWithId = allCountries.map((country, index) => {
    return { id: index+1, ...country };
});


//console.log(countriesWithId)

////////////////////  Render dates for html page

let cards = document.querySelector('.countries-cards');


function renderData(data){
    data.forEach((value, index) => {
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

            <button class="countries-card__btn">More...</button>
        `
        card.dataset.country = index+1;
        cards.append(card);
    })
}




renderData(allCountries);

//////////////////////////////////////////////////////////////

//////////////////// Select option for filter countries by name;

const regions = [];

data.forEach((value) => {
    regions.push(value.region);
})
const uniqueRegion = Array.from(new Set(regions)); 

const select = document.querySelector('.countries-search__select');
uniqueRegion.forEach((value) => {
    let option = document.createElement('option');
    option.textContent = value;
    select.append(option);
})

select.addEventListener('change', (e) => {
    cards.innerHTML = "";

    const result = allCountries.filter((el) => {
        return el.region.toLowerCase() === e.target.value.toLowerCase();
    })

    renderData(result);
})

////////////////// Input find name countries /////////////////

const input = document.querySelector('.countries-search__input--inp');
input.addEventListener('input', (e) => {
    cards.innerHTML = "";

    const result = allCountries.filter((el) => {
        return el.name.toLowerCase().includes(e.target.value.toLowerCase());
    })

    renderData(result);
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


/////////////////// Page about country
let countriesCard = document.querySelector('.countries-cards')
let btnMore = document.querySelector('.countries-card__btn')
let modalWrap = document.querySelector('.modal-wrapper')


function findElement(data, id){
    return data.filter(item => item.id === +id);
}

countriesCard.addEventListener('click', (e) => {
    if(e.target.classList.contains('countries-card__btn')){
        const countryID = e.target.parentNode.getAttribute('data-country');
        console.log(countryID)
        const result = findElement(countriesWithId, countryID)[0];
        localStorage.setItem('country', JSON.stringify(result));
        modalWrap.style.cssText = "display: grid"
        renderModal();
    }
})


let countryItem = document.querySelector('.country-item');

function renderModal(){
    let {image, name, population, region, capital, subregion, nativeName, topLevelDomain, currency, lang, borders } = JSON.parse(localStorage.getItem('country'))
    let modalResult = "";
    modalResult += `
        <div class="country-card">
            <img class="country-card__img" src="${image}" alt="flag">
            <div class="country-card__body">
                <h5 class="country-card__body--name">${name}</h5>
                <div class="country-card__body--info">
                    <ul>
                        <li> Native Name: <span>${nativeName}</span></li>
                        <li> Population:  <span>${population}</span></li>
                        <li> Region: <span>${region}</span></li>
                        <li> Sub Region: <span>${subregion}</span></li>
                        <li> Capital: <span>${capital}</span></li>
                    </ul>
                    <ul>
                        <li>Top Level Domain: <span>${topLevelDomain}</span></li>
                        <li>Currencies: <span>${currency}</span></li>
                        <li>Languages: <span>${lang}</span></li>
                    </ul>
                </div>

                <div class="country-card__body--border">
                    <p>Border Countries: </p> <span class="border-divide">${borders}</span>
                </div>
            </div>
        </div> 
    `

    countryItem.innerHTML = modalResult;
    
}


let home = document.querySelector('.country__home')

home.addEventListener('click', () => {
    
    modalWrap.style.cssText = "display: none"
})