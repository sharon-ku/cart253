/**************************************************
Project 2: Hungry Fishies
Sharon Ku


INTRO state & INSTRUCTIONS state:
- The title "Hungry Fishies" is displayed with two fish (firefish and neon goby) swimming around the tank.
- Click the "Start" button to see the instructions (instructions state).
- Click "Ready!" to start the animation state.

ANIMATION state:
- Bring the finger/user circle close enough to the fish for it to notice it, then the fish will follow it.
- Click the "More Food" button to add food to the tank.
- Try to get the fish to eat the food by guiding it with the finger.
- Change the current direction by using the left and right arrow keys.
- When all fish are full, the simulation ends (cue ending state).

ENDING state:
- A poem is featured as the tank plunges into darkness.
- The fish release a little surprise from their behind.

***
Btw I realized that the plural of fish is fish and not fishes. It's too late now.
***

Background music from Mixkit.co: Smooth Like Jazz by Ajhay Stelino
**************************************************/

"use strict"; // because strict is good

// State of program
let state = `intro`; // other states: instructions, animation, ending

// Background music
let backgroundMusic = undefined;

// Variables related to fishFood
let fishFoods = []; // fishFoods array that contains food objects
let numFishFoods = 5; // number of fish food in the tank at once
let totalFood = 2; // total amount of food that each fish needs to consume

// Fonts used for title and body text
let titleFont;
let bodyTextFont;

// Title text
let title;

// Start button circle and text inside it
let startButtonCircle;
let startButtonText;

// Food tracker array
let foodTrackers = [];

// Fishes array
let fishes = [];

// My fishes
let firefish;
let goby;

// Variables used to store fish images
let firefishImg1;
let firefishImg2;
let gobyImg1;
let gobyImg2;

// Variables used to store food tracker images
let firefishFoodTrackerImg;
let gobyFoodTrackerImg;

// User circle
let finger;

// More Food button
let moreFoodButton;
let moreFoodButtonImg;

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

// Fish tank
let fishTank = {
  border: 100,
};

// Rules
let rules;
// Variable to store rules image
let rulesImg;
// Rounded rectangle displayed behind the rules image
let rulesRect;

// Ready button circle and text inside it
let readyButtonCircle;
let readyButtonText;

// End poem
let yLocationOfFirstLine = 210;
let poem;

// Nighttime shade rectangle
let nightFilter;

// Array containing poop pebbles
let poops = [];
// Total number of poop that the fish can release in a single swimming
let totalNumPoops = 50;

// setup() -----------------------------------------------------------------------
//
// Preload all images, music, and fonts
// --------------------------------------------------------------------------------

