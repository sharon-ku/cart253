/**************************************************
Project 1: Simulation
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

"use strict";

let firefish = {
  x: 200,
  y: 500,
  length: 160,
  width: 66,
  vx: 0,
  vy: 0,
  speed: {
    casualSwimming: 3,
    followingMouse: 0.8,
  },
  tx: 0,
  ty: 10,
  txChange: 0.025,
  tyChange: 0.025,
  img: undefined,
  visibleRange: 300,
  scale: {
    x: 1,
    y: 1,
  },
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

  // display firefish
  displayFirefish({img: firefish.img, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width})

  if (firefishSensesFinger()) {

    // bg.fill.r = 20;
    // bg.fill.g = 20;
    // translate(firefish.x, firefish.y);
    // firefish.width *= -1;

    fishFollowsFinger({x: firefish.x, y: firefish.y, vx: firefish.vx, vy: firefish.vy, speed: firefish.speed.followingMouse});

  }
  else {
    firefishCasualSwimming();
  }

  // if (firefish.x < mouseX) {
  //   firefish.width *= -1;
  // }
}


function fishFollowsFinger({x, y, vx, vy, speed}){
  push();
  let distX = firefish.x - mouseX;
  let distY = firefish.y - mouseY;

  if (distX < 0) {
    vx = speed;
  }
  else if (distX > 0) {
    vx = -speed;
  }

  if (distY < 0) {
    vy = speed;
  }
  else if (distY > 0) {
    vy = -speed;
  }

  firefish.x += vx;
  firefish.y += vy;

  pop();
}

function firefishSensesFinger(){
  if (dist(firefish.x, firefish.y, mouseX, mouseY) < firefish.visibleRange) {
    return true;
  }
  else {
    return false;
  }
}

// Firefish swims randomly using Perlin noise
function firefishCasualSwimming(){
  firefish.tx += firefish.txChange;
  firefish.ty += firefish.tyChange;

  let noiseX = noise(firefish.tx);
  let noiseY = noise(firefish.ty);

  firefish.vx = map(noiseX, 0, 1, -firefish.speed.casualSwimming, firefish.speed.casualSwimming);
  firefish.vy = map(noiseY, 0, 1, -firefish.speed.casualSwimming, firefish.speed.casualSwimming);

  firefish.x += firefish.vx;
  firefish.y += firefish.vy;

  firefish.x = constrain(firefish.x, 0, width);
  firefish.y = constrain(firefish.y, 0, height);
}

// Display firefish
function displayFirefish({img, x, y, length, width}) {
  push();
  imageMode(CENTER);
  // translate(firefish.x, firefish.y);
  // scale(firefish.scale.x, firefish.scale.y);
  image(img, x, y, length, width);
  pop();

}
