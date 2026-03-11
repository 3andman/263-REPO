// Game state variables
let playerScore = 0; // player's current score
let currentHands = 4; // number of hands remaining
let discardsCount = 3; // number of discards left

// Full deck of 52 cards
let deck = [
  "2H",
  "3H",
  "4H",
  "5H",
  "6H",
  "7H",
  "8H",
  "9H",
  "10H",
  "JH",
  "QH",
  "KH",
  "AH",
  "2D",
  "3D",
  "4D",
  "5D",
  "6D",
  "7D",
  "8D",
  "9D",
  "10D",
  "JD",
  "QD",
  "KD",
  "AD",
  "2C",
  "3C",
  "4C",
  "5C",
  "6C",
  "7C",
  "8C",
  "9C",
  "10C",
  "JC",
  "QC",
  "KC",
  "AC",
  "2S",
  "3S",
  "4S",
  "5S",
  "6S",
  "7S",
  "8S",
  "9S",
  "10S",
  "JS",
  "QS",
  "KS",
  "AS",
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
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// shuffle the deck at the start
shuffle(deck);

// Selected cards tracker
let selectedCards = [];

// Deal initial hand
let hand = deck.splice(0, 10);
hand.sort((a, b) => getCardValue(b) - getCardValue(a)); // sort descending

// dom containers
const handContainer = document.querySelector(".hand-container"); // hand of cards
const playArea = document.querySelector(".play-area"); // played cards area

// hand info and score at top
const handInfo = document.createElement("div");
handInfo.style.position = "fixed";
handInfo.style.top = "10px";
handInfo.style.left = "59.8%";
handInfo.style.transform = "translateX(-50%)";
handInfo.style.textAlign = "center";
handInfo.style.color = "white";
handInfo.style.fontSize = "3.5rem";
handInfo.style.display = "none";
document.body.appendChild(handInfo);

// show hand type score + sum of cards
function showHandPopup(handType, baseScore, cardSum) {
  handInfo.innerHTML = `${handType.toUpperCase()}<br>${baseScore} + ${cardSum}`;
  handInfo.style.display = "block";
  setTimeout(() => (handInfo.style.display = "none"), 3000);
}

// get numerical value of special cards
function getCardValue(card) {
  const rank = card.slice(0, -1);
  if (rank === "A") return 11;
  if (rank === "J","Q","K") return 10;
  return parseInt(rank);
}

// render a single card in hand
function renderCard(card) {
  const img = document.createElement("img");
  img.src = `assets/images/cards/${card}.png`;
  img.className = "card";

  img.addEventListener("click", () => {
    const currentlySelected = document.querySelectorAll(".card.selected");

    if (img.classList.contains("selected")) {
      img.classList.remove("selected");
      selectedCards = selectedCards.filter((c) => c !== card);
    } else if (currentlySelected.length < 5) {
      img.classList.add("selected");
      selectedCards.push(card);
    }

    console.log("Selected:", selectedCards);
  });

  handContainer.appendChild(img);
}

// Render initial hand
handContainer.innerHTML = "";
hand.forEach(renderCard);

// helper: sum values of selected cards
function sumCardValues(cards) {
  return cards.reduce((total, card) => total + getCardValue(card), 0);
}

// detect hand type
function detectHand(cards) {
  const ranks = cards.map((c) => c.slice(0, -1));
  const suits = cards.map((c) => c.slice(-1));
  const values = cards.map(getCardValue).sort((a, b) => a - b);

  const counts = {};
  ranks.forEach((r) => {
    counts[r] = (counts[r] || 0) + 1;
  });
  const occurrences = Object.values(counts);

  const isFlush = suits.length >= 5 && suits.every((s) => s === suits[0]);
  const isStraight =
    values.length >= 5 &&
    values.every((v, i, a) => i === 0 || v === a[i - 1] + 1);

  if (occurrences.includes(4)) return "fourKind";
  if (occurrences.includes(3) && occurrences.includes(2)) return "fullHouse";
  if (isFlush) return "flush";
  if (isStraight) return "straight";
  if (occurrences.includes(3)) return "threeKind";

  const pairs = occurrences.filter((v) => v === 2).length;
  if (pairs === 2) return "twoPair";
  if (pairs === 1) return "pair";

  return "highCard";
}

// hand type scores
const handScores = {
  highCard: 5,
  pair: 20,
  twoPair: 40,
  threeKind: 90,
  straight: 120,
  flush: 140,
  fullHouse: 160,
  fourKind: 280,
};

// calculate hand score
function calculateHandScore(cards) {
  const handType = detectHand(cards);
  const baseScore = handScores[handType];
  const cardSum = sumCardValues(cards);
  const total = baseScore + cardSum;

  console.log("Hand:", handType, "Sum:", cardSum, "Total:", total);
  showHandPopup(handType, baseScore, cardSum);

  return total;
}

// Play hand button
const playButton = document.querySelector(".play-hand-button");
playButton.addEventListener("click", () => {
  if (currentHands > 0 && selectedCards.length > 0) {
    currentHands--;
    const totalScore = calculateHandScore(selectedCards);
    playerScore += totalScore;
    updateMenu();

    playArea.innerHTML = "";
    const cardsPlayedCount = selectedCards.length;

    // remove played cards from hand
    selectedCards.forEach((card) => {
      const cardImg = document.querySelector(
        `.hand-container img[src='assets/images/cards/${card}.png']`,
      );
      if (cardImg) handContainer.removeChild(cardImg);
      hand = hand.filter((c) => c !== card); // remove from hand array
      const img = document.createElement("img");
      img.src = `assets/images/cards/${card}.png`;
      img.className = "card-played";
      playArea.appendChild(img);
    });

    selectedCards = [];

    // draw new cards
    setTimeout(() => {
      playArea.innerHTML = "";
      const newCards = deck.splice(0, cardsPlayedCount);
      hand = hand.concat(newCards); // add to hand
      hand.sort((a, b) => getCardValue(b) - getCardValue(a)); // sort descending
      handContainer.innerHTML = ""; // re-render hand
      hand.forEach(renderCard);
    }, 3000);
  }
});

// discard button
const discardButton = document.querySelector(".discard-button");
discardButton.addEventListener("click", () => {
  if (discardsCount > 0 && selectedCards.length > 0) {
    const cardsDiscardedCount = selectedCards.length;
    discardsCount--;
    updateMenu();

    selectedCards.forEach((card) => {
      const cardImg = document.querySelector(
        `.hand-container img[src='assets/images/cards/${card}.png']`,
      );
      if (cardImg) handContainer.removeChild(cardImg);
      hand = hand.filter((c) => c !== card);
    });

    selectedCards = [];

    setTimeout(() => {
      const newCards = deck.splice(0, cardsDiscardedCount);
      hand = hand.concat(newCards);
      hand.sort((a, b) => getCardValue(b) - getCardValue(a));
      handContainer.innerHTML = "";
      hand.forEach(renderCard);
    }, 3000);
  }
});
