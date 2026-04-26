// game state variables
let playerScore = 0; // player's current score
let currentHands = 4; // number of hands remaining
let discardsCount = 3; // number of discards left
let currentBlind = "";

const music = document.getElementById("bg-music");

music.volume = 0.15;

document.addEventListener(
  "click",
  () => {
    music.play().catch(() => {});
  },
  { once: true },
);

// select all blind buttons on the page
const blindButtons = document.querySelectorAll(".blind-button");

// function to update the menu display
function updateMenu() {
  // set the score display
  document.getElementById("menu-score").textContent = playerScore;
  // set the remaining hands display
  document.getElementById("menu-hands").textContent = currentHands;
  // set the remaining discards display
  document.getElementById("menu-discards").textContent = discardsCount;
}

// call updateMenu once at the start to display initial values
updateMenu();

const blindScreen = document.getElementById("blind-select-screen");
const gameScreen = document.getElementById("game-screen");

const smallBlindButton = document.getElementById("small-blind-button");
const bigBlindButton = document.getElementById("big-blind-button");
const bossBlindButton = document.getElementById("boss-blind-button");

// lock higher blinds at start
smallBlindButton.disabled = false;
bigBlindButton.disabled = true;
bossBlindButton.disabled = true;

const defeatedBlind = localStorage.getItem("defeatedBlind");

// start only small unlocked
smallBlindButton.disabled = false;
bigBlindButton.disabled = true;
bossBlindButton.disabled = true;

// progression
if (defeatedBlind === "small") {
  smallBlindButton.disabled = true;
  bigBlindButton.disabled = false;
}

if (defeatedBlind === "big") {
  smallBlindButton.disabled = true;
  bigBlindButton.disabled = true;
  bossBlindButton.disabled = false;
}

smallBlindButton.addEventListener("click", () => {
  if (!smallBlindButton.disabled) {
    localStorage.setItem("selectedBlind", "small");
    window.location.href = "playing.html";
  }
});

bigBlindButton.addEventListener("click", () => {
  if (!bigBlindButton.disabled) {
    localStorage.setItem("selectedBlind", "big");
    window.location.href = "playing.html";
  }
});

bossBlindButton.addEventListener("click", () => {
  if (!bossBlindButton.disabled) {
    localStorage.setItem("selectedBlind", "boss");
    window.location.href = "playing.html";
  }
});