import pets from '../../pages/main/pets.js';

// SLIDER
const BTN_LEFT = document.querySelector("#btn-left");
const BTN_RIGHT = document.querySelector("#btn-right");
const CAROUSEL = document.querySelector("#carousel");
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_RIGHT = document.querySelector("#item-right");
const ITEM_ACTIVE = document.querySelector("#item-active");
const names = [];

const createCardTemplate = (direction) => {
    let img;
    let p;
    let newArr = ITEM_ACTIVE.querySelectorAll("p");
    let activeArr = [];

    for(let i = 0; i < newArr.length; i++){
        activeArr.push(newArr[i].textContent);
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

            if(activeArr.includes(pets[j].name)){
                k--;
            }else{
                img[i].src = `../../assets/images/${pets[j].name.toLowerCase()}.png`;
                img[i].alt = pets[j].name.toLowerCase();
                p[i].innerHTML = pets[j].name;
                activeArr.push(pets[j].name);
            }
        }
    }
};

const moveLeft = () => {
    CAROUSEL.classList.add("transition-left");
    createCardTemplate("left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
    CAROUSEL.classList.add("transition-right");
    createCardTemplate("right");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

for(let i = 0; i < pets.length; i++){
  if(!names.includes(pets[i].name)){
    names.push(pets[i].name) 
  }
};

BTN_LEFT.addEventListener("click", moveLeft);
BTN_RIGHT.addEventListener("click", moveRight);

const REMOVE_CLASS = (direction) => {
    CAROUSEL.classList.remove(`transition-${direction}`);

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
    if(animationEvent.animationName === "move-left"){
        REMOVE_CLASS("left");
    }else{
        REMOVE_CLASS("right");
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

