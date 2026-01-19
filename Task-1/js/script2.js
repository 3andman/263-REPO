"use strict";

let w = 100;
let h = 140;

let rect1x = 200;
let rect1y = 200;
let rect2x = 400;
let rect2y = 400;
let rect3x = 600;
let rect3y = 600;

function setup() {
  createCanvas(1000, 1000);
}

function drawRect1() {
  rect(rect1x, rect1y, w, h);
}

function drawRect2() {
  rect(rect2x, rect2y, w, h);
}

function drawRect3() {
  rect(rect3x, rect3y, w, h);
}

function draw() {
  background("#acafb0ff");
  fill(50);
  noStroke();

  drawRect1();
  drawRect2();
  drawRect3();

  rect3x = rect3x + 10;
  if (rect3x >= 1000) {
    rect3x = 0;
  }
}

function mousePressed() {
  rect1x = mouseX - 40;
  rect1y = mouseY - 50;
}
function keyPressed() {
  rect2x = random(100, 900);
  rect2y = random(100, 900);
}
