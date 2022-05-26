import pets from '../../pages/main/pets.js';


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