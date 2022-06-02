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
const BTN_LAST = document.querySelector("#btnLast");
const BTN_START = document.querySelector("#btnStart");
const BTN_PREVIOUS = document.querySelector("#btnPrevious");
let numberPage = Number(BTN_SELECTED.textContent);
const DESKTOP = window.matchMedia('(min-width: 1280px)');
const TABLET = window.matchMedia('(min-width: 768px) and (max-width: 1279px)');
const MOBILE = window.matchMedia('(max-width: 768px)')
let petsForPagination = [];
let existsIndex = [];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const createCardsTemplate = () => {
  let count = 0;

  if(DESKTOP.matches){
    for(let i = (numberPage - 1) * 8; i < numberPage * 8 ; i++){
      let img = CARDS[count].querySelector(".pet-img");
      let p = CARDS[count].querySelector(".pet-name");
      img.src = `../../assets/images/${petsForPagination[i].name.toLowerCase()}.png`;
      img.alt = petsForPagination[i].name.toLowerCase();
      p.innerHTML = petsForPagination[i].name;
      count++;
    }
  }else if(TABLET.matches){
    for(let i = (numberPage - 1) * 6; i < numberPage * 6 ; i++){
      let img = CARDS[count].querySelector(".pet-img");
      let p = CARDS[count].querySelector(".pet-name");
      img.src = `../../assets/images/${petsForPagination[i].name.toLowerCase()}.png`;
      img.alt = petsForPagination[i].name.toLowerCase();
      p.innerHTML = petsForPagination[i].name;
      count++;
    }
  }else{
    for(let i = (numberPage - 1) * 3; i < numberPage * 3 ; i++){
      let img = CARDS[count].querySelector(".pet-img");
      let p = CARDS[count].querySelector(".pet-name");
      img.src = `../../assets/images/${petsForPagination[i].name.toLowerCase()}.png`;
      img.alt = petsForPagination[i].name.toLowerCase();
      p.innerHTML = petsForPagination[i].name;
      count++;
    }
  }
}
  
const showNextCards = () => {
  if(numberPage <= 5){ // переделать условие при разных разрешениях.
    numberPage++;
    BTN_SELECTED.textContent = numberPage;
    createCardsTemplate();
    BTN_PREVIOUS.removeAttribute("disabled");
    BTN_START.removeAttribute("disabled");
    BTN_START.classList.remove("disable");
    BTN_PREVIOUS.classList.remove("disable");
    if(numberPage === 6){
      BTN_NEXT.classList.remove("hover");
      BTN_LAST.classList.remove("hover")
      BTN_NEXT.classList.add("disable");
      BTN_LAST.classList.add("disable");
      BTN_NEXT.setAttribute("disabled", "disabled");
      BTN_LAST.setAttribute("disabled", "disabled");
    }
  }
}

const showLastCards = () => {
  numberPage = petsForPagination.length/8
  BTN_SELECTED.textContent = numberPage;
  BTN_NEXT.setAttribute("disabled", "disabled");
  BTN_LAST.setAttribute("disabled", "disabled");
  BTN_NEXT.classList.add("disable");
  BTN_LAST.classList.add("disable");
  BTN_NEXT.classList.remove("hover");
  BTN_LAST.classList.remove("hover")
  BTN_START.classList.remove("disable");
  BTN_PREVIOUS.classList.remove("disable");
  BTN_PREVIOUS.removeAttribute("disabled");
  BTN_START.removeAttribute("disabled");
  createCardsTemplate();
  
}

const showPreviousCards = () => {
  if(numberPage >= 2){// переделать условие при разных разрешениях.
    numberPage--
    BTN_SELECTED.textContent = numberPage;
    BTN_NEXT.removeAttribute("disabled");
    BTN_LAST.removeAttribute("disabled");
    BTN_NEXT.classList.remove("disable");
    BTN_LAST.classList.remove("disable");
    createCardsTemplate();
    if(numberPage === 1){
      BTN_PREVIOUS.classList.add("disable");
      BTN_START.classList.add("disable");
      BTN_PREVIOUS.classList.remove("hover");
      BTN_START.classList.remove("hover")
      BTN_PREVIOUS.setAttribute("disabled", "disabled");
      BTN_START.setAttribute("disabled", "disabled");
    }
  }
}

const showStartCards = () => {
  numberPage = 1
  BTN_SELECTED.textContent = numberPage;
  BTN_START.setAttribute("disabled", "disabled");
  BTN_PREVIOUS.setAttribute("disabled", "disabled");
  BTN_PREVIOUS.classList.add("disable");
  BTN_START.classList.add("disable");
  BTN_NEXT.classList.remove("disable");
  BTN_LAST.classList.remove("disable");
  BTN_PREVIOUS.classList.remove("hover");
  BTN_START.classList.remove("hover")
  BTN_NEXT.removeAttribute("disabled");
  BTN_LAST.removeAttribute("disabled");
  createCardsTemplate();
}

const petsSubsequence = () => {
  for(let i = 0; i < 6; i++){
    existsIndex = pets;
    shuffle(existsIndex);

    if(i > 0  && !(existsIndex[0].name === petsForPagination[petsForPagination.length - 2].name || existsIndex[0].name === petsForPagination[petsForPagination.length - 1].name  || existsIndex[1].name === petsForPagination[petsForPagination.length - 1].name)){
      for(let j = 0; j < existsIndex.length; j++){
        console.log("хорошо > 0");
        petsForPagination.push(existsIndex[j]); 
      }
    }else if(i === 0){
      for(let j = 0; j < existsIndex.length; j++){
        console.log("хорошо = 0");
        petsForPagination.push(existsIndex[j])
      }
    }else{
      shuffle(existsIndex);
      console.log("давай снова =================================");
      i--;
    }
}
  console.log(petsForPagination);
  createCardsTemplate();
}

const hoverBtn = (event) => {
  if(event.type === "mouseover"){
    if(!event.target.classList.contains("disable")){
      event.target.classList.add("hover");
    }
  }else{
    event.target.classList.remove("hover");
  }
}

const updateInfoOnResize = () => {
  numberPage = 1;
  BTN_SELECTED.textContent = numberPage;

}

BTN_NEXT.addEventListener('click', showNextCards);
BTN_LAST.addEventListener('click', showLastCards);
BTN_START.addEventListener('click', showStartCards);
BTN_PREVIOUS.addEventListener('click', showPreviousCards);

BTN_START.addEventListener("mouseover", hoverBtn);
BTN_START.addEventListener("mouseout", hoverBtn);
BTN_PREVIOUS.addEventListener("mouseover", hoverBtn);
BTN_PREVIOUS.addEventListener("mouseout", hoverBtn);
BTN_NEXT.addEventListener("mouseover", hoverBtn);
BTN_NEXT.addEventListener("mouseout", hoverBtn);
BTN_LAST.addEventListener("mouseover", hoverBtn);
BTN_LAST.addEventListener("mouseout", hoverBtn);

window.addEventListener('load', petsSubsequence());
window.addEventListener('resize', updateInfoOnResize);