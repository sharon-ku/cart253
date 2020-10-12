/**************************************************
Project 1: Simulation
Sharon Ku

3 fishes (nemo, firefish, and goby) swim around the tank. When the fishes spot the finger (user circle), they follow it. The user adds food to the tank by clicking the "Add Food" button and tries to get the fishes to eat the food by guiding them with the finger. When the fishes are full, the simulation ends.
**************************************************/

"use strict"; // because strict is good

let state = `animation`; // other states: animation, end

let changeFirefishImage = undefined;

let timeForFood = false;
let showFood = false;

let numFishfoods = 5;

let fishfoods = [];

// title text
let title = {
  line1: `Hungry`,
  line2: `Fishies`,
  font: undefined,
  fill: 255,
};

let foodTracker = {
  x: 40,
  y: 220,
  length: 0,
  totalLength: 180,
  height: 15,
  fillR: 219, // lime green
  fillG: 220,
  fillB: 100,
}

let firefish = {
  img1: undefined,
  img2: undefined,
  x: 500,
  y: 200,
  length: 160,
  width: 66,
  vx: 0,
  vy: 0,
  speed: {
    casualSwimming: 5,
    followingMouse: 1.5,
  },
  tx: 0,
  ty: 10,
  txChange: 0.025,
  tyChange: 0.025,
  fieldOfVision: 300,
  scale: {
    x: 1,
    y: 1,
  },
  angle: 0,
  finalAngle: 90,
  numFoodEaten: 0,
};

// User circle
let finger = {
  size: 40,
  x: 100,
  y: 100,
  fill: { // light cyan
    r: 220,
    g: 255,
    b: 250,
    alpha: 200,
  },
};

let moreFoodButton = {
  img: undefined,
  size: {
    current: 150,
    bigger: 160,
    smaller: 150,
  },
  x: 100,
  y: 100,
}

let bg = {
  fill: { // sky blue
    r: 117,
    g: 184,
    b: 213,
  },
};

let fishtank = {
  border: 200,
};

// Preload fish images
function preload() {
  firefish.img1 = loadImage(`assets/images/firefish1.png`);
  firefish.img2 = loadImage(`assets/images/firefish2.png`);
  moreFoodButton.img = loadImage(`assets/images/moreFood.png`);
  title.font = loadFont(`assets/fonts/Slackey-Regular.ttf`);
}

// setup()
//
// Set up canvas and remove cursor
function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  noStroke();

  for (let i = 0; i < numFishfoods; i++) {
    fishfoods[i] = new Fishfood();
  }

}

// draw()
//
// Set up background color and states
function draw() {
  background(bg.fill.r, bg.fill.g, bg.fill.b);

  if (state === `intro`) {
    intro();
  }

  if (state === `animation`) {
    animation();
  }

  // loopFirefishImages = setInterval(switchFireFishImage(), 2000);

}

class Fishfood {
  constructor() {
    this.x = random(fishtank.border, width - fishtank.border);
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.speed = 1.5; //0.5
    this.ax = 0;
    this.ay = 0;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.accelerationMax = 3;
    this.size = 15;
    this.fillR = 255;  // beige
    this.fillG = 221;
    this.fillB = 185;
    this.fillAlpha = 255;
  }

