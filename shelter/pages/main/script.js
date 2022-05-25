import pets from '../../pages/main/pets.js';

function preloadImages(name) {
    for (let i = 1; i <= 8; i++) {
      const img = new Image();
      img.src = `../../assets/images/${name}.png`; 
    }
  } 
  const names = ['charly', 'freddie', 'jennifer', 'katrine', 'scarlett', 'sophia', 'timmy', 'woody'];
  names.forEach((elem) => preloadImages(elem));

// BURGER
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


// SLIDER
const BTN_LEFT = document.querySelector("#btn-left");
const BTN_RIGHT = document.querySelector("#btn-right");
const CAROUSEL = document.querySelector("#carousel");
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_RIGHT = document.querySelector("#item-right");
const ITEM_ACTIVE = document.querySelector("#item-active");
const CARDS_CENTER = document.querySelectorAll('.cards-center');
const DESKTOP = window.matchMedia('(min-width: 1280px)');
const TABLET = window.matchMedia('(min-width: 768px) and (max-width: 1279px)');
const MOBILE = window.matchMedia('(min-width: 320px)  and (max-width: 767px)');
const NAMES = [];

const createCardTemplate = (direction) => {
    let img;
    let p;
    const NEW_ARR = ITEM_ACTIVE.querySelectorAll("p");
    let currentPetsOnPage = [];

    for(let i = 0; i < NEW_ARR.length; i++){
        currentPetsOnPage.push(NEW_ARR[i].textContent);
    }

    for(let i = 0; i < 3; i++){
        if(direction === "left"){
            img = ITEM_LEFT.querySelectorAll("img");
            p = ITEM_LEFT.querySelectorAll("p");
        }else{
            img = ITEM_RIGHT.querySelectorAll("img");
            p = ITEM_RIGHT.querySelectorAll("p");
        }

        for(let k = 0; k < 1; k++){
            let j = Math.floor(Math.random() * pets.length);

            if(currentPetsOnPage.includes(pets[j].name)){
                k--;
            }else{
                img[i].src = `../../assets/images/${pets[j].name.toLowerCase()}.png`;
                img[i].alt = pets[j].name.toLowerCase();
                p[i].innerHTML = pets[j].name;
                currentPetsOnPage.push(pets[j].name);
            }
        }
    }
};

const moveLeft = () => {

    if(DESKTOP.matches){
        CAROUSEL.classList.add("transition-left-desktop");
    }else if(TABLET.matches){
        CAROUSEL.classList.add("transition-left-tablet");
    }else{
        CAROUSEL.classList.add("transition-left-mobile");
    }

    createCardTemplate("left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {

    if(DESKTOP.matches){
        CAROUSEL.classList.add("transition-right-desktop");
    }else if(TABLET.matches){
        CAROUSEL.classList.add("transition-right-tablet");
    }else{
        CAROUSEL.classList.add("transition-right-mobile");
    }

    createCardTemplate("right");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

for(let i = 0; i < pets.length; i++){
  if(!NAMES.includes(pets[i].name)){
    NAMES.push(pets[i].name) 
  }
};

BTN_LEFT.addEventListener("click", moveLeft);
BTN_RIGHT.addEventListener("click", moveRight);

const REMOVE_CLASS = (direction) => {

        CAROUSEL.classList.remove(`transition-${direction}-desktop`);;
        CAROUSEL.classList.remove(`transition-${direction}-tablet`);;
        CAROUSEL.classList.remove(`transition-${direction}-mobile`);;
}

CAROUSEL.addEventListener("animationend", (animationEvent) => {

    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);

    if(animationEvent.animationName === "move-left"){
        REMOVE_CLASS("left");
        const LEFT_CARD = ITEM_LEFT.querySelectorAll('.card')

        let c = 0;
        CARDS_CENTER.forEach((elem) => {
            let p = LEFT_CARD[c].querySelector('p');
            let img = LEFT_CARD[c].querySelector('img');
            elem.querySelector('img').src = `../../assets/images/${p.textContent}.png`;    
            elem.querySelector('p').textContent = p.textContent;
              
          c++;
        });
    }else{
        REMOVE_CLASS("right");
        const RIGHT_CARD = ITEM_RIGHT.querySelectorAll('.card')

        let c = 0;
        CARDS_CENTER.forEach((elem) => {
            let p = RIGHT_CARD[c].querySelector('p');
            let img = RIGHT_CARD[c].querySelector('img');
            elem.querySelector('img').src = `../../assets/images/${p.textContent}.png`;    
            elem.querySelector('p').textContent = p.textContent;
              
          c++;
        });
        };
    

});

// POP UP

const POPUP_OVERLAY = document.querySelector(".popup-overlay");
const POPUP = document.querySelector(".popup")
const PET_CARDS = document.querySelectorAll(".card");
const CROSS_BTN = document.querySelector(".closeBtn");

const MOVE_POPUP = () => {
    POPUP_OVERLAY.classList.toggle("hidden");
    POPUP.classList.toggle("hidden");
    BODY.classList.toggle("no-scroll");
}

PET_CARDS.forEach((elem) => { 
    elem.addEventListener('click', MOVE_POPUP);
}); 

CROSS_BTN.addEventListener('click', MOVE_POPUP); 
POPUP_OVERLAY.addEventListener('click', MOVE_POPUP); 

//ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
