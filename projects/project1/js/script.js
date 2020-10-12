/**************************************************
Project 1: Simulation
Sharon Ku

3 fishes (nemo, firefish, and goby) swim around the tank. When the fishes spot the finger (user circle), they follow it. The user adds food to the tank by clicking the "Add Food" button and tries to get the fishes to eat the food by guiding them with the finger. When the fishes are full, the simulation ends.
**************************************************/

"use strict"; // because strict is good

let state = `intro`; // other states: animation, end

let changeFirefishImage = undefined;

let timeForFood = false;
let showFood = false;

let numFishfoods = 5;

let fishfoods = [];

// title text
let title = {
  line1: `HUNGRY`,
  line2: `FISHIES`,
  font: undefined,
  fill: 255,
};

// start text
let start = {
  text: `START`,
  font: `Arial`,
  x: 100,
  y: 100,
  size: 25,
  sizeBigger: 30,
  sizeSmaller: 25,
  fill: {
    r: 255,
    g: 255,
    b: 255,
  },
};

// start button
let startButton = {
  size: 130,
  sizeBigger: 150,
  sizeSmaller: 130,
  x: 100,
  y: 100,
  fill: {
    // coral
    r: 254,
    g: 158,
    b: 146,
    // vivid sky blue
    rHover: 10,
    gHover: 205,
    bHover: 255,
    alpha: 200,
  },
};

let foodTracker = {
  x: 117,
  y: 80,
  length: 0,
  totalLength: 156,
  height: 13,
  radius: 15,
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
  foodTracker: {
    img: undefined,
    length: 236,
    height: 74,
    x: 50,
    y: 50,
  },
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
    alpha: 180,
  },
};

let moreFoodButton = {
  img: undefined,
  size: {
    current: 120,
    bigger: 130,
    smaller: 120,
  },
  x: 100,
  y: 100,
  distFromEdge: 100,
}

let bg = {
  fill: { // sky blue
    r: 117,
    g: 184,
    b: 213,
  },
  rocks: {
    img: undefined,
    length: 1247,
    height: 400,
  },
  sand: {
    img: undefined,
    length: 1300,
    height: 247,
  },
};

let fishtank = {
  border: 100,
};

// Preload fish images
function preload() {
  firefish.img1 = loadImage(`assets/images/firefish1.png`);
  firefish.img2 = loadImage(`assets/images/firefish2.png`);
  firefish.foodTracker.img = loadImage(`assets/images/firefishFoodTracker.png`);

  moreFoodButton.img = loadImage(`assets/images/moreFood.png`);
  bg.rocks.img = loadImage(`assets/images/rocks.png`);
  bg.sand.img = loadImage(`assets/images/sand.png`);
  title.font = loadFont(`assets/fonts/Slackey-Regular.ttf`);
}

// setup()
//
// Set up canvas and remove cursor
function setup() {
  createCanvas(1300, 800);
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
  push();
  imageMode(CENTER);
  image(bg.sand.img, width/2, height - bg.sand.height/2, bg.sand.length, bg.sand.height);
  image(bg.rocks.img, width/2, height*2/3, bg.rocks.length, bg.rocks.height);
  pop();

  if (state === `intro`) {
    intro();
  }

  if (state === `animation`) {
    animation();
  }

  // loopFirefishImages = setInterval(switchFireFishImage(), 2000);

}

// let test;
//
// function switchFirefishImage() {
//   test = setTimeout(displayFirefish({img: firefish.img1, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width}), 1000);
// }

function intro() {
  displayTitle(); // display "Hungry Fishies"
  displayStartButton(); // Drawing the start button
  displayStart(); // Drawing the start text
  hoverOnStartButton(); // Start button and Start text enlarge if mouse's position is on start button

  displayFinger(); // display user circle

  displayFirefish({img: firefish.img1, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width});

  firefishCasualSwimming({tx:firefish.tx, ty:firefish.ty, txChange:firefish.txChange, tyChange:firefish.tyChange, speedCasualSwimming:firefish.speed.casualSwimming});
}


// Display title "Hungry Fishies"
function displayTitle() {
  push();
  fill(title.fill);
  textSize(height/8);
  textAlign(CENTER,CENTER);

  textFont(title.font);
  text(title.line1, width/2, height/5);
  text(title.line2, width/2, height/3);
  pop();
}

// Display More Food Button
function displayMoreFoodButton() {
  push();
  imageMode(CENTER);
  moreFoodButton.x = width - moreFoodButton.distFromEdge;
  moreFoodButton.y = moreFoodButton.distFromEdge;
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

  displayFoodTracker();
  updateFoodTracker();

  displayFirefish({img: firefish.img1, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width});

  displayFinger();


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
  // display food tracker image
  image(firefish.foodTracker.img, firefish.foodTracker.x, firefish.foodTracker.y, firefish.foodTracker.length, firefish.foodTracker.height);
  // display bar that updates when fish eats food
  fill(foodTracker.fillR, foodTracker.fillG, foodTracker.fillB);
  rect(foodTracker.x, foodTracker.y, foodTracker.length, foodTracker.height, foodTracker.radius);
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
