/**************************************************
Project 1: Simulation
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

"use strict";

let firefish = {
  x: 500,
  y: 250,
  length: 160,
  width: 66,
  vx: 0,
  vy: 0,
  speed: 3,
  tx: 0,
  ty: 10,
  txChange: 0.025,
  tyChange: 0.025,
  img: undefined,
};

let bg = {
  fill: {
    r: 0,
    g: 0,
    b: 0,
  },
};


function preload() {
  firefish.img = loadImage(`assets/images/firefish1.png`);
}


// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1920,1000);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bg.fill.r, bg.fill.g, bg.fill.b);

  firefishCasualSwimming();
  displayFirefish();
}

// Firefish swims randomly using Perlin noise
function firefishCasualSwimming(){
  firefish.tx += firefish.txChange;
  firefish.ty += firefish.tyChange;

  let noiseX = noise(firefish.tx);
  let noiseY = noise(firefish.ty);

  firefish.vx = map(noiseX, 0, 1, -firefish.speed, firefish.speed);
  firefish.vy = map(noiseY, 0, 1, -firefish.speed, firefish.speed);

  firefish.x += firefish.vx;
  firefish.y += firefish.vy;

  firefish.x = constrain(firefish.x, 0, width);
  firefish.y = constrain(firefish.y, 0, height);
}

function displayFirefish() {
  imageMode(CENTER);
  image(firefish.img, firefish.x, firefish.y,firefish.length, firefish.width);
}
