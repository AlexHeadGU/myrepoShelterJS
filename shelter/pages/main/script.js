import pets from '../../pages/main/pets.js';


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

    console.log("aaaaaa");
        CAROUSEL.classList.remove(`transition-${direction}-desktop`);;
        CAROUSEL.classList.remove(`transition-${direction}-tablet`);;
        CAROUSEL.classList.remove(`transition-${direction}-mobile`);;

    if(direction==="left"){
        let changedItem = ITEM_LEFT;
        document.querySelector("#item-active").innerHTML = ITEM_LEFT.innerHTML;
    }else{
        let changedItem = ITEM_RIGHT;
        document.querySelector("#item-active").innerHTML = ITEM_RIGHT.innerHTML;
    }
    
    let elem = document.querySelector("#item-active")
    var matches = elem.querySelectorAll("div.card");

    for (let i = 0; i < matches.length; i++){
        matches[i].classList.remove(`cards-${direction}`); 
    }
}

CAROUSEL.addEventListener("animationend", (animationEvent) => {
    console.log("22222222");
    if(animationEvent.animationName === "move-left"){
        REMOVE_CLASS("left");
    }else{
        REMOVE_CLASS("right");
        };
    
    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
});

// POP UP

const POPUP_OVERLAY = document.querySelector(".popup-overlay");
const PET_CARDS = document.querySelectorAll(".card");

const MOVE_POPUP = () => {
    POPUP_OVERLAY.classList.toggle("hidden");
}

PET_CARDS.forEach((elem) => { elem.addEventListener('click', MOVE_POPUP) }); 
POPUP_OVERLAY.addEventListener('click', MOVE_POPUP); 
// PET_CARDS.forEach((elem) => { elem.addEventListener('click', scrollPopup) });

//ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
