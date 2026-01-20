"use strict";

// size multiple of 5
const cell = 100;

const CANVAS_W = 1200;
const CANVAS_H = 1400;

let gridColor; // same random color for all
let evenRowsAreCircles = true; //even rows circles, odd rows squares

function setup() {
  createCanvas(CANVAS_W, CANVAS_H);
  noStroke();
  randomColour(); //press space
}

function draw() {
  background(20);
  fill(gridColor.r, gridColor.g, gridColor.b);

  const cols = floor(width / cell);
  const rows = floor(height / cell);

  let row = 0;
  for (row = 0; row < rows; row += 1) {
    let col = 0;
    for (col = 0; col < cols; col += 1) {
      const x = col * cell + cell / 2;
      const y = row * cell + cell / 2;

      //even/odd rows swap shape
      const isEvenRow = row % 2 === 0;
      const drawCircle = evenRowsAreCircles ? isEvenRow : !isEvenRow;

      if (drawCircle) {
        ellipse(x, y, cell, cell);
      } else {
        rectMode(CENTER);
        rect(x, y, cell, cell);
      }
    }
  }
}

function randomColour() {
  gridColor = {
    r: floor(random(0, 256)),
    g: floor(random(0, 256)),
    b: floor(random(0, 256)),
  };
}

function keyPressed() {
  // space changes color
  if (key === " ") {
    randomColour();
  }
}

function mousePressed() {
  // swap rows on mouse press
  evenRowsAreCircles = !evenRowsAreCircles;
}
