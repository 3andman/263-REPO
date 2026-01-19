"use strict";

let x = 500;
let y = 500;
let w = 140;
let h = 140;
let r = 50;
let g = 50;
let b = 50;

function setup() {
  console.log("go");
  createCanvas(1000, 1000);
  background("#acafb0ff");

  drawEllipse();
}

function draw() {}

function drawEllipse() {
  ellipse(x, y, w * 1.25, h * 1.25, fill(r * 2, g * 2, b * 2));
  noStroke();

  ellipse(x / 2, y / 2, w, h, fill(r, g, b));
  noStroke();

  ellipse(x * 1.5, y * 1.5, w * 1.5, h * 1.5, fill(r * 4, g * 4, b * 4));
  noStroke();
}
