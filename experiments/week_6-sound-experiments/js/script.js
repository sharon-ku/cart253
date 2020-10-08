/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

"use strict";

let barkSFX;

let circle = {
  x:0,
  y:0,
  size:100,
}

function preload(){
  barkSFX = loadSound(`assets/sounds/bark.wav`);
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500,500);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  fill(255);
  circle.x = mouseX;
  circle.y = mouseY;

  ellipse(circle.x,circle.y,circle.size);

}

function mousePressed(){
  tryMusic();
}

function keyPressed() {
  tryMusic();
}


function tryMusic() {
  if (!barkSFX.isPlaying()) {
    barkSFX.loop();
  }
}
