/**************************************************
Project 2: Hungry Fishies
Sharon Ku

-Intro state & Instructions state:
The title "Hungry Fishy" is displayed with a firefish swimming around the tank. Once the user clicks the "Start" button, the instructions are shown (instructions state). When the user clicks "Ready!", the animation state starts.
-Animation state:
When the finger/user circle is close enough to the fish for it to notice it (within the fish's field of vision), the fish follows it. The user adds food to the tank by clicking the "More Food" button and tries to get the fish to eat the food by guiding it with the finger. The user can change the current direction by using the left and right arrow keys. When the fish is full, the simulation ends (cue ending state).
-Ending state:
A poem is featured as the tank plunges into darkness and the fish releases a little surprise from its behind.

Background music from Mixkit.co: Smooth Like Jazz by Ajhay Stelino
**************************************************/

"use strict"; // because strict is good

// State of program
let state = `intro`; // other states: instructions, animation, ending

// Background music
let backgroundMusic = undefined;

// Variables related to fishfood
let fishfoods = []; // fishfoods array that contains food objects
let numFishfoods = 5; // number of fish food in the tank at once
let totalFood = 15; // total amount of food that fish needs to consume

let timeForFood = true; // when no more food in tank, it is time for food
let showFood = false;  // when user clicks More Food button, show food

// Font that will be used for body text
let bodyTextFont = undefined;

// Title text
let title = {
  line1: `HUNGRY`,
  line2: `FISHY`,
  font: undefined,
  fill: 255,
};

// Start text
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

// Start button
let startButton = {
  size: 130,
  sizeBigger: 150,
  sizeSmaller: 130,
  x: 100,
  y: 100,
  fill: {
    // vivid sky blue
    r: 10,
    g: 205,
    b: 255,
    rHover: 10,
    gHover: 205,
    bHover: 255,
    alpha: 200,
  },
};

// Food tracker
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
};

// Firefish
let firefish = {
  img1: undefined,
  img2: undefined,
  currentImage: undefined,
  framesElapsed: 0,
  framesBtwEachImage: 50,
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
  buffer: 10,
  tx: 0,
  ty: 10,
  txChange: 0.025,
  tyChange: 0.025,
  fieldOfVision: 350,
  scale: {
    x: 1,
    y: 1,
  },
  numFoodEaten: 0,
  foodTracker: {
    img: undefined,
    length: 236,
    height: 74,
    x: 50,
    y: 50,
  },
  // cloaca means orifice from which fish releases the poop
  cloacaX: 0,
  cloacaY: 0,
  vertDistBtwFishAndCloaca: 10,
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

// More Food button
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
};

// Background color and elements (rocks and sand)
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

// Fishtank
let fishtank = {
  border: 100,
};

// Rules image
let rules = {
  img: undefined,
  length: 782,
  height: 569,
  x: 200,
  y: 200,
};

// Rules rectangle
let rulesRect = {
  x: 500,
  y: 500,
  distToEdge: 50,
  length: 1300,
  height: 800,
  cornerRadius: 50,
  fill: {
    r: 4,
    g: 81,
    b: 101,
    alpha: 220,
  },
};

// Ready text that is displayed on button
let ready = {
  text: `READY!`,
  x: 1150,
  y: 640,
  size: 40,
  sizeBigger: 50,
  sizeSmaller: 40,
  fill: {
    r: 255,
    g: 255,
    b: 255,
  },
};

// "Ready" button
let readyButton = {
  size: 170,
  sizeBigger: 200,
  sizeSmaller: 170,
  x: 700,
  y: 100,
  fill: {
    // coral
    r: 254,
    g: 158,
    b: 146,
    rHover: 254,
    gHover: 158,
    bHover: 146,
    alpha: 220,
  },
};

// Variables pertaining to end poem
let poemLines = [];
let numPoemLines = 4;
let yLocationOfFirstLine = 210;
let spaceBetweenEachLine = 40;

let line = [`Little Firefishy is now well fed,`, `Watch it go, off to bed...`, `It suddenly feels something moving in its belly,`, `Looks like it gave birth to adorable food babies!`];

// Nighttime shade rectangle
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
};

// Array containing poop pebbles
let poops = [];

// Total number of poop that the fish can release in a single swimming
let poop = {
  totalNumOfPoop: 50,
};

