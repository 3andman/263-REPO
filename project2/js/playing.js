
// GAME STATE
let gameState = {
  playerScore: 0,
  currentHands: 4,
  discardsCount: 3,
  startingHandSize: 10,
  doubleFaceCards: false,
  doubleAtZeroDiscards: false,
  extraHands: 0,
  noDiscards: false,
  colorBlind: false,
  discardScoreBonus: 0,
  doubleSmallHands: false,
  handSize: 10,
};

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

const music = document.getElementById("bg-music");

music.volume = 0.2;

document.addEventListener(
  "click",
  () => {
    music.play().catch(() => {});
  },
  { once: true },
);

import { getState } from "./state.js";
import { jokerEffects } from "./jokers.js";

const savedState = getState();

// apply joker effects using IDs
savedState.jokers.forEach((jokerId) => {
  const apply = jokerEffects[jokerId];

  if (apply) {
    apply(gameState);
  }
});

console.log("JOKERS LOADED:", savedState.jokers);
console.log("DOUBLE SMALL HANDS:", gameState.doubleSmallHands);

if (gameState.extraHands > 0) {
  gameState.currentHands += gameState.extraHands;
}

if (gameState.noDiscards) {
  gameState.discardsCount = 0;
}

console.log("ACTIVE JOKERS:", gameState);



