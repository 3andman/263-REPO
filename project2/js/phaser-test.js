const config = {
  type: Phaser.AUTO,

  width: 400,
  height: 200,

  parent: "phaser-test",

  backgroundColor: "#003300",

  scene: {
    create: create,
  },
};

const game = new Phaser.Game(config);


function create() {
  this.add.text(50, 80, "phaser works", {
    fontSize: "24px",
    color: "#ffffff",
  });
}