function preload() {
  // Load all fish images
  // firefish
  firefishImg1 = loadImage(`assets/images/firefish1.png`);
  firefishImg2 = loadImage(`assets/images/firefish2.png`);
  // goby
  gobyImg1 = loadImage(`assets/images/goby1.png`);
  gobyImg2 = loadImage(`assets/images/goby2.png`);


  // Load all food tracker images
  firefishFoodTrackerImg = loadImage(`assets/images/firefishFoodTracker.png`);
  gobyFoodTrackerImg = loadImage(`assets/images/gobyFoodTracker.png`);


  // Load rules image
  rulesImg = loadImage(`assets/images/rules.png`);

  // Load more food button image
  moreFoodButtonImg = loadImage(`assets/images/moreFood.png`);

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
// Set up canvas, hide cursor, hide all strokes, create all objects from classes
// --------------------------------------------------------------------------------

function setup() {
  createCanvas(1300, 800);
  noCursor();
  noStroke();

  // Create a new finger
  finger = new Finger();

  // Create a new firefish
  firefish = new Firefish(firefishImg1, firefishImg2);
  fishes.push(firefish);

  // Create a new goby
  goby = new Goby(gobyImg1, gobyImg2);
  fishes.push(goby);

  // Create a new title
  title = new Title();


  // Setting x and y positions for start button
  let startButtonX = width * 0.2;
  let startButtonY = height * 0.8;
  // Create a new start button + text inside start button
  startButtonCircle = new StartButtonCircle(startButtonX, startButtonY);
  startButtonText = new StartButtonText(startButtonX, startButtonY, bodyTextFont);

  // Setting x and y positions for ready button
  let readyButtonX = width * 0.9;
  let readyButtonY = height * 0.8;
  // Create a new ready button + text inside ready button
  readyButtonCircle = new ReadyButtonCircle(readyButtonX, readyButtonY);
  readyButtonText = new ReadyButtonText(readyButtonX, readyButtonY, bodyTextFont);

  // Create a new rules image and a new rectangle that goes behind the image
  rules = new Rules(rulesImg);
  rulesRect = new RulesRect();

  console.log(fishFoods);
  // Create array for fishFoods
  for (let i = 0; i < numFishFoods; i++) {
    fishFoods[i] = new FishFood(fishTank.border);
  }


  // Create a new More Food button
  moreFoodButton = new MoreFoodButton(moreFoodButtonImg);

  // Create a new food tracker for firefish and goby and push them into foodTrackers array
  let foodTrackerForFirefish = new FoodTrackerForFirefish(firefishFoodTrackerImg);
  foodTrackers.push(foodTrackerForFirefish);
  let foodTrackerForGoby = new FoodTrackerForGoby(gobyFoodTrackerImg);
  foodTrackers.push(foodTrackerForGoby);

  // Create a new night filter
  nightFilter = new NightFilter();

  // Create a new end poem
  let poemLineX = width / 2;
  let poemLineY = yLocationOfFirstLine;
  poem = new Poem(bodyTextFont, poemLineX, poemLineY);

  // Create array for poop
  for (let i = 0; i < totalNumPoops; i++) {
    poops[i] = new Poop();
  }
}



// draw() -----------------------------------------------------------------------
//
// Set up background color, background rocks and sand, and states
// --------------------------------------------------------------------------------

function draw() {
  // Set up background color, rocks, and sand
  setBackground();

  // Setting up states: intro, instructions, animation, ending
  if (state === `intro`) {
    intro();
  } else if (state === `instructions`) {
    instructions();
  } else if (state === `animation`) {
    animation();
  } else if (state === `ending`) {
    ending();
  }
}

// Set up background color, rocks, and sand
function setBackground() {
  background(bg.fill.r, bg.fill.g, bg.fill.b);
  push();
  imageMode(CENTER);
  image(bg.sand.img, width / 2, height - bg.sand.height / 2, bg.sand.length, bg.sand.height);
  image(bg.rocks.img, width / 2, height * 2 / 3, bg.rocks.length, bg.rocks.height);
  pop();
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

// intro() -----------------------------------------------------------------------
//
// INTRO STATE: Display title, start button, finger, and casually swimming fish
// --------------------------------------------------------------------------------

function intro() {
  // Display the title
  title.display(titleFont);

  // Create a "start" button
  // Button is made up of a shape and a text inside it
  generateButton(startButtonCircle, startButtonText);

  // Display fishes casually swimming
  for (let i = 0; i < fishes.length; i++) {
    let fish = fishes[i];
    fish.casualSwimming(fishTank);
    displayAnimatedFish(fish);
  }

  // Display user circle and move with finger
  moveAndDisplayFinger();
}

// Create a button that is displayed, has a hover behavior (size changes when hovering over it), and that moves randomly
function generateButton(buttonShape, buttonText) {
  // If finger is in button, make button's size increase and decrease
  if (mouseIsInButton(buttonShape)) {
    buttonShape.hover();
    buttonText.hover();
  } else { // set the button to its normal size
    buttonShape.setNormalSize();
    buttonText.setNormalSize();
  }

  // Move the button
  buttonShape.move();
  buttonText.move(buttonShape); // text has same position as button shape
  stayInTank(buttonShape); // ensure that button does not leave the tank

  // Display the button shape with text inside it
  buttonShape.display();
  buttonText.display();
}

// Display a fish and switch its images
function displayAnimatedFish(fishName) {
  fishName.switchImages();
  fishName.display();
}

// Moves and displays finger (user circle)
function moveAndDisplayFinger() {
  finger.move();
  finger.display();
}

// Constrain object/animal's position to the inside of the tank
function stayInTank(subject) {
  subject.x = constrain(subject.x, fishTank.border, width - fishTank.border);
  subject.y = constrain(subject.y, fishTank.border, height - fishTank.border);
}

// instructions() ----------------------------------------------------------------------
//
// INSTRUCTIONS STATE:
// Display rules on the canvas with fish, MoreFood button, and food tracker in background.
// Player starts the animation by clicking "Ready!" button.
// --------------------------------------------------------------------------------

function instructions() {
  // Display More Food Button
  moreFoodButton.display();
  // Display the food tracker
  for (let i = 0; i < foodTrackers.length; i++) {
    let foodTracker = foodTrackers[i];
    foodTracker.display();
  }

  // Display animated fishes casually swimming
  for (let i = 0; i < fishes.length; i++) {
    let fish = fishes[i];
    fish.casualSwimming(fishTank);
    displayAnimatedFish(fish);
  }

  // Display rules and rounded rectangle behind it
  rulesRect.display();
  rules.display();

  // Create a "ready" button that is displayed, has a hover behavior (size changes when hovering over it), and that moves randomly
  // Button is made up of a shape and a text inside it
  generateButton(readyButtonCircle, readyButtonText);

  // Display and move finger
  moveAndDisplayFinger();
}

// Changes states when mouse clicks on Start or Ready button
function mouseClicked() {
  // If finger clicks on Start button, cue `instructions` state
  if (state === `intro`) {
    if (mouseIsInButton(startButtonCircle)) {
      state = `instructions`;
    }
  }

  // If finger clicks on Ready button, cue `animation` state
  if (state === `instructions`) {
    if (mouseIsInButton(readyButtonCircle)) {
      state = `animation`;
    }
  }
}

// Checks if finger's position is inside a button
function mouseIsInButton(buttonName) {
  if (mouseX < buttonName.x + (buttonName.size / 2) &&
    mouseX > buttonName.x - (buttonName.size / 2) &&
    mouseY < buttonName.y + (buttonName.size / 2) &&
    mouseY > buttonName.y - (buttonName.size / 2)) {
    return true;
  } else {
    return false;
  }
}

// animation() -----------------------------------------------------------------------
//
// ANIMATION STATE:
// Finger, firefish, food tracker, and MoreFoodButton are displayed.
// Finger moves with mouse.
// Fish move randomly (Perlin noise) until they spot the finger then follow it.
// If the fish is close enough to food, it will eat it and the tracker updates.
// --------------------------------------------------------------------------------

function animation() {
  // Display More Food Button
  moreFoodButton.display();
  // Change More Food Button's opacity if it is active or inactive
  moreFoodButton.changeOpacity();
  // Enlarge More Food Button if user hovers over it
  moreFoodButton.hover(finger);
  // If user clicks on More Food Button while it's active, release food
  moreFoodButton.clicked(finger);
  // Reactivate More Food Button when there is no more food on the canvas
  moreFoodButton.reactivate(fishFoods, numFishFoods);

  // Display food trackers and update food tracker bar every time fish eats scrumptious food
  for (let i = 0; i < foodTrackers.length; i++) {
    for (let i = 0; i < fishes.length; i++) {
      let fish = fishes[i];
      let foodTracker = foodTrackers[i];
      foodTracker.updateBar(fish, totalFood);
      foodTracker.display();
    }
  }

  for (let i = 0; i < fishes.length; i++) {
    let fish = fishes[i];
    // Release fish food if the More Food Button is clicked and it is active
    releaseFishFood(fish);

    // Fish follows finger if the fish senses the finger, or else it swims casually around the tank.
    if (fish.sensesFinger(finger)) {
      fish.followsFinger(finger);
    } else {
      fish.casualSwimming(fishTank);
    }

    // Display animated fish
    displayAnimatedFish(fish);
  }

  // Display and move finger
  moveAndDisplayFinger();

  // Cue ending if firefish has eaten the total number of food
  fishAreFull();
}

// Releases pieces of food
function releaseFishFood(fishName) {
  if (moreFoodButton.showFood) {
    for (let i = fishFoods.length - 1; i >= 0; i--) {
      fishFoods[i].move();
      fishFoods[i].changeCurrent(); // let user change current with arrow keys
      fishFoods[i].show();

      // If fish eats food, add to numFoodEaten counter
      if (fishFoods[i].foodEaten(fishName)) {
        fishName.numFoodEaten++;
        if (fishName.numFoodEaten === totalFood) {
          fishName.isFull = true;
        }
      }

      // If food item has not been consumed and goes off screen, remove food item from fishFoods array
      if (fishFoods[i].foodEaten(fishName) || fishFoods[i].offScreen()) {
        fishFoods.splice(i, 1);
      }
    }
  }
}

// Cue ending if all fishies have eaten the total number of food
function fishAreFull() {
  for (let i = 0; i < fishes.length; i++) {
    let fish = fishes[i];
    // if there is a fish that isn't full, stop the for-loop
    if (!fish.isFull) {
      return;
    }
  }
  // if all fish are full, cue ending state
  state = `ending`;
}

// ending() -----------------------------------------------------------------------
//
// ENDING STATE:
// Display end poem.
// Fishes poop.
// Night filter slowly appears and gives the tank an ominous feeling.
// --------------------------------------------------------------------------------

function ending() {
  // Make fishes poop and display fishes casually swimming
  for (let i = 0; i < fishes.length; i++) {
    let fish = fishes[i];
    fish.pooping(poops, totalNumPoops);

    fish.casualSwimming(fishTank);
    displayAnimatedFish(fish);
  }

  // Display filter that plunges tank into darkness
  nightFilter.display();

  // Display end poem
  poem.display();

  // Display and move finger based on user's mouse position
  moveAndDisplayFinger();
}
