/**************************************************
Exercise 4: The Age of Aquariums
Sharon Ku

Underwater treasure hunt

The piranhas (red circles) of different sizes and speeds chase after the user circle whose movement is controlled by arrow keys. If the piranha touches the user circle, then the eatenEnd state occurs (text displaying in the middle of screen that says you have been eaten). If the user circle succeeds in dodging the piranhas for a certain amount of seconds, then a golden clam (golden circle) appears at a random location. If the user snatches it, then it cues the treasureEnd state (text displaying in the middle of the screen saying that you found the treasure).
**************************************************/

"use strict"; // because strict is good

// states
let state = `animation`; // other possible states: eatenEnd, treasureEnd

// user circle
let user = {
  x: 0,
  y: 0,
  fill: 255,
  size: 25,
  vx: 0,
  vy: 0,
  speed: 5.5,
  eaten: false,
};

// school of fish
let school = [];
let schoolSize = 7;

// text for ending1: eatenEnd
let eatenText = {
  sentence: `The piranha ate you,
  along with your dreams of finding the underwater treasure.`,
  size: 25,
  fill: 255,
};

// text for ending2: treasureEnd
let treasureFoundText = {
  sentence: `Congratulations!
  You found the golden clam!
  The pinranhas bow down to you,
  parting a path so you can return home safely.`,
  size: 25,
  fill: 255,
};

// golden clam that appears after a certain number of seconds passes
let goldenClam = {
  framesElapsed: 0,
  framesToAppear: 1800,
  x: 50,
  y: 50,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 7,
  fill: { // golden
    r: 247,
    g: 214,
    b: 0,
  },
};

// fish's color
let fishFill = { // light red
  r: 200,
  g: 100,
  b: 100,
};

// The area in which the fish can appear
let fishAccessibleZone =  {
  horizontal: 100,
  vertical: 100,
}

// setup()
//
// Create canvas, remove strokes from all shapes, and creates initial fishes to school array
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Creating the initial school array (filling it with fishes)
  for (let i = 0; i < schoolSize; i++) {
    // Create a fish at a random location

    // Determining the margin of the canvas in which the fish can appear
    fishAccessibleZone.horizontal = width/2;
    fishAccessibleZone.vertical = height/2;

    // Determining x position of fish (it can appear anywhere on the screen except the middle area, where the user circle will initially appear)
    let x;

    let leftOrRight = random();
    if (leftOrRight < 0.5) {
      x = random(0,fishAccessibleZone.horizontal);
    }
    else {
      x = random(width-fishAccessibleZone.horizontal, width);
    }

    // Determining y position of fish (anywhere on screen except middle area)
    let y;

    let topOrBottom = random();
    if (topOrBottom < 0.5) {
      y = random(0,fishAccessibleZone.vertical);
    }
    else {
      y = random(height-fishAccessibleZone.vertical, height);
    }
    // Create fish at (x,y) location
    let fish = createFish(x, y);

    // Add the fish to school array
    school.push(fish);
  }

  // Setting the user circle's initial position in middle of the screen
  user.x = width/2;
  user.y = height/2;

  // Setting the goldenClam's initial position to a random location
  goldenClam.x = random(0, width);
  goldenClam.y = random(0, height);

}

// createFish(x,y)
// Creates a new JavaScript Object describing a fish and returns it
function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    minSize: 30,
    maxSize: 150,
    size: 0,
    vx: 0,
    vy: 0,
    speed: 2,
    minSpeed: 1.5,
    maxSpeed: 3.5,
  };

  // The fish's size is random and ranges between the minimum size and maximum size
  fish.size = random(fish.minSize, fish.maxSize);
  // The fish's speed is mapped to its size; so the smaller it is, the faster it swims!
  fish.speed = map(fish.size, fish.maxSize, fish.minSize, fish.minSpeed, fish.maxSpeed);

  return fish;
}

// draw()
//
// Set the background color and link animation, eatenEnd states to its functions
function draw() {
  background(0);

 if (state === `animation`) {
   animation();
 }
 else if (state === `eatenEnd`) {
   eatenEnd();
 }
 else if (state === `treasureEnd`) {
   treasureEnd();
 }
}

// animation()
// The user circle moves across the screen (controlled by arrow keys) while the fishes chase after it.
function animation() {
  for (let i = 0; i < school.length; i++) {
    // fish chases after user circle
    moveFish(school[i]);
    // check if fish touches/eats user circle
    checkUserEaten(school[i]);
    // display the fish
    displayFish(school[i]);
    // if user circle has been eaten, switch to eatenEnd state
    cueEatenEnd(school[i]);
  }

    // Display and move user circle with arrow keys
    moveUser();
    displayUser();

    // Display golden clam after a certain amount of seconds
    treasureAppears();
}

