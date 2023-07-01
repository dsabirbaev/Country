

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

