// making jokers that will randomly appear in the shop at the end of round
export const jokers = [
  {
    id: "draw2",
    name: "Draw Two", // icon will be the uno +2 card
    description: "Hand holds +2 cards.",
    image: "assets/images/jokers/draw2.png",
    apply: (gameState) => {
      gameState.startingHandSize = (gameState.startingHandSize || 10) + 2;
    },
  },

  {
    id: "twoface",
    name: "Two Face",
    description: "All face cards score twice.",
    image: "assets/images/jokers/twoface.png",
    apply: (gameState) => {
      gameState.doubleFaceCards = true;
    },
  },

  {
    id: "lastchance",
    name: "Last Chance",
    description: "Hand score is doubled when 0 discards remain.",
    image: "assets/images/jokers/lastchance.png",
    apply: (gameState) => {
      gameState.doubleAtZeroDiscards = true;
    },
  },

  {
    id: "gambler",
    name: "The Gambler",
    description: "Gain 2 hands but lose all discards.",
    image: "assets/images/jokers/gambler.png",
    apply: (gameState) => {
      gameState.extraHands = (gameState.extraHands || 0) + 2;
      gameState.noDiscards = true;
    },
  },

  // {
  //   id: "colorblind",
  //   name: "Color Blind",
  //   description:
  //     "Hearts and diamonds count as the same suit. Spades and clubs count as the same suit.",
  //   image: "assets/images/jokers/colorblind.png",
  //   apply: (gameState) => {
  //     gameState.colorBlind = true;
  //   },
  // },

  {
    id: "confident",
    name: "Confident",
    description: "Adds 50 score per remaining discard.",
    image: "assets/images/jokers/confident.png",
    apply: (gameState) => {
      gameState.discardScoreBonus = 50;
    },
  },

  {
    id: "babyhands",
    name: "Baby Hands",
    description: "Double hand score if played hand has 3 or fewer cards.",
    image: "assets/images/jokers/babyhands.png",
    apply: (gameState) => {
      gameState.doubleSmallHands = true;
    },
  },
];