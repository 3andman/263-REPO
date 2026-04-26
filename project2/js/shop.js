import { jokers } from "./jokers.js";
import { addJoker, getState } from "./state.js";

const music = document.getElementById("bg-music");
// try autoplay
music.volume = 0.2;

// load player jokers from central state
const state = getState();
let activeJokers = state.jokers || [];

// shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// remove jokers the player already owns
const ownedIds = activeJokers;
const jokerPool = jokers.filter((j) => !ownedIds.includes(j.id));

const selectedJokers = _.sampleSize(jokerPool, Math.min(2, jokerPool.length));

const joker1 = selectedJokers[0];
const joker2 = selectedJokers[1];

// fill UI
document.getElementById("joker1-img").src = joker1.image;
document.getElementById("joker1-name").textContent = joker1.name;
document.getElementById("joker1-desc").textContent = joker1.description;

if (joker2) {
  document.getElementById("joker2-img").src = joker2.image;
  document.getElementById("joker2-name").textContent = joker2.name;
  document.getElementById("joker2-desc").textContent = joker2.description;
} else {
  document.getElementById("joker2-btn").style.display = "none";
}

if (joker1) {
  document.getElementById("joker1-img").src = joker1.image;
  document.getElementById("joker1-name").textContent = joker1.name;
  document.getElementById("joker1-desc").textContent = joker1.description;
}

// select joker 1
document.getElementById("joker1-btn").addEventListener("click", () => {
  addJoker(joker1);
  window.location.href = "blind.html";
});

// select joker 2
document.getElementById("joker2-btn").addEventListener("click", () => {
  addJoker(joker2);
  window.location.href = "blind.html";
});

// skip shop
document.getElementById("next-blind-button").addEventListener("click", () => {

  localStorage.setItem("inShop", "false");

  // return to blind select
  window.location.href = "blind.html";
});
