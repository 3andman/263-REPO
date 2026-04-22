// game state variables
let playerScore = 0; // player's current score
let currentHands = 4; // number of hands remaining
let discardsCount = 3; // number of discards left
let currentBlind = "";

const music = document.getElementById("bg-music");

music.volume = 0.4;

document.addEventListener(
  "click",
  () => {
    music.play().catch(() => {});
  },
  { once: true },
);

// select all blind buttons on the page
const blindButtons = document.querySelectorAll(".blind-button");

// add click event listener to each blind button
blindButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // when any blind button is clicked, navigate to playing screen
    window.location.href = "playing.html";
  });
});

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

// pregression system!!!!
// default state
let unlocked = {
  small: true,
  big: false,
  boss: false,
};

// progression rules
if (defeatedBlind === "small") {
  unlocked.big = true;
}

if (defeatedBlind === "big") {
  unlocked.big = false;
  unlocked.boss = true;
}

// apply to UI
smallBlindButton.disabled = !unlocked.small;
bigBlindButton.disabled = !unlocked.big;
bossBlindButton.disabled = !unlocked.boss;