// setup() -----------------------------------------------------------------------
//
// Preload all images, music, and fonts
function preload() {
  // Load firefish images
  firefish.img1 = loadImage(`assets/images/firefish1.png`);
  firefish.img2 = loadImage(`assets/images/firefish2.png`);

  // Load food tracker image
  firefish.foodTracker.img = loadImage(`assets/images/firefishFoodTracker.png`);

  // Load rules image
  rules.img = loadImage(`assets/images/rules.png`);

  // Load more food button image
  moreFoodButton.img = loadImage(`assets/images/moreFood.png`);

  // Load background rocks and sand images
  bg.rocks.img = loadImage(`assets/images/rocks.png`);
  bg.sand.img = loadImage(`assets/images/sand.png`);

  // Load title font and body text font
  title.font = loadFont(`assets/fonts/Slackey-Regular.ttf`);
  bodyTextFont = loadFont(`assets/fonts/Grandstander-Regular.ttf`);

  // Load background music
  backgroundMusic = loadSound(`assets/sounds/backgroundMusic.mp3`);
}

// setup() -----------------------------------------------------------------------
//
// Set up canvas, hide cursor, create arrays for fishfoods and poemLines
function setup() {
  createCanvas(1300, 800);
  noCursor();
  noStroke();

  // Set firefish's current image to first image
  firefish.currentImage = firefish.img1;

  // Create array for fishfoods (for animation state)
  for (let i = 0; i < numFishfoods; i++) {
    fishfoods[i] = new Fishfood();
  }

  // Create array for poemLines (for end state)
  for (let i = 0; i < numPoemLines; i++) {
    poemLines[i] = new PoemLine(line[i], width/2, i*spaceBetweenEachLine + yLocationOfFirstLine);
  }

  // Create array for poop (for end state)
  for (let i = 0; i < poop.totalNumOfPoop; i++) {
    poops[i] = new Poop();
  }
}



// draw() -----------------------------------------------------------------------
//
// Set up background color, background rocks and sand, and states
function draw() {
  // Set up background color, rocks, and sand
  setBackground();

  // Setting up states: intro, instructions, animation, ending
  if (state === `intro`) {
    intro();
  }
  else if (state === `instructions`) {
    instructions();
  }
  else if (state === `animation`) {
    animation();
  }
  else if (state === `ending`) {
    ending();
  }
}

// Try playing music if mouse is pressed
function mousePressed() {
  tryMusic();
}

// Try playing music if key is pressed
function keyPressed() {
  tryMusic();
}

// Play music if first interaction and loop it
function tryMusic() {
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.loop();
  }
}

// Set up background color, rocks, and sand
function setBackground() {
  background(bg.fill.r, bg.fill.g, bg.fill.b);
  push();
  imageMode(CENTER);
  image(bg.sand.img, width/2, height - bg.sand.height/2, bg.sand.length, bg.sand.height);
  image(bg.rocks.img, width/2, height*2/3, bg.rocks.length, bg.rocks.height);
  pop();
}

