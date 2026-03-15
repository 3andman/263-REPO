import { jokers } from "./jokers.js";

// load player jokers
let activeJokers = JSON.parse(localStorage.getItem("activeJokers")) || [];

// shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// remove jokers the player already owns
const ownedIds = activeJokers.map((j) => j.id);
const jokerPool = jokers.filter((j) => !ownedIds.includes(j.id));

shuffle(jokerPool);

// take first two
const joker1 = jokerPool[0];
const joker2 = jokerPool[1] || jokerPool[0]; // if only one left

// fill UI
document.getElementById("joker1-img").src = joker1.image;
document.getElementById("joker1-name").textContent = joker1.name;
document.getElementById("joker1-desc").textContent = joker1.description;

document.getElementById("joker2-img").src = joker2.image;
document.getElementById("joker2-name").textContent = joker2.name;
document.getElementById("joker2-desc").textContent = joker2.description;

// select joker
document.getElementById("joker1-btn").addEventListener("click", () => {
  activeJokers.push(joker1);
  localStorage.setItem("activeJokers", JSON.stringify(activeJokers));
  window.location.href = "blind.html";
});

document.getElementById("joker2-btn").addEventListener("click", () => {
  activeJokers.push(joker2);
  localStorage.setItem("activeJokers", JSON.stringify(activeJokers));
  window.location.href = "blind.html";
});
