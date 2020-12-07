/**************************************************
Project 2: Hungry Fishies
Sharon Ku


INTRO state & INSTRUCTIONS state:
- The title "Hungry Fishies" is displayed
- Three fish (firefish, neon goby, clownfish) are swimming around the tank.
- Click the "Start" button to see the instructions (instructions state).
- Click "Ready!" to start the game state.

GAME state:
- Click the "More Food" button to add food to the tank.
- Bring the finger/user circle close enough to the fish for it to notice it.
- Try to get the fish to eat the food by guiding it with the finger.
- Change the current direction by using the left and right arrow keys.
- When all fish are full, the simulation ends (cue ending state).

ENDING state:
- A poem is featured as the tank plunges into darkness.
- The fish release a little surprise from their behind.

***
Btw I realized that the plural of fish is fish and not fishes.
It's too late now.
***

Background music from Mixkit.co: Smooth Like Jazz by Ajhay Stelino
**************************************************/

"use strict"; // because strict is good

// State of program
let state = `instructions`; // other states: instructions, game, ending

// Substates of instructions:
let instructionsState = `instructions1`; //other possible states: instructions2, instructions3, instructions4, instructions5

// Background music
let backgroundMusic = undefined;

// Variables related to fishFood
let fishFoods = []; // fishFoods array that contains food objects
let numFishFoods = 5; // number of fish food in the tank at once
let totalFood = 10; // total amount of food that each fish needs to consume

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

// My fishies
let firefish;
let goby;
let nene;

// Stores the names of all my fishies
let allFishNames = [`firefish`, `goby`, `nene`];

// Stores all fish names as properties, with img1,img2,and foodTrackerImg as subproperties
let fishImages = {

};

// Stores demo fish and food tracker
let demoFish;
let demoFoodTracker;

// Stores images for demo fish and food tracker (used for Instructions state)
let demoFishImg1;
let demoFishImg2;
let demoFoodTrackerImg;

// Anemone
let anemone;

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