  show() {
    push();
    fill(this.fillR, this.fillG, this.fillB, this.fillAlpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  move() {
    this.x = constrain(this.x, fishtank.border, width - fishtank.border);

    this.ax = this.accelerationX;
    this.ay = this.accelerationY;

    this.accelerationX = constrain(this.accelerationX, -this.accelerationMax, this.accelerationMax);

    let chance = random();

    if (chance < 0.05) {
    this.vx = random(-this.speed,this.speed);
    }
    this.vy = this.speed;

    this.x += this.vx + this.ax;
    this.y += this.vy + this.ay;

    // Change current
    if (keyIsDown(LEFT_ARROW)) {
      this.accelerationX -= 0.05;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.accelerationX += 0.05;
    }

    // test if food returns to top once it reaches the bottom
    // if (this.y > height) {
    //   this.y = 0;
    // }
  }

  // checks if food is off screen
  offScreen() {
    if (this.y > height) {
      return true;
    }
    else {
      return false;
    }
  }

  // checks if food has been eaten by fish
  foodEaten() {
    let distToFishMouth;
    let fishMouthLocation;

    if (firefish.scale.x > 0) {
      fishMouthLocation = firefish.x - (firefish.length/3);
    }
    else if (firefish.scale.x < 0) {
      fishMouthLocation = firefish.x + (firefish.length/3);
    }

    distToFishMouth = dist(this.x, this.y, fishMouthLocation, firefish.y);

    if (distToFishMouth < firefish.length/6) {
      return true;
    }
    else {
      return false;
    }
  }
}

// let test;
//
// function switchFirefishImage() {
//   test = setTimeout(displayFirefish({img: firefish.img1, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width}), 1000);
// }

function intro() {
  displayTitle(); // display "Hungry Fishies"
  displayFinger(); // display user circle

  displayFirefish({img: firefish.img1, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width});

  firefishCasualSwimming({tx:firefish.tx, ty:firefish.ty, txChange:firefish.txChange, tyChange:firefish.tyChange, speedCasualSwimming:firefish.speed.casualSwimming});
}


// Display title "Hungry Fishies"
function displayTitle() {
  push();
  fill(title.fill);
  textSize(height/15);
  textAlign(CENTER,CENTER);

  textFont(title.font);
  text(title.line1, width/3, height/3);
  text(title.line2, width/2, height/2);
  pop();
}

// Display More Food Button
function displayMoreFoodButton() {
  push();
  imageMode(CENTER);
  image(moreFoodButton.img, moreFoodButton.x, moreFoodButton.y, moreFoodButton.size.current, moreFoodButton.size.current);
  pop();
}

// Checks if finger is hovering on More Food Button
function fingerIsOnMoreFoodButton() {
  if (finger.x < moreFoodButton.x+(moreFoodButton.size.current/2) && finger.x > moreFoodButton.x-(moreFoodButton.size.current/2)) {
    if (finger.y < moreFoodButton.y+(moreFoodButton.size.current/2) && finger.y > moreFoodButton.y-(moreFoodButton.size.current/2)) {
      return true;
    }
  }
  else{
    return false;
  }
}

// More Food Button enlarges if finger hovers over it
function hoverOnMoreFoodButton() {
  if (fingerIsOnMoreFoodButton()) {
    moreFoodButton.size.current = moreFoodButton.size.bigger;
  }
  else {
    // More food button keeps its initial size
    moreFoodButton.size.current = moreFoodButton.size.smaller;
  }

}

function clickMoreFoodButton(){
  if (mouseIsPressed && fingerIsOnMoreFoodButton()) {
    timeForFood = true;
  }

  if (timeForFood) {
    showFood = true;
    timeForFood = false;
  }


  // console.log(fishfoods.length);

  if (showFood) {
    for (let i = fishfoods.length-1; i >= 0; i--) {
      fishfoods[i].move();
      fishfoods[i].show();

      if (fishfoods[i].foodEaten()) {
        firefish.numFoodEaten ++;
      }
      
      if (fishfoods[i].foodEaten() || fishfoods[i].offScreen()) {
        fishfoods.splice(i,1);
      }

      // if fishfood is off screen, than it will be removed from the array
      // if (fishfoods[i].offScreen()) {
      //   fishfoods.splice(i,1);
      // }


    }
  }
}

function mousePressed() {
  if (timeForFood === true) {
      // generateRandomFoodPosition = true;
  }
}

// Animation state: finger and firefish are displayed. Finger moves with mouse. Firefish moves randomly (Perlin noise) until it spots the finger and follows it.
function animation() {

  displayMoreFoodButton();
  hoverOnMoreFoodButton();
  clickMoreFoodButton();

  displayFirefish({img: firefish.img1, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width});

  displayFinger();

  displayFoodTracker();
  updateFoodTracker();
  console.log(firefish.numFoodEaten);

  // Constraining firefish's movement
  firefish.x = constrain(firefish.x, fishtank.border, width - fishtank.border);
  firefish.y = constrain(firefish.y, fishtank.border, height - fishtank.border);

  // Firefish follows finger if the fish senses the finger, or else it swims casually around the tank.
  if (firefishSensesFinger()) {
    fishFollowsFinger({x: firefish.x, y: firefish.y, vx: firefish.vx, vy: firefish.vy, speed: firefish.speed.followingMouse});
  }
  else {
    firefishCasualSwimming({speedCasualSwimming:firefish.speed.casualSwimming});
  }
}


function displayFoodTracker(){
  push();
  fill(foodTracker.fillR, foodTracker.fillG, foodTracker.fillB);
  rect(foodTracker.x, foodTracker.y, foodTracker.length, foodTracker.height);
  pop();
}

function updateFoodTracker(){
  foodTracker.length = map(firefish.numFoodEaten, 0, numFishfoods, 0, foodTracker.totalLength);
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

// Returns true if finger is within the fish's field of vision
function firefishSensesFinger(){
  if (dist(firefish.x, firefish.y, mouseX, mouseY) < firefish.fieldOfVision) {
    return true;
  }
  else {
    return false;
  }
}

// Firefish swims randomly using Perlin noise
function firefishCasualSwimming({vx, vy, speedCasualSwimming}) {
  firefish.tx += firefish.txChange;
  firefish.ty += firefish.tyChange;

  let noiseX = noise(firefish.tx);
  let noiseY = noise(firefish.ty);

  let chanceOfChangingDirections = random();

  if (chanceOfChangingDirections < 0.05) { //0.02
  firefish.vx = map(noiseX, 0, 1, -speedCasualSwimming, speedCasualSwimming);
  firefish.vy = map(noiseY, 0, 1, -speedCasualSwimming, speedCasualSwimming);
  }

  firefish.x += firefish.vx;
  firefish.y += firefish.vy;

  firefish.x = constrain(firefish.x, fishtank.border, width - fishtank.border);
  firefish.y = constrain(firefish.y, fishtank.border, height - fishtank.border);
}

// Display firefish
function displayFirefish({img, x, y, length, width}) {
  push();
  translate(x,y);
  imageMode(CENTER);
  // setFishAngle(); //Fish swims at an angle

  scale(firefish.scale.x, firefish.scale.y);
  setFishDirection({x: firefish.x, y: firefish.y, vx: firefish.vx}); // Fish faces the direction it is swimming
  image(img, 0, 0, length, width);
  pop();
}

// Firefish's angle changes depending on the direction it is going
function setFishAngle() {
  push();
  translate(firefish.x,firefish.y);
  rotate(firefish.angle);
  firefish.finalAngle = atan(firefish.vx,firefish.vy) / 4;

  if (firefish.angle < firefish.finalAngle) {
    firefish.angle += 0.001; //0.0005
  }
  else {
    firefish.angle -= 0.001; //0.0005
  }
  pop();
}



// Fish faces direction it is swimming
function setFishDirection({x,y,vx}) {
  push();
  translate(x,y);
  if (vx > 0) {
    firefish.scale.x = -1; // face right
  }
  else {
    firefish.scale.x = 1; // face left
  }
  pop();
}
