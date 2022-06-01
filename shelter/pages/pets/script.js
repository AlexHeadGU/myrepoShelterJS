import pets from '../../pages/main/pets.js';

export default pets;

function preloadImages(name) {
    for (let i = 1; i <= 8; i++) {
      const img = new Image();
      img.src = `../../assets/images/${name}.png`; 
    }
  } 
  const names = ['charly', 'freddie', 'jennifer', 'katrine', 'scarlett', 'sophia', 'timmy', 'woody'];
  names.forEach((elem) => preloadImages(elem));

// BURGER MENU

const BURGER_MENU = document.querySelector(".hamburger");
const OVERLAY = document.querySelector(".overlay");
const NAV = document.querySelector(".navigation");
const BODY = document.querySelector("body");

BURGER_MENU.addEventListener("click", () => {
    BURGER_MENU.classList.toggle("open"), 
    OVERLAY.classList.toggle("active"), 
    NAV.classList.toggle("open")
    BODY.classList.toggle("hiddenScroll")
});

// POP UP

const POPUP_OVERLAY = document.querySelector(".popup-overlay");
const POPUP = document.querySelector(".popup")
const PET_CARDS = document.querySelectorAll(".card");
const CROSS_BTN = document.querySelector(".closeBtn");

const createPopupCard = (event) => {

    let currentPetName = event.currentTarget.querySelector('.pet-name').innerHTML;
    let currentPetInfo = pets.find((element, index, array) => {
      if (array[index]["name"] === currentPetName) {
        return array[index];
      }
    });
  
    const petImagePopup = document.querySelector('.card-img');
    const petNamePopup = document.querySelector('.card-pet-name');
    const petTypeBreed = document.querySelector('.card-breed');
    const petDescription = document.querySelector('.card-about');
    const petAge = document.querySelector('.characteristic-value.age');
    const petInoculations = document.querySelector('.characteristic-value.inoculations');
    const petDiseases = document.querySelector('.characteristic-value.diseases');
    const petParasites = document.querySelector('.characteristic-value.parasites');
  
    petImagePopup.src = `${currentPetInfo["img"]}`;
    petNamePopup.textContent = `${currentPetInfo["name"]}`;
    petTypeBreed.textContent = `${currentPetInfo["type"]} - ${currentPetInfo["breed"]}`;
    petDescription.textContent = `${currentPetInfo["description"]}`;
    petAge.textContent = `${currentPetInfo["age"]}`;
    petInoculations.textContent = `${currentPetInfo["inoculations"]}`;
    petDiseases.textContent = `${currentPetInfo["diseases"]}`;
    petParasites.textContent = `${currentPetInfo["parasites"]}`;   
}

const openPopUp = (event) => {
    POPUP_OVERLAY.classList.remove("hidden");
    POPUP.classList.remove("hidden");
    BODY.classList.add("no-scroll");
    createPopupCard(event);
}

const closePopUp = () => {
    POPUP_OVERLAY.classList.add("hidden");
    POPUP.classList.add("hidden");
    BODY.classList.remove("no-scroll");
}

PET_CARDS.forEach((elem) => { 
    elem.addEventListener('click', openPopUp);
}); 

CROSS_BTN.addEventListener('click', closePopUp); 
POPUP_OVERLAY.addEventListener('click', closePopUp); 

// PAGINATION

const CARDS = document.querySelectorAll(".card");
const BTN_SELECTED = document.querySelector(".btnSelected");
const PAGINATION = document.querySelector("#select-pages");
const BTN_NEXT = document.querySelector("#btnNext");
let numberPage = Number(BTN_SELECTED.textContent);
let petsForPagination = [];
let existsIndex = [];
let newResult = [];
let namesArray = [];

let randomValue;

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const createCardsTemplate = () => {
  for(let j = 0; j < petsForPagination[numberPage].length; j++){
    let img = CARDS[j].querySelector(".pet-img");
    let p = CARDS[j].querySelector(".pet-name");
    img.src = `../../assets/images/${petsForPagination[numberPage - 1][j].name.toLowerCase()}.png`;
    img.alt = petsForPagination[numberPage - 1][j].name.toLowerCase();
    p.innerHTML = petsForPagination[numberPage - 1][j].name;
  }
}
  
const showNextCards = () => {
  console.log("dddddddddddddddd")
  numberPage++;
  BTN_SELECTED.textContent = numberPage.toString();
  for(let j = 0; j < petsForPagination[numberPage].length; j++){
    let img = CARDS[j].querySelector(".pet-img");
    let p = CARDS[j].querySelector(".pet-name");
    img.src = `../../assets/images/.png`;
    img.alt = petsForPagination[numberPage][j].name;
    p.innerHTML = petsForPagination[numberPage][j].name;
  }
}

const petsSubsequence = () => {

  for(let i = 0; i < 6; i++){
    existsIndex = pets;
    // [[{"1":1},{"2":2},{"3":3},{"4":4},{"5":5},{"6":6},{"7":7},{"8":8}],
    // [{"9":9},{"10":10},{"11":11},{"12":12},{"13":13},{"14":14},{"15":15},{"16":16}],
    // [{"17":17},{"18":18},{"19":19},{"20":20},{"21":21},{"22":22},{"23":23},{"24":24}],
    // [{"25":25},{"26":26},{"27":27},{"28":28},{"29":29},{"30":30},{"31":31},{"32":32}],
    // [{"33":33},{"34":34},{"35":35},{"36":36},{"37":37},{"38":38},{"39":39},{"40":40}],
    // [{"41":41},{"42":42},{"43":43},{"44":44},{"45":45},{"46":46},{"47":47},{"48":48}]];
    shuffle(existsIndex);
    petsForPagination.push(existsIndex);  
  }
  createCardsTemplate();
}

BTN_NEXT.addEventListener('click', showNextCards);

// PAGINATION.addEventListener("animationend", (animationEvent) => {
//   BTN_NEXT.addEventListener('click', showNextCards());
  // BTN_LAST.addEventListener('click', showLastCards());
// });

window.addEventListener('load', petsSubsequence());





//wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
