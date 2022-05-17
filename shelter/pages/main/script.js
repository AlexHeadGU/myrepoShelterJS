import pets from '../../pages/main/pets.js';

// SLIDER
const BTN_LEFT = document.querySelector("#btn-left");
const BTN_RIGHT = document.querySelector("#btn-right");
const CAROUSEL = document.querySelector("#carousel");
const ITEM_LEFT = document.querySelector("#item-left");
const ITEM_RIGHT = document.querySelector("#item-right");


const moveLeft = () => {
    CAROUSEL.classList.add("transition-left");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
    CAROUSEL.classList.add("transition-right");
    BTN_LEFT.removeEventListener("click", moveLeft);
    BTN_RIGHT.removeEventListener("click", moveRight);
};

const createCardTemplate = () => {
    const card = document.createElement("div");
    card.classList.add("card");
    return card;
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
    }else{
        CAROUSEL.classList.remove("transition-right");
        changedItem = ITEM_RIGHT;
        document.querySelector("#item-active").innerHTML = ITEM_RIGHT.innerHTML;
        };

    changedItem.innerHTML = "";

    for(let i = 0; i < 3; i++){
        const card = createCardTemplate();
        const img = document.createElement("img");
        const p = document.createElement("p");
        const btn = document.createElement("button");
        card.appendChild(img);
        card.appendChild(p);
        card.appendChild(btn);
        let j = Math.floor(Math.random() * pets.length);
        img.src = `../../assets/images/${pets[j].name.toLowerCase()}.png`;
        img.alt = pets[j].name.toLowerCase();
        p.innerHTML = pets[j].name;
        p.classList.add("pet-name");
        btn.innerHTML = "Learn more";
        btn.classList.add("cardBtn")
        changedItem.appendChild(card);
    }


    // for(let i = 0; i < 3; i++){
    //     const card = createCardTemplate();
    //     card.innerText = Math.floor(Math.random() * 8);
    //     changedItem.appendChild(card);
    // };
    
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