// intro() -----------------------------------------------------------------------
//
// Intro state: Display title, start button, finger, and fish
function intro() {
  // Display the title, start button, and start text
  displayTitle();
  displayStartButton();
  displayStart();

  // Start button and text enlarge if finger hovers over Start Button
  hoverOnStartButton();

  // Display user circle and move with mouse
  displayFinger();
  moveFinger();

  // Display firefish casually swimming
  switchFishImages();
  displayFirefish({img: firefish.currentImage, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width});
  firefishCasualSwimming({tx:firefish.tx, ty:firefish.ty, txChange:firefish.txChange, tyChange:firefish.tyChange, speedCasualSwimming:firefish.speed.casualSwimming});

  // Constraining firefish's movement to the inside of the tank
  fishStaysInTank({x:firefish.x, y:firefish.y});
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

// Display the circular Start button
function displayStartButton() {
  push();
  startButton.x = start.x;
  startButton.y = start.y;

  fill(startButton.fill.r, startButton.fill.g, startButton.fill.b, startButton.fill.alpha);
  ellipse(startButton.x, startButton.y, startButton.size);
  pop();
}

// Display the Start text
function displayStart() {
  push();
  fill(start.fill.r, start.fill.g, start.fill.b);
  textSize(start.size);
  textAlign(CENTER, CENTER);

  start.x = width*1/5;
  start.y = height*4/5;

  textFont(bodyTextFont);
  text(start.text, start.x, start.y);
  pop();
}

// If finger hovers on Start button, Start button and text enlarges
function hoverOnStartButton() {
  if (mouseIsInButton({x:startButton.x, y:startButton.y, size:startButton.size})) {
    push();
    // Start button enlarges and changes color
    startButton.size = startButton.sizeBigger;
    fill(startButton.fill.rHover, startButton.fill.gHover, startButton.fill.bHover, startButton.fill.alpha);
    ellipse(startButton.x, startButton.y, startButton.size);

    // Start text enlarges
    start.size = start.sizeBigger;
    fill(start.fill.r, start.fill.g, start.fill.b);
    textAlign(CENTER, CENTER);
    textSize(start.size);
    textFont(bodyTextFont);
    text(start.text, start.x, start.y);
    pop();
  }
  else {
    // Start button and text keep size of initial setup
    startButton.size = startButton.sizeSmaller;
    start.size = start.sizeSmaller;
  }
}

// Display finger (user circle)
function displayFinger() {
  push();
  fill(finger.fill.r, finger.fill.g, finger.fill.b, finger.fill.alpha);
  ellipse(finger.x, finger.y, finger.size);
  pop();
}

// Finger follows mouse position
function moveFinger() {
  finger.x = mouseX;
  finger.y = mouseY;
}

// Firefish switches between image 1 and image 2
function switchFishImages() {
  firefish.framesElapsed++;
  if (firefish.framesElapsed === firefish.framesBtwEachImage) {
    if (firefish.currentImage === firefish.img1) {
      firefish.currentImage = firefish.img2;
    }
    else {
      firefish.currentImage = firefish.img1;
    }
    firefish.framesElapsed = 0;
  }
}

// Firefish swims randomly using Perlin noise
function firefishCasualSwimming({vx, vy, speedCasualSwimming}) {
  firefish.tx += firefish.txChange;
  firefish.ty += firefish.tyChange;

  let noiseX = noise(firefish.tx);
  let noiseY = noise(firefish.ty);

  let chanceOfChangingDirections = random();

  if (chanceOfChangingDirections < 0.05) {
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

// Constraining firefish's movement
function fishStaysInTank({x,y}) {
  x = constrain(x, fishtank.border, width - fishtank.border);
  y = constrain(y, fishtank.border, height - fishtank.border);
}

// instructions() ----------------------------------------------------------------------
//
// Instructions state: display rules on the canvas (with fish, MoreFood button, and food tracker in backgroun), players start the animation by clicking "Ready!" button
function instructions() {
  // Behind the rules, display More Food Button, food tracker, and firefish casually swimming
  displayMoreFoodButton();
  displayFoodTracker();
  firefishCasualSwimming({speedCasualSwimming:firefish.speed.casualSwimming});
  switchFishImages();
  displayFirefish({img: firefish.currentImage, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width});

  // Display rules and rounded-rectangle behind it
  displayRulesRect();
  displayRules();

  // Display Ready button and when hovering on button, Ready button enlarges
  displayReadyButton();
  displayReadyText();
  hoverOnReadyButton();

  displayFinger();
  moveFinger();
}

// Display food tracker on canvas
function displayFoodTracker() {
  push();
  // display food tracker image
  image(firefish.foodTracker.img, firefish.foodTracker.x, firefish.foodTracker.y, firefish.foodTracker.length, firefish.foodTracker.height);

  // display bar that updates when fish eats food
  fill(foodTracker.fillR, foodTracker.fillG, foodTracker.fillB);
  rect(foodTracker.x, foodTracker.y, foodTracker.length, foodTracker.height, foodTracker.radius);
  pop();
}

// Display "Ready!" text
function displayReadyText() {
  push();
  fill(ready.fill.r, ready.fill.g, ready.fill.b);
  textSize(ready.size);
  textAlign(CENTER, CENTER);

  textFont(bodyTextFont);
  text(ready.text, ready.x, ready.y);
  pop();
}

// Display rules page
function displayRules() {
  push();
  imageMode(CENTER);
  rules.x = width/2;
  rules.y = height/2;
  image(rules.img, rules.x, rules.y, rules.length, rules.height);
  pop();
}

// If finger hovers on Ready button, Ready button and text enlarges
function hoverOnReadyButton() {
  if (mouseIsInButton({x:readyButton.x, y:readyButton.y, size:readyButton.size})) {
    push();
    // Ready button enlarges
    readyButton.size = readyButton.sizeBigger;
    fill(readyButton.fill.rHover, readyButton.fill.gHover, readyButton.fill.bHover, readyButton.fill.alpha);
    ellipse(readyButton.x, readyButton.y, readyButton.size);

    // Ready text enlarges
    ready.size = ready.sizeBigger;
    fill(ready.fill.r, ready.fill.g, ready.fill.b);
    textAlign(CENTER, CENTER);
    textSize(ready.size);
    textFont(bodyTextFont);
    text(ready.text,ready.x, ready.y);
    pop();
  }
  else {
    // Ready button and text keep size of initial setup
    readyButton.size = readyButton.sizeSmaller;
    ready.size = ready.sizeSmaller;
  }
}

// Display the circular Start button
function displayReadyButton() {
  push();
  readyButton.x = ready.x;
  readyButton.y = ready.y;

  fill(readyButton.fill.r, readyButton.fill.g, readyButton.fill.b, readyButton.fill.alpha);
  ellipse(readyButton.x, readyButton.y, readyButton.size);
  pop();
}

// Changes states when mouse clicks on Start or Ready button
function mouseClicked() {
  // If finger clicks on Start button, cue `instructions` state
  if (state === `intro`) {
    if (mouseIsInButton({x:startButton.x, y:startButton.y, size:startButton.size})) {
      state = `instructions`;
    }
  }

  // If finger clicks on Ready button, cue `animation` state
  if (state === `instructions`) {
    if (mouseIsInButton({x:readyButton.x, y:readyButton.y, size:readyButton.size})) {
      state = `animation`;
    }
  }
}

// Checks if finger's position is inside a button
function mouseIsInButton({x, y, size}) {
  if (mouseX < x+(size/2) && mouseX > x-(size/2)) {
    if (mouseY < y+(size/2) && mouseY > y-(size/2)) {
      return true;
    }
  }
  else {
    return false;
  }
}

// Display Rules rectangle
function displayRulesRect() {
  rulesRect.x = width/2;
  rulesRect.y = height/2;
  rulesRect.length = width - rulesRect.distToEdge;
  rulesRect.height = height - rulesRect.distToEdge;

  push();
  fill(rulesRect.fill.r, rulesRect.fill.g, rulesRect.fill.b, rulesRect.fill.alpha);
  rectMode(CENTER);
  rect(rulesRect.x, rulesRect.y, rulesRect.length, rulesRect.height, rulesRect.cornerRadius);
  pop();
}

// animation() -----------------------------------------------------------------------
//
// Animation state: Finger, firefish, food tracker, and MoreFoodButton are displayed. Finger moves with mouse. Firefish moves randomly (Perlin noise) until it spots the finger and follows it. If the fish is close enough to food, it will eat it and the tracker updates.
function animation() {
  // All functions pertaining to More Food Button are found on moreFoodButton.js
  // Display More Food Button
  displayMoreFoodButton();
  // Change More Food Button's opacity if it is active or inactive
  changeButtonOpacity();
  // Enlarge More Food Button if user hovers over it
  hoverOnMoreFoodButton();
  // If user clicks on More Food Button while it's active, release food
  clickMoreFoodButton();
  // Reactivate More Food Button when there is no more food on the canvas
  resetMoreFoodButton();

  // Release fish food if the More Food Button is clicked and it is active
  releaseFishfood();

  // Display and update food tracker every time fish eats scrumptious food
  displayFoodTracker();
  updateFoodTracker();

  // Firefish follows finger if the fish senses the finger, or else it swims casually around the tank.
  if (fishSensesFinger({x:firefish.x, y:firefish.y, fieldOfVision:firefish.fieldOfVision})) {
    fishFollowsFinger({x: firefish.x, y: firefish.y, vx: firefish.vx, vy: firefish.vy, speed: firefish.speed.followingMouse});
  }
  else {
    firefishCasualSwimming({speedCasualSwimming:firefish.speed.casualSwimming});
  }

  // Display firefish
  switchFishImages();
  displayFirefish({img: firefish.currentImage, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width});

  // Display and move finger
  displayFinger();
  moveFinger();

  // Cue ending if firefish has eaten the total number of food
  fishIsFull();
}

// Display and move 5 pieces of food
function releaseFishfood() {
  if (showFood) {
    for (let i = fishfoods.length-1; i >= 0; i--) {
      fishfoods[i].move();
      fishfoods[i].show();

      // If fish eats food, at numFoodEaten counter
      if (fishfoods[i].foodEaten()) {
        firefish.numFoodEaten ++;
      }

      // Everytime a food goes off screen, remove food item from fishfoods array
      if (fishfoods[i].foodEaten() || fishfoods[i].offScreen()) {
        fishfoods.splice(i,1);
      }
    }
  }
}

// Update food tracker every time food is eaten by fish
function updateFoodTracker() {
  foodTracker.length = map(firefish.numFoodEaten, 0, totalFood, 0, foodTracker.totalLength);
}

// The fish follows the finger
function fishFollowsFinger({x, y, vx, vy, speed}) {
  // Calculating distance from fish to finger
  let distX = firefish.x - mouseX;
  let distY = firefish.y - mouseY;

  // Firefish's velocity changes depending on where the finger is with respect to its body
  if (distX < -firefish.buffer) {
    vx = speed;
  }
  else if (distX > firefish.buffer) {
    vx = -speed;
  }
  else {
    vx = 0; // Stop moving if the fish is within buffer of the finger
  }
  if (distY < 0) {
    vy = speed;
  }
  else if (distY > 0) {
    vy = -speed;
  }

  firefish.x += vx;
  firefish.y += vy;

  // Setting the fish's direction (facing left or facing right)
  if (vx > 0) {
    firefish.scale.x = -1; // face right
  }
  else if (vx < 0 || vx === 0) {
    firefish.scale.x = 1; // face left
  }
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

// Cue ending if firefish has eaten the total number of food
function fishIsFull() {
  if (firefish.numFoodEaten === totalFood) {
    state = `ending`;
  }
}

// ending() -----------------------------------------------------------------------
//
// Ending state: Display end poem. Night filter slowly appears and gives the tank an ominous feeling
function ending() {
  // Determine the location of firefish's cloaca (where poop comes out)
  determineCloacaLocation();
  // Display and move poop
  displayAndMovePoop();
  // Release a line of poop
  releasePoopLine();
  // Remove poop when there are too many to handle
  removePoop();

  // Display firefish casually swimming
  switchFishImages();
  displayFirefish({img: firefish.currentImage, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width});
  firefishCasualSwimming({tx:firefish.tx, ty:firefish.ty, txChange:firefish.txChange, tyChange:firefish.tyChange, speedCasualSwimming:firefish.speed.casualSwimming});

  // Display night filter and end poem
  displayNightFilter();
  displayEndPoem();

  // Display and move finger based on user's mouse position
  displayFinger();
  moveFinger();
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

// Display end poem
function displayEndPoem() {
  for (let i = 0; i < numPoemLines; i++) {
    poemLines[i].show();
  }
}

// This is what it means to be a piece of poop: it is displayed and it moves
class Poop {
  constructor(fishX, fishY) {
    this.x = fishX;
    this.y = fishY;
    this.vx = 0;
    this.vy = 0;
    this.speed = 1;
    this.ax = 0;
    this.ay = 0;
    this.acceleration = 3;
    this.size = 5;
    this.fillR = 102;  // poop brown color
    this.fillG = 75;
    this.fillB = 0;
  }

  // display poop pebble
  show() {
    push();
    fill(this.fillR, this.fillG, this.fillB);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // poop flows upwards --> it knows how to fly!
  move() {
    this.ay = -this.acceleration;
    this.vx = this.speed;
    this.vy = this.speed;
    this.x +=  this.vx + this.ax;
    this.y +=  this.vy + this.ay;
  }
}

// Display and move poop; the poop comes out of the fish's cloaca
function displayAndMovePoop() {
  for (let i = poops.length-1; i >= 0; i--) {
    poops[i].show(firefish.cloacaX, firefish.cloacaY);
    poops[i].move();
  }
}

// Release a line of poop by adding more poop pebbles to the poops array
function releasePoopLine() {
  let addPoop = new Poop(firefish.cloacaX, firefish.cloacaY);
  poops.push(addPoop);
}

// Calculating position of firefish's cloaca
function determineCloacaLocation() {
  // Calculating x position of cloaca
  if (firefish.scale.x > 0) { // fish is facing left
    firefish.cloacaX = firefish.x + firefish.length/2;
  }
  else { // fish is facing right
    firefish.cloacaX = firefish.x - firefish.length/2;
  }

  // Calculating y position of cloaca
  firefish.cloacaY = firefish.y + firefish.vertDistBtwFishAndCloaca;
}

// To ensure that poop does not get too long, cut off array after a certain amount of poop pebbles have been released
function removePoop() {
  if (poops.length > poop.totalNumOfPoop) {
    poops.splice(0,1);
  }
}
