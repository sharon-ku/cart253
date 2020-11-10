/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
"use strict";

let barkSFX;

function preload() {
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600,600);
  userStartAudio();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);


  let newRate = map(mouseX, 0, width, -3, 3);
  barkSFX.rate(newRate);

}

function mousePressed() {

    barkSFX.loop();
}
