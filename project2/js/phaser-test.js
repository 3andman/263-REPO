const config = {
  type: Phaser.AUTO,

  width: 600,
  height: 250,

  parent: "phaser-hand",

  backgroundColor: "#003300",

  scene: {
    preload,
    create,
  },
};

const game = new Phaser.Game(config);


function preload() {
  const suits = ["H", "D", "C", "S"];
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      let name = `${rank}${suit}`;

      this.load.image(name, `assets/images/cards/${name}.png`);
    });
  });
}


function create() {
  // wait until playing.js finishes
  setTimeout(() => {
    if (!window.currentHand) {
      console.log("Hand not ready yet");
      return;
    }

    renderHand.call(this);
  }, 100);
}

// render hand

function renderHand() {
  const hand = window.currentHand;

  const spacing = 90;
  const totalWidth = (hand.length - 1) * spacing;

  // center hand horizontally
  const startX = (600 - totalWidth) / 2;

  hand.forEach((card, index) => {
    let x = startX + index * spacing;
    let y = 150;

    let sprite = this.add.image(x, y, card);

    sprite.setScale(0.3);

    sprite.setInteractive();

    sprite.selected = false;

    sprite.on("pointerdown", () => {
      if (sprite.selected) {
        sprite.y += 30;
        sprite.selected = false;

        window.selectedCards = window.selectedCards.filter((c) => c !== card);
      } else {
        if (window.selectedCards.length < 5) {
          sprite.y -= 30;
          sprite.selected = true;

          window.selectedCards.push(card);
        }
      }
    });
  });
}
