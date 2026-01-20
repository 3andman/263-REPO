"use strict";
//canvas
const canvasW = 1000;
const canvasH = 800;

//text object
const testText = {
  str: "test",
  size: 28,
  col: 255,
};

//spacing
const offset = 45;

function setup() {
  createCanvas(canvasW, canvasH);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0);

  //center
  fill(testText.col);
  textSize(testText.size);
  text(testText.str, canvasW / 2, canvasH / 2);

  // for loop 1: 0 → 9 (x offset)
  let i;
  for (i = 0; i <= 9; i += 1) {
    const xPos = i * offset + 20;
    const yPos = 40;

    text(i, xPos, yPos);
  }

  // for loop 2: 15 → 1 (y offset)
  let j;
  for (j = 1; j <= 15; j += 1) {
    //largest at top smallest at bottom
    const xPos = 20;
    const yPos = j * offset + 45;

    text(j, xPos, yPos);
  }
}
