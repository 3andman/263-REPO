"use strict";

const canvasW = 1920;
const canvasH = 1440;

let counter = 0;

//objects
const orangeButton = {
  x: 120,
  y: 200,
  w: 140,
  h: 140,
  base: { r: 255, g: 140, b: 0 },
  hover: { r: 255, g: 190, b: 80 },
};

const redButton = {
  x: 320,
  y: 200,
  w: 140,
  h: 140,
  base: { r: 220, g: 30, b: 30 },
  hover: { r: 255, g: 100, b: 100 },
};

//ellipses
const centerX = canvasW / 2;
const centerY = canvasH / 2;

const baseRadius = 50; // starting size
const radiusStep = 90; // how much bigger each next ellipse is
const baseAlpha = 20; // starting alpha
const alphaStep = 20; // how much alpha increases each ellipse

function setup() {
  createCanvas(canvasW, canvasH);
  noStroke();
}

function draw() {
  background(30);

  button(orangeButton);
  button(redButton);

  //only when counter is between 1 and 10
  if (counter >= 1 && counter <= 10) {
    let i = 0; // while loop counter

    //
    while (i < counter) {
      const r = baseRadius + i * radiusStep;
      const a = baseAlpha + i * alphaStep;

      drawCircle(centerX, centerY, r, a);
      i += 1;
    }
  }

  //counter
  fill(255);
  textSize(18);
  text("counter: " + counter, 20, 30);
}

//squarre hover
function button(sq) {
  const hovering = buttonCollision(sq);

  if (hovering) {
    fill(sq.hover.r, sq.hover.g, sq.hover.b);
  } else {
    fill(sq.base.r, sq.base.g, sq.base.b);
  }

  rect(sq.x, sq.y, sq.w, sq.h);
}

//collision
function buttonCollision(sq) {
  const insideX = mouseX >= sq.x && mouseX <= sq.x + sq.w;
  const insideY = mouseY >= sq.y && mouseY <= sq.y + sq.h;
  return insideX && insideY;
}

//mouse
function mousePressed() {
  // orange +
  if (buttonCollision(orangeButton)) {
    counter += 1;
  }

  // red -
  if (buttonCollision(redButton)) {
    counter -= 1;
  }

  //
  if (counter < 0) counter = 0;
  if (counter > 10) counter = 10;
}
//circle
function drawCircle(x, y, radius, alpha) {
  fill(255, 255, 255, alpha); // white with alpha
  ellipse(x, y, radius * 2, radius * 2);
}
