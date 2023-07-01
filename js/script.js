


////////////////////  Render dates for html page

let cards = document.querySelector('.countries-cards');



function renderData(data){
    data.forEach((value) => {
        let card = document.createElement('div');
        card.classList.add('countries-card');

        card.innerHTML = `
            
            <img class="countries-card__img" src="${value.flag}" alt="flag">
           
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




renderData(data);

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
        window.location.href = "country.html";

        data.forEach((value) => {
        let card = document.createElement('div');
        card.classList.add('country-card');
            card.textContent = 
            countryItem.append(card);
        })
    })
})
// country.addEventListener('click', (e) => {
//     window.location.href = "country.html"
//     console.log(e.target)
//     // data.forEach((value) => {
//     //     let card = document.createElement('div');
//     //     card.classList.add('country-card');

//     //     card.innerHTML = `
//     //         <img class="country-card__img" src="${value.flag}" alt="flag">
//     //         <div class="country-card__body">
//     //             <h5 class="country-card__body--name">Belgium</h5>
//     //             <div class="country-card__body--info">
//     //                 <ul>
//     //                     <li> Native Name: <span>België</span></li>
//     //                     <li> Population:  <span>11,319,511</span></li>
//     //                     <li> Region: <span>Europe</span></li>
//     //                     <li> Sub Region: <span>Western Europe</span></li>
//     //                     <li> Capital: <span>Brussels</span></li>
//     //                 </ul>
//     //                 <ul>
//     //                     <li>Top Level Domain: <span>.be</span></li>
//     //                     <li>Currencies: <span>Euro</span></li>
//     //                     <li>Languages: <span>Dutch, French, German</span></li>
//     //                 </ul>
//     //             </div>

//     //             <div class="country-card__body--border">
//     //                 <p>Border Countries: </p> <span>France</span> <span>Germany</span> <span>Netherlands</span>
//     //             </div>
//     //         </div>       
//     //     `

//     //     countryItem.append(card);
//     // })
// })