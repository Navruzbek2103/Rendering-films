let elRow = document.querySelector(".row");
let cardsFragment = document.createDocumentFragment();
let elSelect = document.querySelector(".select");
let elInput = document.querySelector(".search-input");

function renderCards(cardsArray){
  cardsArray.forEach(element => {
    let genre = element.genres.map(genre => genre)
    let col = document.createElement("div");
    col.setAttribute("class", "col");
    col.innerHTML = `
      <div class="card">
        <img src="${element.poster}" class="card-img-top" alt="${element.title}">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.overview}</p>
          <p class="card-text">${"<strong>Movies of release date: </strong>" + new Date(element.release_date).getFullYear()}</p>
          <ul class="list-unstyled">
            ${"<strong>Film genres: </strong>" + genre}
          </ul>
        </div>
      </div>
    `
    cardsFragment.appendChild(col)
  });
  elRow.appendChild(cardsFragment);
}
renderCards(films)

// filmdagi o'xshash janrlarni bitta arrayga yig'ish
let forOptionValueBox = [];
function findOptionValue (filmGenres){
  filmGenres.forEach(element => {
    element.genres.forEach(genre => {
      if(!forOptionValueBox.includes(genre)){
        forOptionValueBox.push(genre);
      }
    });
  });
}
findOptionValue(films)

// Yig'ilgan film janrlarini option ga terish

let newOptionFragment = document.createDocumentFragment();
function enterOptionValue (genresList){
  genresList.forEach(element => {
    let newOption = document.createElement("option");
    newOption.textContent = element;
    newOptionFragment.appendChild(newOption);
  });
  elSelect.appendChild(newOptionFragment)
}
enterOptionValue(forOptionValueBox);


// Option value`larini render qilish.
elSelect.addEventListener("change", () =>{
  let optionCard = [];
  elRow.innerHTML = "";
  function renderOption(option){
    if(elSelect.value === 'all'){
      optionCard = films;
    }
    else{
      option.forEach(element => {
        if(element.genres.includes(elSelect.value)){
          optionCard.push(element);
        }
      });
    }
    renderCards(optionCard)
  }
  renderOption(films);

// _____________________________________________________________________________

  // films title`larini search orqali topish.

  elInput.addEventListener("input", () =>{
    let searchedArray = [];
    let searchword = elInput.value.trim().toLowerCase();

    function searchingInputValue (array){
      elRow.innerHTML = "";
      array.forEach(element => {
        let elementTrim = element.title.trim().toLowerCase();
        if(elementTrim.includes(searchword)){
          searchedArray.push(element);
        }
      });
      renderCards(searchedArray)
    }
    searchingInputValue(optionCard)
  })
})


// films title`larini search orqali topish.

elInput.addEventListener("input", () =>{
  let searchedArray = [];
  let searchword = elInput.value.trim().toLowerCase();

  function searchingInputValue (array){
    elRow.innerHTML = "";
    array.forEach(element => {
      let elementTrim = element.title.trim().toLowerCase();
      if(elementTrim.includes(searchword)){
        searchedArray.push(element);
      }
    });
    renderCards(searchedArray)
  }
  searchingInputValue(films)
})