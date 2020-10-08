/**************************************************
Activity 5: Looking for love
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

let state = `title`; //Possible states are: title, animation, loveTriumph, deepSadness

let bg = {
  r: 0,
  g: 0,
  b: 0,
  rSad: 81,
  gSad: 26,
  bSad: 168,
};

// VARIABLES FOR THE INTRO -------------------------------------------------------------
// title text
let titleText = `lookingForLove`;
let titleFont;

// start
let start = {
  text: `START`,
  font: `Arial`,
  x: 100,
  y: 100,
  size: 35,
  sizeBigger: 40,
  sizeSmaller: 35,
  // horAlign: `CENTER`,
  // verAlign: `CENTER`,
  fill: {
    r: 0,
    g: 0,
    b: 0,
  }
};

// start button
let startButton = {
  size: 200,
  sizeBigger: 250,
  sizeSmaller: 200,
  x: 100,
  y: 100,
  fill: {
    r: 255, // light pink
    g: 205,
    b: 255,
    rHover: 10, // vivid sky blue
    gHover: 205,
    bHover: 255,
  }
};

// VARIABLES FOR THE ANIMATION -------------------------------------------------------------
let circle1 = {
  size: 100,
  x: 200,
  y: 200,
  vx: 0,
  vy: 0,
  speed: 8,
  tx: 0,
  ty: 10,
  txChange: 0.025,
  tyChange: 0.025,
  fill: {
    r: 213, // flashy purple
    g: 77,
    b: 247,
    rLove: 180, // lavender floral
    gLove: 139,
    bLove: 231,
    changeSpeed: 2,
  }
};

let circle2 = {
  size: 100,
  x: 500,
  y: 500,
  vx: 0,
  vy: 0,
  speed: 8,
  tx: 10,
  ty: 30,
  txChange: 0.015,
  tyChange: 0.015,
  fill: {
    r: 28, //sea green crayola
    g: 234,
    b: 182,
    rLove: 255, // baker miller pink
    gLove: 148,
    bLove: 180,
    changeSpeed: 2,
  }
};



// loading font
function preload(){
  titleFont = loadFont(`assets/fonts/CinzelDecorative-Bold.ttf`);
}



// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Initial position for circle 1
  circle1.x = windowWidth/2;
  circle1.y = windowHeight/2;

  // Initial position for circle 2
  circle2.x = windowWidth * 2/3;
  circle2.y = windowHeight * 2/3;
}

// draw()
//
// Description of draw() goes here.
function draw() {

  background(bg.r, bg.g, bg.b);

  if (state === `title`) {
    title();
  }

  if (state === `animation`) {
    animation();
  }

  if (state === `loveTriumph`) {
    loveTriumph();
  }

  if (state === `deepSadness`) {
    deepSadness();
  }
}

function title() {
  displayTitle(); // Display "Looking for Love"
  displayStartButton(); // Drawing the start button
  displayStart(); // Drawing the start text
  hoverOnStartButton(); // Start button and Start text enlarge if mouse's position is on start button
}

function animation(){
  // Displays and moves 2 circles
  moveCircle1(circle1.txChange, circle1.tyChange, circle1.vx, circle1.vy, circle1.speed);
  displayCircle(circle1.fill.r, circle1.fill.g, circle1.fill.b, circle1.x, circle1.y, circle1.size);

  moveCircle2(circle2.txChange, circle2.tyChange, circle2.vx, circle2.vy, circle2.speed);
  displayCircle(circle2.fill.r, circle2.fill.g, circle2.fill.b, circle2.x, circle2.y, circle2.size);

  // Cue loveTriumph if circles touch
  if (circlesTouch()) {
    state = `loveTriumph`;
  }

  // Cue deepSadness if either circle goes off canvas
  if (circleGoesOffCanvas()) {
    state = `deepSadness`;
  }
}

function loveTriumph() {
  // display circle 1 with different fill color
  if (circle1.fill.r < circle1.fill.rLove) {
    circle1.fill.r += circle1.fill.changeSpeed;
    circle1.fill.r = constrain(circle1.fill.r, 0, circle1.fill.rLove);
  }
  else {
    circle1.fill.r -= circle1.fill.changeSpeed;
    circle1.fill.r = constrain(circle1.fill.r, circle1.fill.rLove, 255);
  }
  if (circle1.fill.g < circle1.fill.gLove) {
    circle1.fill.g += circle1.fill.changeSpeed;
    circle1.fill.g = constrain(circle1.fill.g, 0, circle1.fill.gLove);
  }
  else {
    circle1.fill.g -= circle1.fill.changeSpeed;
    circle1.fill.g = constrain(circle1.fill.g, circle1.fill.gLove, 255);
  }

  displayCircle(circle1.fill.r, circle1.fill.gLove, circle1.fill.bLove, circle1.x, circle1.y, circle1.size);

  //display circle 2 with different fill color

  displayCircle(circle2.fill.rLove, circle2.fill.gLove, circle2.fill.bLove, circle2.x, circle2.y, circle2.size);
}

function deepSadness() {
  background(bg.rSad, bg.gSad, bg.bSad);


}

// FUNCTIONS -----------------------------------------------------------------------------

// Behavior of Start button and Start text when mouse hovers over button
function hoverOnStartButton() {
  if (mouseIsInStartButton()) {
    push();
    // Start button enlarges and changes color
    startButton.size = startButton.sizeBigger;
    fill(startButton.fill.rHover, startButton.fill.gHover, startButton.fill.bHover);
    ellipse(startButton.x, startButton.y, startButton.size);

    // Start text enlarges
    start.size = start.sizeBigger;
    fill(start.fill.r, start.fill.g, start.fill.b);
    textAlign(CENTER, CENTER);
    textSize(start.size);
    textFont(start.font);
    text(start.text, start.x, start.y);
    pop();
  }
  else {
    // Start button and text look the same as before
    startButton.size = startButton.sizeSmaller;
    start.size = start.sizeSmaller;
  }
}

// If user clicks on Start button, cue `animation` state
function mouseClicked() {
  if (mouseIsInStartButton()) {
    startButton.fill.r = 70;
    state = `animation`;
  }
}

// Checks if mouse's position is inside the start button
function mouseIsInStartButton() {
  if (mouseX < startButton.x+(startButton.size/2) && mouseX > startButton.x-(startButton.size/2)) {
    if (mouseY < startButton.y+(startButton.size/2) && mouseY > startButton.y-(startButton.size/2)) {
      return true;
    }
  }
  else{
    return false;
  }
}

// Display title "Looking for Love"
function displayTitle() {
  push();
  fill(255);
  textSize(windowHeight/7);
  textAlign(CENTER,CENTER);

  textFont(titleFont);
  text(`Looking`, windowWidth/3, windowHeight/3);
  text(`for`, windowWidth/2, windowHeight/2);
  text(`Love`, windowWidth*2/3, windowHeight*2/3);
  pop();
}

// Display the circular Start button
function displayStartButton() {
  push();
  startButton.x = start.x;
  startButton.y = start.y;

  fill(startButton.fill.r, startButton.fill.g, startButton.fill.b);
  ellipse(startButton.x, startButton.y, startButton.size);
  pop();
}

// Display the Start text
function displayStart() {
  push();
  fill(start.fill.r, start.fill.g, start.fill.b);
  textSize(start.size);
  textAlign(CENTER, CENTER);

  start.x = windowWidth*1/5;
  start.y = windowHeight*4/5;

  textFont(start.font);
  text(start.text, start.x, start.y);
  pop();
}

// Display a circle
function displayCircle(fillR, fillG, fillB, x, y, size) {
  push();
  fill(fillR, fillG, fillB);
  ellipse(x, y, size);
  pop();
}

// Circle1 moves randomly across the canvas (Perlin noise)
function moveCircle1(txChange, tyChange, vx, vy, speed){
  circle1.tx += txChange;
  circle1.ty += tyChange;

  let noiseX = noise(circle1.tx);
  let noiseY = noise(circle1.ty);

  vx = map(noiseX, 0, 1, -speed, speed);
  vy = map(noiseY, 0, 1, -speed, speed);

  circle1.x += vx;
  circle1.y += vy;
}

// Circle2 moves randomly across the canvas (Perlin noise)
function moveCircle2(txChange, tyChange, vx, vy, speed){
  circle2.tx += txChange;
  circle2.ty += tyChange;

  let noiseX = noise(circle2.tx);
  let noiseY = noise(circle2.ty);

  vx = map(noiseX, 0, 1, -speed, speed);
  vy = map(noiseY, 0, 1, -speed, speed);

  circle2.x += vx;
  circle2.y += vy;
}

// Check if circle goes off canvas
function circleGoesOffCanvas() {
  if (circle1.x < 0 || circle1.x > width || circle1.y < 0 || circle1.y > height || circle2.x < 0 || circle2.x > width || circle2.y < 0 || circle2.y > height) {
    return true;
  }
  else {
    return false;
  }
}

// Check if circles touch
function circlesTouch(){
  // Calculate distance between circles
  let distBtwCircles = dist(circle1.x, circle1.y, circle2.x, circle2.y);

  // Return true if circles touch
  if (distBtwCircles < (circle1.size/2) + (circle2.size/2)) {
    return true;
  }
  else{
    return false;
  }
}
