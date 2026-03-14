
// making jokers that will randomly appear in the shop at the end of round
export const jokers = [
  {
    id: "draw2",
    name: "Draw Two", // icon will be the uno +2 card
    description: "Hand holds +2 cards.",
    apply: (gameState) => {
      gameState.startingHandSize = (gameState.startingHandSize || 10) + 2;
    },
  },
  {
    id: "twoface",
    name: "Two Face",
    description: "All face cards score twice.",
    apply:
      
    },
  {
    id: "lastchance",
    name: "Last Chance",
    description: "Hand score is doubled when 0 discards remain.",
    apply: 
    
    },
    {
      
        id: "gambler"
        name: "The Gambler"
        description: "Gain 2 hands but lose all discards."
        apply:
  }
  
       {
      
        id: "colorblind"
        name: "Color Blind"
        description: "Hearts and diamonds count as the same suit. Spades and clubs count as the same suit."
        apply:
       }
       
          {
      
        id: ""
        name: ""
        description: "Spades are worth double."
        apply:
  }
  
            {
      
        id: ""
        name: ""
        description: "Clubs are worth double."
        apply:
  }
  
            {
      
        id: ""
        name: ""
        description: "Diamonds are worth double."
        apply:
  }
  
            {
      
        id: ""
        name: ""
        description: "Hearts are worth double."
        apply:
  }
  
            {
      
        id: "confident"
        name: "Confident"
        description: "Adds 50 score per remaining discard."
        apply:
  }

            
                      {
      
        id: 
        name: 
        description: "Double hand score if played hand has 3 or fewer cards."
        apply:
  }
];
