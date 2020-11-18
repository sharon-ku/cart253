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

// Variables related to fishFood
let fishFoods = []; // fishfoods array that contains food objects
let numFishFoods = 5; // number of fish food in the tank at once
let totalFood = 15; // total amount of food that fish needs to consume

let timeForFood = true; // when no more food in tank, it is time for food
let showFood = false;  // when user clicks More Food button, show food

// Font that will be used for body text
let bodyTextFont = undefined;

// Title text
let title;
let titleFont;

// start button and text inside it
let startButton;
let startButtonText;

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
let finger;

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
let rules;
let rulesImg;

// Rules rectangle
let rulesRect;

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

let line = [`Little Firefishy is now well fed,`,
  `Watch it go, off to bed...`,
  `It suddenly feels something moving in its belly,`,
  `Looks like it gave birth to adorable food babies!`];

// Nighttime shade rectangle
let nightFilter;

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
  rulesImg = loadImage(`assets/images/rules.png`);

  // Load more food button image
  moreFoodButton.img = loadImage(`assets/images/moreFood.png`);

  // Load background rocks and sand images
  bg.rocks.img = loadImage(`assets/images/rocks.png`);
  bg.sand.img = loadImage(`assets/images/sand.png`);

  // Load title font and body text font
  titleFont = loadFont(`assets/fonts/Slackey-Regular.ttf`);
  bodyTextFont = loadFont(`assets/fonts/Grandstander-Regular.ttf`);

  // Load background music
  backgroundMusic = loadSound(`assets/sounds/backgroundMusic.mp3`);
}

// setup() -----------------------------------------------------------------------
//
// Set up canvas, hide cursor, create arrays for fishFoods and poemLines
function setup() {
  createCanvas(1300, 800);
  noCursor();
  noStroke();

  // Create a new finger
  finger = new Finger();

  // Create a new title
  title = new Title();


  // Setting x and y positions for start button
  let startButtonX = width*1/5;
  let startButtonY = height*4/5;
  // Create a new start button + text inside start button
  startButton = new StartButton(startButtonX, startButtonY);
  startButtonText = new StartButtonText(startButtonX, startButtonY);

  // Set firefish's current image to first image
  firefish.currentImage = firefish.img1;

  // Create a new rules image and rectangle behind the image
  rulesRect = new RulesRect();
  rules = new Rules(rulesImg);

  // Create array for fishFoods (for animation state)
  for (let i = 0; i < numFishFoods; i++) {
    fishFoods[i] = new FishFood();
  }

  // Create a new night filter
  nightFilter = new NightFilter();

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
  title.display(titleFont);

  // if finger is in button, call hover method (increases button size and changes color)
  if (mouseIsInButton(startButton)) {
    startButton.hover();
    startButtonText.hover();
  }
  else { // set the button to its normal size
    startButton.setNormalSize();
    startButtonText.setNormalSize();
  }

  // display the start button with the text inside
  startButton.display();
  startButtonText.display(bodyTextFont);

  // Display user circle and move with mouse
  moveAndDisplayFinger();

  // Display firefish casually swimming
  switchFishImages();
  displayFirefish({img: firefish.currentImage, x: firefish.x, y: firefish.y, length: firefish.length, width: firefish.width});
  firefishCasualSwimming({tx:firefish.tx, ty:firefish.ty, txChange:firefish.txChange, tyChange:firefish.tyChange, speedCasualSwimming:firefish.speed.casualSwimming});

  // Constraining firefish's movement to the inside of the tank
  fishStaysInTank(firefish);
}

// Moves and displays finger (user circle)
function moveAndDisplayFinger() {
  finger.move();
  finger.display();
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

// Constraining fish's position to the inside of the tank
function fishStaysInTank(fish) {
  fish.x = constrain(fish.x, fishtank.border, width - fishtank.border);
  fish.y = constrain(fish.y, fishtank.border, height - fishtank.border);
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
  rulesRect.display();
  rules.display();


  // Display Ready button and when hovering on button, Ready button enlarges
  displayReadyButton();
  displayReadyText();
  hoverOnReadyButton();

  moveAndDisplayFinger();
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

// If finger hovers on Ready button, Ready button and text enlarges
function hoverOnReadyButton() {
  if (mouseIsInButton(readyButton)) {
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
    if (mouseIsInButton(startButton)) {
      state = `instructions`;
    }
  }

  // If finger clicks on Ready button, cue `animation` state
  if (state === `instructions`) {
    if (mouseIsInButton(readyButton)) {
      state = `animation`;
    }
  }
}

// Checks if finger's position is inside a button
function mouseIsInButton(button) {
  if (mouseX < button.x+(button.size/2) && mouseX > button.x-(button.size/2)) {
    if (mouseY < button.y+(button.size/2) && mouseY > button.y-(button.size/2)) {
      return true;
    }
  }
  else {
    return false;
  }
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
  releaseFishFood();

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
  moveAndDisplayFinger();

  // Cue ending if firefish has eaten the total number of food
  fishIsFull();
}

// Display and move 5 pieces of food
function releaseFishFood() {
  if (showFood) {
    for (let i = fishFoods.length-1; i >= 0; i--) {
      fishFoods[i].move();
      fishFoods[i].show();

      // If fish eats food, at numFoodEaten counter
      if (fishFoods[i].foodEaten()) {
        firefish.numFoodEaten ++;
      }

      // Everytime a food goes off screen, remove food item from fishFoods array
      if (fishFoods[i].foodEaten() || fishFoods[i].offScreen()) {
        fishFoods.splice(i,1);
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

  // Displays filter that plunges tank into darkness
  nightFilter.display();
  // Display end poem
  displayEndPoem();

  // Display and move finger based on user's mouse position
  moveAndDisplayFinger();
}

// Display end poem
function displayEndPoem() {
  for (let i = 0; i < numPoemLines; i++) {
    poemLines[i].show();
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
