/**************************************************
Project 1: Simulation
Sharon Ku

3 fishes (nemo, firefish, and goby) swim around the tank. When the fishes spot the finger (user circle), they follow it. The user adds food to the tank by clicking the "Add Food" button and tries to get the fishes to eat the food by guiding them with the finger. When the fishes are full, the simulation ends.
**************************************************/

"use strict"; // because strict is good

let state = `intro`; // other states: animation, end

let firefish = {
  x: 500,
  y: 200,
  length: 160,
  width: 66,
  vx: 0,
  vy: 0,
  speed: {
    casualSwimming: 5,
    followingMouse: 0.8,
  },
  tx: 0,
  ty: 10,
  txChange: 0.025,
  tyChange: 0.025,
  img: undefined,
  fieldOfVision: 300,
  scale: {
    x: 1,
    y: 1,
  },
  angle: 0,
  finalAngle: 90,
};

// User circle
let finger = {
  size: 40,
  x: 100,
  y: 100,
  fill: { //light cyan
    r: 220,
    g: 255,
    b: 250,
    alpha: 200,
  },
};

let bg = {
  fill: {
    r: 0,
    g: 0,
    b: 0,
  },
};

let fishtank = {
  border: 200,
};

// Preload fish images
function preload() {
  firefish.img = loadImage(`assets/images/firefish1.png`);
}


// setup()
//
// Set up canvas and remove cursor
function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
}

// draw()
//
// Set up background color and states
function draw() {
  background(bg.fill.r, bg.fill.g, bg.fill.b);

  if (state === `intro`) {
    intro();
  }
}

// Intro state: finger and firefish are displayed. Finger moves with mouse. Firefish moves randomly (Perlin noise) until it spots the finger and follows it.
function intro() {
  displayFinger();

  displayFirefish({img: firefish.img, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width})

  // Constraining firefish's movement
  firefish.x = constrain(firefish.x, fishtank.border, width - fishtank.border);
  firefish.y = constrain(firefish.y, fishtank.border, height - fishtank.border);

  // Firefish follows finger if the fish senses the finger, or else it swims casually around the tank.
  if (firefishSensesFinger()) {
    fishFollowsFinger({x: firefish.x, y: firefish.y, vx: firefish.vx, vy: firefish.vy, speed: firefish.speed.followingMouse});
  }
  else {
    firefishCasualSwimming();
  }


}


// Finger is a circle that follows cursor.
function displayFinger() {
  finger.x = mouseX;
  finger.y = mouseY;

  push();
  fill(finger.fill.r, finger.fill.g, finger.fill.b, finger.fill.alpha);
  ellipse(finger.x, finger.y, finger.size);
  pop();
}

// The fish follows the finger
function fishFollowsFinger({x, y, vx, vy, speed}) {
  let distX;
  let distY = firefish.y - mouseY;

  if (firefish.x < mouseX) {
    // distX = firefish.x - mouseX + firefish.length/2;
    distX = firefish.x - mouseX;
  }
  else {
    // distX = firefish.x - mouseX - firefish.length/2;
    distX = firefish.x - mouseX;
  }

  // push();
  // translate(firefish.x,firefish.y);
  // setFishAngle();
  // pop();


  if (distX < 0) {
    vx = speed;
  }
  else {
    vx = -speed;
  }

  if (distY < 0) {
    vy = speed;
  }
  else if (distY > 0) {
    vy = -speed;
  }

  if (vx > 0) {
    firefish.scale.x = -1;
  }
  else {
    firefish.scale.x = 1;
  }

  firefish.x += vx;
  firefish.y += vy;
}

// Returns true if finger is close enough to the fish (within the fish's field of vision)
function firefishSensesFinger(){
  if (dist(firefish.x, firefish.y, mouseX, mouseY) < firefish.fieldOfVision) {
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

  let change = random();

  if (change < 0.02) {
  firefish.vx = map(noiseX, 0, 1, -firefish.speed.casualSwimming, firefish.speed.casualSwimming);
  firefish.vy = map(noiseY, 0, 1, -firefish.speed.casualSwimming, firefish.speed.casualSwimming);
  }

  firefish.x += firefish.vx;
  firefish.y += firefish.vy;

  firefish.x = constrain(firefish.x, fishtank.border, width - fishtank.border);
  firefish.y = constrain(firefish.y, fishtank.border, height - fishtank.border);
}

// Display firefish
function displayFirefish({img, x, y, length, width}) {
  push();
  imageMode(CENTER);

  translate(x,y);

  setFishAngle();

  scale(firefish.scale.x, firefish.scale.y);
  setFishDirection(firefish.x,firefish.y); // Fish faces direction it is swimming
  image(img, 0, 0, length, width);
  pop();
}

function setFishAngle() {
  rotate(firefish.angle);
  firefish.finalAngle = atan(firefish.vx,firefish.vy) / 3;

  if (firefish.angle < firefish.finalAngle) {
    firefish.angle += 0.0005;
  }
  else {
    firefish.angle -= 0.0005;
  }
  console.log(firefish.angle);
}

// Fish faces direction it is swimming
function setFishDirection(x,y) {
  push();
  translate(x,y);
  if (firefish.vx > 0) {
    firefish.scale.x = -1;
  }
  else {
    firefish.scale.x = 1;
  }
  pop();
}
