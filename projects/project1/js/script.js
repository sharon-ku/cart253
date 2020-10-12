/**************************************************
Project 1: Simulation
Sharon Ku

3 fishes (nemo, firefish, and goby) swim around the tank. When the fishes spot the finger (user circle), they follow it. The user adds food to the tank by clicking the "Add Food" button and tries to get the fishes to eat the food by guiding them with the finger. When the fishes are full, the simulation ends.
**************************************************/

"use strict"; // because strict is good

let state = `animation`; // other states: animation, ending

let changeFirefishImage = undefined;

let timeForFood = true;
let showFood = false;

let fishfoods = [];
let numFishfoods = 5;
let totalFood = 10;

let timer;

let bodyTextFont = undefined;

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
  x: 100,
  y: 100,
  size: 30,
  sizeBigger: 40,
  sizeSmaller: 30,
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
    // // coral
    // r: 254,
    // g: 158,
    // b: 146,

    // vivid sky blue
    r: 10,
    g: 205,
    b: 255,
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
  // lime green
  fillR: 219,
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
  tint: {
    gray: 255,
    alpha: 255,
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

let nightFilter = {
  x: 0,
  y: 0,
  length: 100,
  height: 100,
  fill: { // dark blue
    r: 33,
    g: 63,
    b: 104,
    alpha: 0,
    alphaChangeRate: 1,
    finalAlpha: 130,
  },
}

let fishtank = {
  border: 100,
};


// setup() -----------------------------------------------------------------------
//
// Preload all images and fonts
function preload() {
  firefish.img1 = loadImage(`assets/images/firefish1.png`);
  firefish.img2 = loadImage(`assets/images/firefish2.png`);
  firefish.foodTracker.img = loadImage(`assets/images/firefishFoodTracker.png`);

  moreFoodButton.img = loadImage(`assets/images/moreFood.png`);
  bg.rocks.img = loadImage(`assets/images/rocks.png`);
  bg.sand.img = loadImage(`assets/images/sand.png`);

  title.font = loadFont(`assets/fonts/Slackey-Regular.ttf`);
  bodyTextFont = loadFont(`assets/fonts/CabinSketch-Regular.ttf`);
}

// setup() -----------------------------------------------------------------------
//
// Set up canvas, remove cursor, create arrays for fishfoods and poemLines
function setup() {
  createCanvas(1300, 800);
  noCursor();
  noStroke();

  // Create array for fishfoods (for animation state)
  for (let i = 0; i < numFishfoods; i++) {
    fishfoods[i] = new Fishfood();
  }

  // Create array for poemLines (for end state)
  for (let i = 0; i < numPoemLines; i++) {
    poemLines[i] = new PoemLine(line[i], width/2, i*spaceBetweenEachLine + yLocationOfFirstLine);
  }
}



// draw() -----------------------------------------------------------------------
//
// Set up background color, background rocks and sand, and states
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

  if (state === `ending`) {
    ending();
  }

  // loopFirefishImages = setInterval(switchFireFishImages(), 2000);

}

let fishImg1Displayed = true;

// let test;
//
function switchFirefishImages() {
  // if (fishImg1Displayed) {
    setTimeout(displayFirefish({img: firefish.img2, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width}), 2000);
  //   fishImg1Displayed = false;
  // }
  // else {
  //   setTimeout(displayFirefish({img: firefish.img1, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width}), 2000);
  //   fishImg1Displayed = true;
  // }
}

// intro() -----------------------------------------------------------------------
//
// Display title, start button, finger, and fishes
function intro() {
  displayTitle(); // display "Hungry Fishies"
  displayStartButton(); // Drawing the start button
  displayStart(); // Drawing the start text
  hoverOnStartButton(); // Start button and Start text enlarge if mouse's position is on start button

  displayFinger(); // display user circle

  displayFirefish({img: firefish.img1, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width});
  //beautiful

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


//
// function mousePressed() {
//   if (timeForFood === true) {
//       // generateRandomFoodPosition = true;
//   }
// }


// animation() -----------------------------------------------------------------------
//
// Animation state: finger and firefish are displayed. Finger moves with mouse. Firefish moves randomly (Perlin noise) until it spots the finger and follows it.
function animation() {

  displayMoreFoodButton();
  hoverOnMoreFoodButton();
  clickMoreFoodButton();
  resetMoreFoodButton();

  displayFoodTracker();
  updateFoodTracker();

  // displayFirefish({img: firefish.img1, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width});
  // beautiful
  switchFirefishImages();

  displayFinger();


  console.log(firefish.numFoodEaten);

  // Constraining firefish's movement
  fishStaysInTank({x:firefish.x, y:firefish.y});

  // Firefish follows finger if the fish senses the finger, or else it swims casually around the tank.
  if (fishSensesFinger({x:firefish.x, y:firefish.y, fieldOfVision:firefish.fieldOfVision})) {
    fishFollowsFinger({x: firefish.x, y: firefish.y, vx: firefish.vx, vy: firefish.vy, speed: firefish.speed.followingMouse});
  }
  else {
    firefishCasualSwimming({speedCasualSwimming:firefish.speed.casualSwimming});
  }

  if (firefish.numFoodEaten === totalFood) {
    state = `ending`;
  }
}

// ending() -----------------------------------------------------------------------
//
// Display end poem and finger
function ending() {
  displayNightFilter();
  displayFinger();
  displayEndPoem();
}

// Displays filter that plunges tank into darkness
function displayNightFilter() {
  nightFilter.length = width;
  nightFilter.height = height;

  push();
  rectMode(CORNER);
  // Filter goes from transparent to more opaque
  nightFilter.fill.alpha += nightFilter.fill.alphaChangeRate;
  nightFilter.fill.alpha = constrain(nightFilter.fill.alpha, 0, nightFilter.fill.finalAlpha);

  fill(nightFilter.fill.r, nightFilter.fill.g, nightFilter.fill.b, nightFilter.fill.alpha);
  rect(nightFilter.x, nightFilter.y, nightFilter.length, nightFilter.height);
  pop();
}

function displayFoodTracker() {
  push();
  // display food tracker image
  image(firefish.foodTracker.img, firefish.foodTracker.x, firefish.foodTracker.y, firefish.foodTracker.length, firefish.foodTracker.height);

  // display bar that updates when fish eats food
  fill(foodTracker.fillR, foodTracker.fillG, foodTracker.fillB);
  rect(foodTracker.x, foodTracker.y, foodTracker.length, foodTracker.height, foodTracker.radius);
  pop();
}

function updateFoodTracker(){
  foodTracker.length = map(firefish.numFoodEaten, 0, totalFood, 0, foodTracker.totalLength);
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

// Constraining firefish's movement
function fishStaysInTank({x,y}) {
  x = constrain(x, fishtank.border, width - fishtank.border);
  y = constrain(y, fishtank.border, height - fishtank.border);
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
function fishSensesFinger({x, y, fieldOfVision}){
  if (dist(x, y, mouseX, mouseY) < fieldOfVision) {
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


/**
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
**/