// update menu display
function updateMenu() {
  document.getElementById("menu-score").textContent = gameState.playerScore;
  document.getElementById("menu-hands").textContent = gameState.currentHands;
  document.getElementById("menu-discards").textContent =
    gameState.discardsCount;
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


// dom containers
const handContainer = document.querySelector(".hand-container"); // hand of cards
const playArea = document.querySelector(".play-area"); // played cards area

// Deal initial hand
let hand = deck.splice(0, gameState.startingHandSize);
hand.sort((a, b) => getCardRank(b) - getCardRank(a)); // sort descending
console.log("Starting hand size:", gameState.startingHandSize);
console.log("Cards dealt:", hand.length);

// update the menu title based on blind
const menuTitle = document.getElementById("menu-title");

const selectedBlind = localStorage.getItem("selectedBlind");

let scoreGoal;

if (selectedBlind === "small") {
  scoreGoal = 300;
} else if (selectedBlind === "big") {
  scoreGoal = 600;
} else if (selectedBlind === "boss") {
  scoreGoal = 1000;
} else {
  scoreGoal = 300; // fallback
}

if (selectedBlind === "small") {
  menuTitle.textContent = `Small Blind — Goal: ${scoreGoal}`;
}

if (selectedBlind === "big") {
  menuTitle.textContent = `Big Blind — Goal: ${scoreGoal}`;
}

if (selectedBlind === "boss") {
  menuTitle.textContent = `Boss Blind — Goal: ${scoreGoal}`;
}

// hand info and score at top
const handInfo = document.createElement("div");
handInfo.style.position = "fixed";
handInfo.style.top = "10px";
handInfo.style.left = "59.8%";
handInfo.style.transform = "translateX(-50%)";
handInfo.style.textAlign = "center";
handInfo.style.color = "white";
handInfo.style.fontSize = "3.5rem";

handInfo.style.zIndex = "9999";
handInfo.style.pointerEvents = "none";

handInfo.style.display = "none";
document.body.appendChild(handInfo);

// show hand type score + sum of cards
function showHandPopup(handType, baseScore, cardSum, total) {
  console.log("POPUP:", handType);

handInfo.innerHTML =
  `${handType.toUpperCase()}<br>${baseScore} + ${cardSum}<br>= ${total}`;
  handInfo.style.display = "block";
  setTimeout(() => (handInfo.style.display = "none"), 2500);
}

function getCardRank(card) {
  const rank = card.slice(0, -1);

  if (rank === "A") return 14;
  if (rank === "K") return 13;
  if (rank === "Q") return 12;
  if (rank === "J") return 11;

  return parseInt(rank);
}

// get numerical value of a card
function getCardScore(card) {
  const rank = card.slice(0, -1);

  let value;

  if (rank === "A") value = 11;
  else if (rank === "J" || rank === "Q" || rank === "K") value = 10;
  else value = parseInt(rank);

  // Two Face Joker
  if (
    gameState.doubleFaceCards &&
    (rank === "J" || rank === "Q" || rank === "K")
  ) {
    value *= 2;
  }

  return value;
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
  return cards.reduce((total, card) => total + getCardScore(card), 0);
}

// detect hand type
// splits played cards into ranks and suits
// counts duplicates of either
// turns them into occurances
// checks for patters
// flush and straights need their own function
function detectHand(cards) {
  const ranks = cards.map((c) => c.slice(0, -1));
  const suits = cards.map((c) => c.slice(-1));
  const values = cards.map(getCardRank).sort((a, b) => a - b);
  const counts = {};

  ranks.forEach((r) => {
    counts[r] = (counts[r] || 0) + 1;
  });
  const occurrences = Object.values(counts);

  const isFlush = suits.length >= 5 && suits.every((s) => s === suits[0]);

  function isStraight(values) {
    const unique = [...new Set(values)].sort((a, b) => a - b);

    if (unique.length < 5) return false;

    for (let i = 0; i <= unique.length - 5; i++) {
      let streak = 1;

      for (let j = i + 1; j < unique.length; j++) {
        if (unique[j] === unique[j - 1] + 1) {
          streak++;
          if (streak >= 5) return true;
        } else {
          break;
        }
      }
    }

    // ace straight
    const aceLow = [14, 5, 4, 3, 2];
    if (aceLow.every((v) => unique.includes(v))) return true;

    return false;
  }

  // checks top to bottom so if it finds one it stops

  if (isFlush && isStraight(values)) return "straightFlush";
  if (occurrences.includes(4)) return "fourKind";
  if (occurrences.includes(3) && occurrences.includes(2)) return "fullHouse";
  if (isFlush) return "flush";
  if (isStraight(values)) return "straight";
  if (occurrences.includes(3)) return "threeKind";

  // 2 occurances = pair
  const pairs = occurrences.filter((v) => v === 2).length;
  if (pairs === 2) return "twoPair";
  if (pairs === 1) return "pair";

  // no hand detected = else is high card
  return "highCard";
}

// hand type scores
const handScores = {
  highCard: 10,
  pair: 20,
  twoPair: 40,
  threeKind: 90,
  straight: 120,
  flush: 140,
  fullHouse: 160,
  fourKind: 280,
  straightFlush: 400,
};

// calculate hand score
function calculateHandScore(cards) {
  const handType = detectHand(cards);
  const baseScore = handScores[handType];
  const cardSum = sumCardValues(cards);

console.log("Baby Hands:", gameState.doubleSmallHands);
console.log("Cards played:", cards.length);
console.log("Base score:", baseScore);
console.log("Before multipliers:", baseScore + cardSum);

  let total = baseScore + cardSum;

  // Last Chance Joker
  if (gameState.doubleAtZeroDiscards && gameState.discardsCount === 0) {
    total *= 2;
  }

  // Baby Hands Joker
  if (gameState.doubleSmallHands && cards.length <= 3) {
    total *= 2;
  }

  // Confident Joker
  if (gameState.discardScoreBonus > 0) {
    total += gameState.discardsCount * gameState.discardScoreBonus;
  }

  console.log("Total after jokers:", total);
  console.log("HAND TYPE:", handType);
  console.log("BASE SCORE:", baseScore);
  console.log("CARD SUM:", cardSum);
  
  return {
    handType,
    baseScore,
    cardSum,
    total,
  };



}

// Play hand button
const playButton = document.querySelector(".play-hand-button");
playButton.addEventListener("click", () => {
  if (gameState.currentHands > 0 && selectedCards.length > 0) {
    gameState.currentHands--;
    const scoreData = calculateHandScore(selectedCards);

    // show popup at top
showHandPopup(
  scoreData.handType,
  scoreData.baseScore,
  scoreData.cardSum,
  scoreData.total,
);

    // add score
    gameState.playerScore += scoreData.total;
    updateMenu();

    if (gameState.currentHands === 0 && gameState.playerScore < scoreGoal) {
      setTimeout(() => {
        window.location.href = "blind.html";
      }, 1500);
      return; // stop further play logic
    }

    if (gameState.playerScore >= scoreGoal) {
      // mark this blind as defeated
      localStorage.setItem("defeatedBlind", selectedBlind);

      // wait 3 seconds before redirecting to shop
      setTimeout(() => {
        window.location.href = "shop.html";
      }, 1900);
    }

    // clear area and count how many cards played
    playArea.innerHTML = "";
    const cardsPlayedCount = selectedCards.length;

    // find and remove played cards from hand
    selectedCards.forEach((card) => {
      const cardImg = document.querySelector(
        `.hand-container img[src='assets/images/cards/${card}.png']`,
      );
      // remove visually
      if (cardImg) handContainer.removeChild(cardImg);
      // remove data
      hand = hand.filter((c) => c !== card); // remove from hand array

      // show in play area
      const img = document.createElement("img");
      img.src = `assets/images/cards/${card}.png`;
      img.className = "card-played";
      playArea.appendChild(img);
    });

    // clear
    selectedCards = [];

    // draw new cards
    setTimeout(() => {
      playArea.innerHTML = "";
      const newCards = deck.splice(0, cardsPlayedCount);
      hand = hand.concat(newCards); // add to hand
      hand.sort((a, b) => getCardRank(b) - getCardRank(a)); // sort descending
      handContainer.innerHTML = ""; // re-render hand
      hand.forEach(renderCard);
    }, 2500);
  }
});

// discard button
const discardButton = document.querySelector(".discard-button");
discardButton.addEventListener("click", () => {
  if (gameState.discardsCount > 0 && selectedCards.length > 0) {
    const cardsDiscardedCount = selectedCards.length;
    gameState.discardsCount--;
    updateMenu();
    
    console.log("Discard clicked");
    console.log("Discards left:", gameState.discardsCount);
    console.log("Selected cards:", selectedCards);

    selectedCards.forEach((card) => {
      const cardImg = document.querySelector(
        `.hand-container img[src='assets/images/cards/${card}.png']`,
      );
      if (cardImg) handContainer.removeChild(cardImg);
      hand = hand.filter((c) => c !== card);
    });

    selectedCards = [];
    
    console.log("Discarding:", cardsDiscardedCount);
    console.log("Remaining hand:", hand.length);

    setTimeout(() => {
      const newCards = deck.splice(0, cardsDiscardedCount);
      hand = hand.concat(newCards);
      hand.sort((a, b) => getCardRank(b) - getCardRank(a));
      handContainer.innerHTML = "";
      hand.forEach(renderCard);
    }, 1000);
  }
});