// moveFish()
// fish follows the user circle's position
function moveFish(fish) {
  let chance = random(0,1);

  // setting probability of 50% for fish to change directions to reduce its "shakiness"
  if (chance < 0.5) {

    if (fish.x < user.x) {
      fish.vx = fish.speed;
    }
    else if (fish.x > user.x) {
      fish.vx = random(-fish.speed,0);
    }
    else {
      fish.vx = 0;
    }

    if (fish.y < user.y) {
      fish.vy = fish.speed;
    }
    else if (fish.y > user.y) {
      fish.vy = -fish.speed;
    }
    else {
      fish.vy = 0;
    }
  }

  fish.x += fish.vx;
  fish.y += fish.vy;

  // constraining the fish to the inside of the canvas
  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}

// checkUserEaten()
// Checks if user touched/has been eaten by the fish
function checkUserEaten(fish) {
  let d = dist(user.x, user.y, fish.x, fish.y);
  if (d < (user.size/2 + fish.size/2)) {
    user.eaten = true;
  }
  else {
    user.eaten = false;
  }
}

// displayFish()
// Display the fish as a circle
function displayFish(fish) {
  push();
  fill(fishFill.r,fishFill.g,fishFill.b);
  ellipse(fish.x,fish.y,fish.size);
  pop();
}

// moveUser()
// Move the user circle using the arrow keys
function moveUser() {
  // left and right arrow keys control user's horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    user.vx = -user.speed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    user.vx = user.speed;
  }
  else {
    user.vx = 0;
  }

  // up and down arrow keys control user's vertical movement
  if (keyIsDown(UP_ARROW)) {
    user.vy = -user.speed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    user.vy = user.speed;
  }
  else {
    user.vy = 0;
  }

  user.x += user.vx;
  user.y += user.vy;

  // constrain user circle to inside of canvas
  user.x = constrain(user.x,0,width);
  user.y = constrain(user.y,0,height);
}

// displayUser()
// Displays the user circle
function displayUser() {
  push();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

// treasureAppears()
// Displays golden clam after a certain amount of seconds have elapsed. The clam moves around randomly. If user catches it, it triggers ending2: treasureEnd
function treasureAppears() {
  // Count how many frames have passed
  goldenClam.framesElapsed++;
  // After a certain amount of frames have passed, make the image appear
  if (goldenClam.framesElapsed >= goldenClam.framesToAppear) {
    // display and move the golden clam
    displayGoldenClam();
    moveGoldenClam();

    // if user catches/touches the golden clam, cue treasureEnd state
    let distBtwClamAndUser = dist(user.x, user.y, goldenClam.x, goldenClam.y);

    if (distBtwClamAndUser < (user.size/2 + goldenClam.size/2)) {
      state = `treasureEnd`;
    }
  }
}

// displayGoldenClam()
// display the golden clam circle
function displayGoldenClam() {
  push();
  fill(goldenClam.fill.r, goldenClam.fill.g, goldenClam.fill.b);
  ellipse(goldenClam.x, goldenClam.y, goldenClam.size);
  pop();
}

// moveGoldenClam()
// golden clam moves randomly across the canvas
function moveGoldenClam() {
  let chance = random(0,1);

  // setting probability for goldenclam to change directions to reduce its "shakiness"
  if (chance < 0.05) {
      goldenClam.vx = random(-goldenClam.speed, goldenClam.speed);
      goldenClam.vy = random(-goldenClam.speed, goldenClam.speed);
    }

  goldenClam.x += goldenClam.vx;
  goldenClam.y += goldenClam.vy;

  // constraining the goldenClam to the inside of the canvas
  goldenClam.x = constrain(goldenClam.x, 0, width);
  goldenClam.y = constrain(goldenClam.y, 0, height);
}

// cueEatenEnd()
// If the fish touches the user, cue eatenEnd state
function cueEatenEnd(fish) {
  if (user.eaten) {
    state = `eatenEnd`;
  }
}

// eatenEnd()
// State: displays text (The piranha ate you, along with your dreams of finding the underwater trasure) in the middle of the screen
function eatenEnd() {
  displayText(eatenText);
  console.log(eatenText.sentence);
}

// displayText()
// displays sentence in the middle of the canvas
function displayText(insertText) {
  push();
  fill(insertText.fill);
  textSize(insertText.size);
  textAlign(CENTER);
  text(insertText.sentence, width/2, height/2);
  pop();
}

// treasureEnd()
// State: displays "congratulations" in the middle of teh screen after user captured the golden clam
function treasureEnd() {
  displayText(treasureFoundText);
  console.log(treasureFoundText.sentence);
}
