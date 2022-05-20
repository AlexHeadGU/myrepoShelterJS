import pets from '../../pages/main/pets.js';

// SLIDER
const BTN_LEFT = document.querySelector("#btn-left");
const BTN_RIGHT = document.querySelector("#btn-right");
const CAROUSEL = document.querySelector("#carousel");
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_RIGHT = document.querySelector("#item-right");
const ITEM_ACTIVE = document.querySelector("#item-active");


const moveLeft = () => {
    CAROUSEL.classList.add("transition-left");
    createCardTemplate();
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
    CAROUSEL.classList.add("transition-right");
    createCardTemplate();
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

const createCardTemplate = () => {
    for(let i = 0; i < 3; i++){
        const img = ITEM_LEFT.querySelectorAll("img");
        const p = ITEM_LEFT.querySelectorAll("p");
       
        for(let i = 0; i < img.length; i++){
            let j = Math.floor(Math.random() * pets.length);
            img[i].src = `../../assets/images/${pets[j].name.toLowerCase()}.png`;
            img[i].alt = pets[j].name.toLowerCase();
            p[i].innerHTML = pets[j].name;
        }
    }
};

const names = [];

for(let i = 0; i < pets.length; i++){
  if(!names.includes(pets[i].name)){
    names.push(pets[i].name) 
  }
};

console.log(names);

BTN_LEFT.addEventListener("click", moveLeft);
BTN_RIGHT.addEventListener("click", moveRight);

CAROUSEL.addEventListener("animationend", (animationEvent) => {
    console.log(animationEvent);
    let changedItem;
    if(animationEvent.animationName === "move-left"){
        CAROUSEL.classList.remove("transition-left");
        changedItem = ITEM_LEFT;
        document.querySelector("#item-active").innerHTML = ITEM_LEFT.innerHTML;
        let elem = document.querySelector("#item-active")
        var matches = elem.querySelectorAll("div.card");

        for (let i = 0; i < matches.length; i++){
            matches[i].classList.remove("cards-left"); 
        }

    }else{
        CAROUSEL.classList.remove("transition-right");
        changedItem = ITEM_RIGHT;
        document.querySelector("#item-active").innerHTML = ITEM_RIGHT.innerHTML;
        };

    
    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
});













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

//ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