// Instructions' current step number and text
let step = {
  currentNumber: 0,
  // appearance information
  textFill: 255,
  textSize: 40,
  textAlign: `LEFT`,
  // position information
  x: 100,
  y: 100,
};
let instructionsText = [
  `Bring your finger near the fish
to get its attention.`,
  `Guide fish to scrumptious food.`,
  `Click the More Food button
to release 5 pieces of food.`,
  `Hold left and right arrow keys to
change water flow direction.`,
  `When all your fishies are full,
mission accomplished!`
];

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
  // Load all fish images and food tracker images
  for (let i = 0; i < allFishNames.length; i++) {
    let fish = allFishNames[i];

    // Allow fishImages.fish to have its own subproperties (which will be img1, img2, and foodTrackerImg)
    fishImages[`${fish}`] = {};

    // load image 1 and 2 for each fish
    fishImages[`${fish}`].img1 = loadImage(`assets/images/${fish}1.png`);
    fishImages[`${fish}`].img2 = loadImage(`assets/images/${fish}2.png`);
    // load food tracker image for each fish
    fishImages[`${fish}`].foodTrackerImg = loadImage(`assets/images/${fish}FoodTracker.png`);
  }

  // Load demoFish images
  demoFishImg1 = loadImage(`assets/images/demoFish1.png`);
  demoFishImg2 = loadImage(`assets/images/demoFish2.png`);

  // Load demoFoodTracker image
  demoFoodTrackerImg = loadImage(`assets/images/demoFoodTracker.png`);

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
  // createCanvas(1300, 800);
  createCanvas(1280, 720);
  noCursor();
  noStroke();

  // Create a new finger
  finger = new Finger();

  // Create a new firefish
  firefish = new Firefish(fishImages.firefish.img1, fishImages.firefish.img2);
  fishes.push(firefish);

  // Create a new goby
  goby = new Goby(fishImages.goby.img1, fishImages.goby.img2);
  fishes.push(goby);

  // Create a new nene
  nene = new Nene(fishImages.nene.img1, fishImages.nene.img2);
  fishes.push(nene);

  // Create a new anemone
  anemone = new Anemone(360,345);

  // Create a new title
  title = new Title();


  // Setting x and y positions for start button
  let startButtonX = width * 0.2;
  let startButtonY = height * 0.8;
  // Create a new start button + text inside start button
  startButtonCircle = new StartButtonCircle(startButtonX, startButtonY);
  startButtonText = new StartButtonText(startButtonX, startButtonY, bodyTextFont);

  // Create a new demo fish
  demoFish = new DemoFish(demoFishImg1, demoFishImg2);

  // Create a new demo food tracker
  demoFoodTracker = new DemoFoodTracker(demoFoodTrackerImg);

  // Setting x and y positions for ready button
  let readyButtonX = width * 0.9;
  let readyButtonY = height * 0.8;
  // Create a new ready button + text inside ready button
  readyButtonCircle = new ReadyButtonCircle(readyButtonX, readyButtonY);
  readyButtonText = new ReadyButtonText(readyButtonX, readyButtonY, bodyTextFont);

  // Create a new rules image and a new rectangle that goes behind the image
  rules = new Rules(rulesImg);
  rulesRect = new RulesRect();

  // Create array for fishFoods
  for (let i = 0; i < numFishFoods; i++) {
    let fishFood = fishFoods[i];
    fishFood = new FishFood(fishTank.border);
  }


  // Create a new More Food button
  moreFoodButton = new MoreFoodButton(moreFoodButtonImg);

  // Create a new food tracker for each fish and push the food trackers into foodTrackers array
  let foodTrackerForFirefish = new FoodTrackerForFirefish(fishImages.firefish.foodTrackerImg);
  foodTrackers.push(foodTrackerForFirefish);
  let foodTrackerForGoby = new FoodTrackerForGoby(fishImages.goby.foodTrackerImg);
  foodTrackers.push(foodTrackerForGoby);
  let foodTrackerForNene = new FoodTrackerForNene(fishImages.nene.foodTrackerImg);
  foodTrackers.push(foodTrackerForNene);

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

  // Setting up states: intro, instructions, game, ending
  if (state === `intro`) {
    intro();
  } else if (state === `instructions`) {
    instructions();
  } else if (state === `game`) {
    game();
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
  // Draw all sprites
  drawSprites();

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
// Player starts the game by clicking "Ready!" button.
// --------------------------------------------------------------------------------

function instructions() {


  // Draw all sprites
  // drawSprites();

  // Display More Food Button
  moreFoodButton.display();
  // Display the food tracker
  // for (let i = 0; i < foodTrackers.length; i++) {
  //   let foodTracker = foodTrackers[i];
  //   foodTracker.display();
  // }

  // Display animated fishes casually swimming
  // for (let i = 0; i < fishes.length; i++) {
  //   let fish = fishes[i];
  //   fish.casualSwimming(fishTank);
  //   displayAnimatedFish(fish);
  // }

  // Display rules and rounded rectangle behind it
  rulesRect.display();
  // rules.display();

  // Display instructions step
  displayInstructionsStep();

  // Setting up 5 substates for instructions state
  if (instructionsState === `instructions1`) {
    instructions1();
  }
  else if (instructionsState === `instructions2`) {
    instructions2();
  }
  else if (instructionsState === `instructions3`) {
    instructions3();
  }
  else if (instructionsState === `instructions4`) {
    instructions4();
  }
  else if (instructionsState === `instructions5`) {
    instructions5();
  }



  // Display and move finger
  moveAndDisplayFinger();
}

// Display the written instructions on top left corner of canvas
function displayInstructionsStep() {
  push();
  textAlign(step.textAlign);
  fill(step.textFill);
  textFont(bodyTextFont, step.textSize);

  text(instructionsText[step.currentNumber], step.x, step.y);
  pop();
}

// demoFish appears from left side of screen, ring expands around fish, and then fish moves with finger when finger is close to it
function instructions1() {
  // Display and move demoFish
  demoFish.move();
  demoFish.onTheLookoutForFinger(finger);

  demoFish.displayRing();
  demoFish.display();
  demoFish.increaseRingSize();
  demoFish.changeRingAlpha();


}



function instructions5() {
  // set Instructions text to step number 4
  step.currentNumber = 4;

  // Show a food tracker that constantly fills up
  demoFoodTracker.increaseBar();
  demoFoodTracker.display();

  // Create a "ready" button that is displayed, has a hover behavior (size changes when hovering over it), and that moves randomly
  // Button is made up of a shape and a text inside it
  generateButton(readyButtonCircle, readyButtonText);
}

// Changes states when mouse clicks on Start or Ready button
function mouseClicked() {
  // If finger clicks on Start button, cue `instructions` state
  if (state === `intro`) {
    if (mouseIsInButton(startButtonCircle)) {
      state = `instructions`;
    }
  }

  // If finger clicks on Ready button, cue `game` state
  if (state === `instructions`) {
    if (mouseIsInButton(readyButtonCircle)) {
      state = `game`;
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

// game() -----------------------------------------------------------------------
//
// game STATE:
// Finger, fish, food tracker, and MoreFoodButton are displayed.
// Finger moves with mouse.
// Fish move randomly (Perlin noise) until they spot the finger then follow it.
// If the fish is close enough to food, it will eat it and the tracker updates.
// --------------------------------------------------------------------------------

function game() {
  // Draw all sprites
  drawSprites();

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
    if (moreFoodButton.showFood) {
      releaseFishFood(fish);
    }

    // If the fish has no food stored inside its mouth,
    // then fish either follows finger if the fish senses the finger, or it swims casually around the tank.
    if (!fish.foodInMouth) {
      if (fish.sensesFinger(finger)) {
        fish.followsFinger(finger);
      } else {
        fish.casualSwimming(fishTank);
      }
    }

    // Display animated fish
    displayAnimatedFish(fish);
  }

  // Display and move finger
  moveAndDisplayFinger();

  // Cue ending if all fish have eaten the total number of food
  fishAreFull();
}

// Releases pieces of food
function releaseFishFood(fishName) {

    for (let i = fishFoods.length - 1; i >= 0; i--) {
      let fishFood = fishFoods[i];
      // fishFood.move();
      // fishFood.changeCurrent(); // let user change current with arrow keys
      fishFood.show();


      // Fish interacts with food by either eating it or feeding it to the anemone
      fishName.interactsWithFood(fishFood, anemone, fishName);

      // When anemone's position equals food's position, remove food and set timeToFeedAnemone to false for this turn
      // also decide if next turn is time to feed anemone
      if (fishName.isAClownfish && fishName.foodInMouth && fishFoods.length <= 1) {
        // If food is close to anemone
        if (fishFood.x < (anemone.sprite.position.x+50) &&
            fishFood.x > (anemone.sprite.position.x-50) &&
            fishFood.y < (anemone.sprite.position.y+50) &&
            fishFood.y > (anemone.sprite.position.y-50)) {
              // set timeToFeedAnemone to false for this turn
              fishName.timeToFeedAnemone = false;
              // food no longer in fishs' mouth
              fishName.foodInMouth = false;
              // remove food from fishFoods array
              fishFoods.splice(i, 1);
              // decide if on next turn, fish needs to feed anemone
              fishName.decideIfTimeToFeedAnemone();

              console.log(`fishFoods.length = ` +fishFoods.length);
              // return;
        }
      }
      // else let fish food move and change current with arrow keys
      else {
        fishFood.move();
        fishFood.changeCurrent(); // let user change current with arrow keys
      }




      // If food item has not been consumed and goes off screen, remove food item from fishFoods array
      if ((fishName.overlapsWithFood(fishFood) && !fishName.timeToFeedAnemone) || fishFood.offScreen()) {
        fishFoods.splice(i, 1);
        console.log(`fishFoods.length = ` +fishFoods.length);
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
  // Draw all sprites
  drawSprites();

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
