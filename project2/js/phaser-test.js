const config = {
  type: Phaser.AUTO,

  width: 600,
  height: 250,

  parent: "phaser-test",

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

  hand.forEach((card, index) => {
    let x = 60 + index * 50;
    let y = 150;

    let sprite = this.add.image(x, y, card);

    sprite.setScale(0.3);
  });
}
