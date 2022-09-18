let elRow = document.querySelector(".row");
let cardFragment = document.createDocumentFragment();
let elSelect = document.querySelector("#select");

function renderCards(array){
  array.forEach(element => {
    let addedGenre = element.genres.map(genre =>{
      return genre;
    });
    let elCard = document.createElement("div");
    elCard.setAttribute("class", "col")
    elCard.innerHTML = `
    <div class="col">
      <div class="card">
        <img src="${element.poster}" class="card-img-top" alt="${element.title}">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.overview}</p>
          <ul class="list-unstyled">
            <li>
              ${
                "<strong>Film genres: </strong>" + addedGenre.map(item => " " + item)
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
    `
    cardFragment.appendChild(elCard);
  });
  elRow.appendChild(cardFragment)
}
renderCards(films);

let optionBox = [];

function sortingOption (option){
  option.forEach(element => {
    element.genres.forEach(item => {
      if(!optionBox.includes(item)){
        optionBox.push(item)
      }
    });
  });
}
sortingOption(films)

let addOptionArray = [];
let optionFragment = document.createDocumentFragment();
function renderOption(toOption){
  toOption.forEach(element => {
    let newOption = document.createElement("option");
    newOption.textContent = element;
    optionFragment.appendChild(newOption);
  });

  elSelect.appendChild(optionFragment)
}
renderOption(optionBox)

elSelect.addEventListener("change", () =>{
  let pushingArray = [];
  elRow.textContent = "";
  if(elSelect.value === "All"){
    pushingArray = films;
  }
  else{
    films.forEach(element => {
      if(element.genres.includes(elSelect.value)){
        pushingArray.push(element)
      }
    });
  }
  
  renderCards(pushingArray)
})