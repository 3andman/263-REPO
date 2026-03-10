
// game state variables
let playerScore = 0; // player's current score
let currentHands = 4; // number of hands remaining
let discardsCount = 3; // number of discards left

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
