"use strict";

const W = 1200;
const H = 1800;

const RECT_W = W / 3;
const RECT_H = H;

const X1 = 0;
const X2 = RECT_W;
const X3 = RECT_W * 2;

const blue1 = { r: 30, g: 100, b: 200 };
const blue2 = { r: 30, g: 140, b: 230 };
const blue3 = { r: 30, g: 180, b: 255 };
const white = { r: 255, g: 155, b: 155 };

function setup() {
  createCanvas(W, H);
  noStroke();
}

function draw() {
  background(220);

  // Rect 1
  if (mouseX >= X1 && mouseX < X1 + RECT_W) fill(white.r, white.g, white.b);
  else fill(blue1.r, blue1.g, blue1.b);
  rect(X1, 0, RECT_W, RECT_H);

  // Rect 2
  if (mouseX >= X2 && mouseX < X2 + RECT_W) fill(white.r, white.g, white.b);
  else fill(blue2.r, blue2.g, blue2.b);
  rect(X2, 0, RECT_W, RECT_H);

  // Rect 3
  if (mouseX >= X3 && mouseX < X3 + RECT_W) fill(white.r, white.g, white.b);
  else fill(blue3.r, blue3.g, blue3.b);
  rect(X3, 0, RECT_W, RECT_H);

  console.log(mouseX);
}
