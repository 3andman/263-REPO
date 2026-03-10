

// Game state variables
let playerScore = 0;      // player's current score
let currentHands = 4;     // number of hands remaining
let discardsCount = 3;    // number of discards left

// Full deck of 52 cards
const deck = [
  "2H","3H","4H","5H","6H","7H","8H","9H","10H","JH","QH","KH","AH",
  "2D","3D","4D","5D","6D","7D","8D","9D","10D","JD","QD","KD","AD",
  "2C","3C","4C","5C","6C","7C","8C","9C","10C","JC","QC","KC","AC",
  "2S","3S","4S","5S","6S","7S","8S","9S","10S","JS","QS","KS","AS"
];

// update menu display
function updateMenu() {
  document.getElementById("menu-score").textContent = playerScore;
  document.getElementById("menu-hands").textContent = currentHands;
  document.getElementById("menu-discards").textContent = discardsCount;
}

// call once at start to show initial values
updateMenu();

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // swap current element with random element
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// shuffle the deck at the start
shuffle(deck);

// Selected cards tracker
let selectedCards = [];

// Deal initial hand 
const hand = deck.splice(0, 10);

// DOM containers
const handContainer = document.querySelector(".hand-container");  // hand of cards
const playArea = document.querySelector(".play-area");           // played cards area

// render a single card in hand
function renderCard(card) {
  const img = document.createElement("img");        // create image element
  img.src = `assets/images/cards/${card}.png`;      // set card image source
  img.className = "card";                            // assign card class for styling


  // Click handler for selecting and deselecting card

  img.addEventListener("click", () => {
    const currentlySelected = document.querySelectorAll(".card.selected"); // get all selected cards

    if (img.classList.contains("selected")) {
      // deselect card if already selected
      img.classList.remove("selected");
      selectedCards = selectedCards.filter((c) => c !== card); // remove from selectedCards array
    } else if (currentlySelected.length < 5) {
      // select card if fewer than 5 are selected
      img.classList.add("selected");
      selectedCards.push(card); // add to selectedCards array
    }

    console.log("Selected:", selectedCards);
  });

  // append the card image to the hand container
  handContainer.appendChild(img);
}

// Render initial hand
hand.forEach(renderCard);

// Play hand button
const playButton = document.querySelector(".play-hand-button");
playButton.addEventListener("click", () => {
  // only if player has hands left and has selected cards
  if (currentHands > 0 && selectedCards.length > 0) {

    // update hands  score
    currentHands--;
    playerScore += 100;   // temporary scoring
    updateMenu();

    // clear previous cards in play area
    playArea.innerHTML = "";

    const cardsPlayedCount = selectedCards.length; // number of cards being played

    // move selected cards from hand to play area
    selectedCards.forEach((card) => {
      // remove from hand container
      const cardImg = document.querySelector(
        `.hand-container img[src='assets/images/cards/${card}.png']`
      );
      if (cardImg) handContainer.removeChild(cardImg);

      // create a new image in play area
      const img = document.createElement("img");
      img.src = `assets/images/cards/${card}.png`;
      img.className = "card-played";   // styling for played cards
      playArea.appendChild(img);
    });

    // clear selectedCards array
    selectedCards = [];

    // after 3 seconds remove and draw new cards
    setTimeout(() => {
      playArea.innerHTML = "";

      // draw new cards equal to number played
      const newCards = deck.splice(0, cardsPlayedCount);
      newCards.forEach(renderCard);
    }, 3000);
  }
});

// Discard button
const discardButton = document.querySelector(".discard-button");
discardButton.addEventListener("click", () => {
  if (discardsCount > 0) {
    discardsCount--;
    updateMenu();
  }
});