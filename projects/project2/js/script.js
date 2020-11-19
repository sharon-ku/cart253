/**************************************************
Project 2: Hungry Fishies
Sharon Ku

-Intro state & Instructions state:
The title "Hungry Fishies" is displayed with a firefish swimming around the tank. Once the user clicks the "Start" button, the instructions are shown (instructions state). When the user clicks "Ready!", the animation state starts.
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
let fishFoods = []; // fishFoods array that contains food objects
let numFishFoods = 5; // number of fish food in the tank at once
let totalFood = 2; // total amount of food that fish needs to consume //originally: 15

// Font that will be used for body text
let bodyTextFont = undefined;

// Title text
let title;
let titleFont;

// Start button circle and text inside it
let startButtonCircle;
let startButtonText;

// Food tracker
let foodTrackers = [];

// Fishes
let fishes = [];

// Firefish
let firefish;
// Stores firefish images
let firefishImg1;
let firefishImg2;
// Stores image for firefish food tracker
let firefishFoodTrackerImg;

// Goby
let goby;
// Stores goby images
let gobyImg1;
let gobyImg2;
// Stores image for goby food tracker
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

// Fishtank
let fishtank = {
  border: 100,
};

// Rules
let rules;
// stores rules image into this variable
let rulesImg;
// rounded rectangle behind the rules image
let rulesRect;

// Ready button circle and text inside it
let readyButtonCircle;
let readyButtonText;

// Variables pertaining to end poem
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
function preload() {
  // Load firefish images
  firefishImg1 = loadImage(`assets/images/firefish1.png`);
  firefishImg2 = loadImage(`assets/images/firefish2.png`);
  // Load firefish food tracker image
  firefishFoodTrackerImg = loadImage(`assets/images/firefishFoodTracker.png`);

  // Load goby images
  gobyImg1 = loadImage(`assets/images/goby1.png`);
  gobyImg2 = loadImage(`assets/images/goby2.png`);
  // Load goby food tracker image
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
// Set up canvas, hide cursor, create arrays for fishFoods and poemLines
function setup() {
  createCanvas(1300, 800);
  noCursor();
  noStroke();

  // Create a new finger
  finger = new Finger();

  // Create a new firefish
  firefish = new Firefish(firefishImg1, firefishImg2, firefishFoodTrackerImg);
  fishes.push(firefish);

  // Create a new goby
  goby = new Goby(gobyImg1, gobyImg2, gobyFoodTrackerImg);
  fishes.push(goby);

  // Create a new title
  title = new Title();


  // Setting x and y positions for start button
  let startButtonX = width * 1 / 5;
  let startButtonY = height * 4 / 5;
  // Create a new start button + text inside start button
  startButtonCircle = new StartButtonCircle(startButtonX, startButtonY);
  startButtonText = new StartButtonText(startButtonX, startButtonY, bodyTextFont);

  // Setting x and y positions for ready button
  let readyButtonX = 1150;
  let readyButtonY = 640;
  // Create a new ready button + text inside ready button
  readyButtonCircle = new ReadyButtonCircle(readyButtonX, readyButtonY);
  readyButtonText = new ReadyButtonText(readyButtonX, readyButtonY, bodyTextFont);

  // Create a new rules image and place a rectangle behind the image
  rulesRect = new RulesRect();
  rules = new Rules(rulesImg);

  // Create array for fishFoods
  for (let i = 0; i < numFishFoods; i++) {
    fishFoods[i] = new FishFood(fishtank.border);
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
  let poemLineX = width/2;
  let poemLineY = yLocationOfFirstLine;
  poem = new Poem(bodyTextFont, poemLineX, poemLineY);

  // Create array for poop (for end state)
  for (let i = 0; i < totalNumPoops; i++) {
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
  } else if (state === `instructions`) {
    instructions();
  } else if (state === `animation`) {
    animation();
  } else if (state === `ending`) {
    ending();
  }

  // console.log(`firefish ${firefish.numFoodEaten}`);
  console.log(`goby ${goby.numFoodEaten}`);
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
  image(bg.sand.img, width / 2, height - bg.sand.height / 2, bg.sand.length, bg.sand.height);
  image(bg.rocks.img, width / 2, height * 2 / 3, bg.rocks.length, bg.rocks.height);
  pop();
}

// intro() -----------------------------------------------------------------------
//
// Intro state: Display title, start button, finger, and fish
function intro() {
  // Display the title
  title.display(titleFont);

  // Create a "start" button that is displayed, has a hover behavior (size changes when hovering over it), and that moves randomly
  // Button is made up of a shape and a text inside it
  generateButton(startButtonCircle, startButtonText);

  // Display fishes casually swimming
  for (let i=0; i<fishes.length; i++) {
    let fish = fishes[i];
    fish.casualSwimming(fishtank);
    displayAnimatedFish(fish);
    // Constrain fish's movement to the inside of the tank
    stayInTank(fish);
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
  subject.x = constrain(subject.x, fishtank.border, width - fishtank.border);
  subject.y = constrain(subject.y, fishtank.border, height - fishtank.border);
}

// instructions() ----------------------------------------------------------------------
//
// Instructions state: display rules on the canvas (with fish, MoreFood button, and food tracker in background). Player starts the animation by clicking "Ready!" button
function instructions() {
  // Display More Food Button
  moreFoodButton.display();
  // Display the food tracker
  for (let i=0; i<foodTrackers.length; i++) {
    let foodTracker = foodTrackers[i];
    foodTracker.display();
  }

  // Display animated fishes casually swimming
  for (let i = 0; i<fishes.length; i++) {
    let fish = fishes[i];
    fish.casualSwimming(fishtank);
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
  if (mouseX < buttonName.x + (buttonName.size / 2) && mouseX > buttonName.x - (buttonName.size / 2)) {
    if (mouseY < buttonName.y + (buttonName.size / 2) && mouseY > buttonName.y - (buttonName.size / 2)) {
      return true;
    }
  } else {
    return false;
  }
}

// animation() -----------------------------------------------------------------------
//
// Animation state: Finger, firefish, food tracker, and MoreFoodButton are displayed. Finger moves with mouse. Firefish moves randomly (Perlin noise) until it spots the finger and follows it. If the fish is close enough to food, it will eat it and the tracker updates.
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

  for (let i=0; i<fishes.length; i++) {
    let fish = fishes[i];
    // Release fish food if the More Food Button is clicked and it is active
    releaseFishFood(fish);

    // Fish follows finger if the fish senses the finger, or else it swims casually around the tank.
    if (fish.sensesFinger(finger)) {
      fish.followsFinger(finger);
    } else {
      fish.casualSwimming(fishtank);
    }

    // Display animated fish
    displayAnimatedFish(fish);
  }

  // Display food trackers and update food tracker bar every time fish eats scrumptious food
  for (let i=0; i<foodTrackers.length; i++) {
    for (let i=0; i<fishes.length; i++) {
      let fish = fishes[i];
      let foodTracker = foodTrackers[i];
      foodTracker.updateBar(fish, totalFood);
      foodTracker.display();
    }
  }


  // Display and move finger
  moveAndDisplayFinger();

  // Cue ending if firefish has eaten the total number of food
  fishIsFull(firefish);
}

// Display and move pieces of food
function releaseFishFood(fishName) {
  if (moreFoodButton.showFood) {
    for (let i = fishFoods.length - 1; i >= 0; i--) {
      fishFoods[i].move();
      fishFoods[i].changeCurrent(); // let user change current with arrow keys
      fishFoods[i].show();

      // If fish eats food, add numFoodEaten counter
      if (fishFoods[i].foodEaten(fishName)) {
        fishName.numFoodEaten++;
      }

      // Everytime a food goes off screen, remove food item from fishFoods array
      if (fishFoods[i].foodEaten(fishName) || fishFoods[i].offScreen()) {
        fishFoods.splice(i, 1);
      }
    }
  }
}

// Cue ending if fish has eaten the total number of food
function fishIsFull(fishName) {
  if (fishName.numFoodEaten === totalFood) {
    state = `ending`;
  }
}

// ending() -----------------------------------------------------------------------
//
// Ending state: Display end poem. Night filter slowly appears and gives the tank an ominous feeling. Fishes poop.
function ending() {
  // Make fishes poop and display fishes casually swimming
  for (let i=0; i<fishes.length; i++) {
    let fish = fishes[i];
    pooping(fish);

    fish.casualSwimming(fishtank);
    displayAnimatedFish(fish);
  }

  // Displays filter that plunges tank into darkness
  nightFilter.display();

  // Display end poem
  poem.display();

  // Display and move finger based on user's mouse position
  moveAndDisplayFinger();
}

// Display, move, and release poopline behind fish
function pooping(fishName) {
  // Determine the location of fish's cloaca (where poop comes out)
  fishName.determineCloacaLocation();
  // Display and move poop
  displayAndMovePoop(fishName);
  // Release a line of poop
  releasePoopLine(fishName);
  // Remove poop when there are too many to handle
  removePoop();
}

// Display and move poop; the poop comes out of the fish's cloaca
function displayAndMovePoop(fishName) {
  for (let i = poops.length - 1; i >= 0; i--) {
    poops[i].show(fishName.cloacaX, fishName.cloacaY);
    poops[i].move();
  }
}

// Release a line of poop by adding more poop pebbles to the poops array
function releasePoopLine(fishName) {
  let addPoop = new Poop(fishName.cloacaX, fishName.cloacaY);
  poops.push(addPoop);
}

// To ensure that poop does not get too long, remove first poop from array after a certain amount of poop pebbles have been released
function removePoop() {
  if (poops.length > totalNumPoops) {
    poops.shift();
  }
}
