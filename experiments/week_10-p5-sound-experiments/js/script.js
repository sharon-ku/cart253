/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
"use strict";

let mic;

let ghost = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  image: undefined
};

function preload() {
  ghost.image = loadImage(`assets/images/clown.png`);
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600,600);

  ghost.x = width/2;
  ghost.y = height/2;

  mic = new p5.AudioIn();
  mic.start();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);


  // trembling
  ghost.x += random(-1,1);
  ghost.y += random(-1,1);


  // get volume into microphone
  let level = mic.getLevel();

  // check if the ghost is scared
  if (level>0.6) {
    // exit stage right!
    ghost.vx = 20;
  }

  // move the ghost
  ghost.x += ghost.vx;
  ghost.y += ghost.vy;

  // display ghost
  push();
  imageMode(CENTER);
  tint(255,50);
  image(ghost.image, ghost.x, ghost.y);
  pop();

}
