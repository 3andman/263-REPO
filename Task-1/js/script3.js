"use strict";

let canvasW = 1200;
let canvasH = 1200;

let w = 1200 / 3;
let h = 1200;

let rect1x = 0;
let rect1y = 0;
let rect1c = 0;

let rect2x = 400;
let rect2y = 0;
let rect2c = 127;

let rect3x = 800;
let rect3y = 0;
let rect3c = 255;

function setup() {
  createCanvas(canvasW, canvasH);
}

function drawRect1() {
  rect(rect1x, rect1y, w, h);
  fill(rect1c);
}

function drawRect2() {
  rect(rect2x, rect2y, w, h);
  fill(rect2c);
}

function drawRect3() {
  rect(rect3x, rect3y, w, h);
  fill(rect3c);
}

function draw() {
  background("#acafb0ff");
  fill(50);
  noStroke();

  drawRect1();
  drawRect2();
  drawRect3();

  if (mouseX <= canvasW / 2) {
  }
}
