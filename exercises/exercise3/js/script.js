/**************************************************
Exercise 3: Love, actually
Sharon Ku

The introduction shows the title "Looking for Love" with a start button, which when clicked, leads to the animation. In the animation, the user controls a circle while a second circle (circle 2) moves around randomly. There is a textbox at the bottom for the narrator.

3 scenarios might happen during the simulation:
1) When the user circle touches circle 2, it leads to loveTriumph, and the background turns pink with the narrator reminding them that they are happy.
2) When circle 2 goes off the canvas, the background turns a depressing color and the narrator tells the user that circle 2 is gone.
3) When the user circle hits a specific area on the canvas, circle 2 meets a new lover and forgets about the user circle (this is what the narrator says).

**************************************************/

let state = `title`; //Possible states are: title, animation, loveTriumph, deepSadness, secretLover

// background colors
let bg = {
  // black
  r: 0,
  g: 0,
  b: 0,
  // royal purple
  rSad: 105,
  gSad: 70,
  bSad: 147,
  // cotton candy pink
  rLove: 255,
  gLove: 195,
  bLove: 223,
};

// title text
let titleText = `lookingForLove`;
let titleFont; // CinzelDecorative-Bold
let titleFill = 255;

// start text
let start = {
  text: `START`,
  font: `Arial`,
  x: 100,
  y: 100,
  size: 35,
  sizeBigger: 40,
  sizeSmaller: 35,
  fill: {
    r: 0,
    g: 0,
    b: 0,
  },
};

// start button
let startButton = {
  size: 200,
  sizeBigger: 250,
  sizeSmaller: 200,
  x: 100,
  y: 100,
  fill: {
    // light pink
    r: 255,
    g: 205,
    b: 255,
    // vivid sky blue
    rHover: 10,
    gHover: 205,
    bHover: 255,
  },
};

// user circle
let circle1 = {
  size: 100,
  x: 200,
  y: 200,
  fill: {
    // flashy purple
    r: 213,
    g: 77,
    b: 247,
    // lavender floral
    rLove: 180,
    gLove: 139,
    bLove: 231,
    changeSpeed: 2,
  },
  triggerSecretLover: {
    x: 200,
    y: 100,
  },
  triggerDist: 50,
};

// circle that user circle has a crush on
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
    //sea green crayola
    r: 28,
    g: 234,
    b: 182,
  },
};

// extra circle for easter egg
let secretCircle = {
  size: 100,
  x: 500,
  y: 500,
  fill: {
    //coral orange
    r: 255,
    g: 131,
    b: 87,
  },
};

let textBox = {
  length: 700,
  height: 100,
  x: 100,
  y: 100,
  cornerRadius: 10,
  distToBottom: 200,
  fill: {
    r: 255,
    g: 255,
    b: 255,
    alpha: 200,
  },
  stroke: {
    r: 0,
    g: 0,
    b: 0,
  },
};

let narrator = {
  text: {
    animation: `Is it meant to be?`,
    loveTriumph: `It's love at first sight! The two of you end up being the happiest circles in the world.`,
    deepSadness: `Your crush decided to move to a foreign country to get away from you. Guess you'll have to find someone else.`,
    secretLover: `Oh no! Looks like Circly had its eyes set on someone else! What a shame; the other circle has nicer curves than you. You will enroll yourself in a gym to improve your curvature.`,
  },
  font: `Arial`,
  x: 100,
  y: 100,
  size: 20,
  padding: 30,
  fill: {
    r: 0,
    g: 0,
    b: 0,
  },
};


// preload() ********************************************************************
//
// Loads font for title
function preload(){
  titleFont = loadFont(`assets/fonts/CinzelDecorative-Bold.ttf`);
}


// setup() ********************************************************************
//
// Sets up canvas, removes strokes, sets initial position for circle 1 and 2
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Initial position for circle 1
  circle1.x = width/2;
  circle1.y = height/2;

  // Initial position for circle 2
  circle2.x = width * 2/3;
  circle2.y = height * 2/3;
}



// draw() ********************************************************************
//
// Set up initial background color, link states to state functions
function draw() {
  background(bg.r, bg.g, bg.b);

  if (state === `title`) {
    title();
  }
  else if (state === `animation`) {
    animation();
  }
  else if (state === `loveTriumph`) {
    loveTriumph();
  }
  else if (state === `deepSadness`) {
    deepSadness();
  }
  else if (state === `secretLover`) {
    secretLover();
  }
}


// Functions for states ****************************************************************
//
// Display title and Start button which changes size + color when mouse hovers over it
function title() {
  displayTitle(); // Display "Looking for Love"
  displayStartButton(); // Drawing the start button
  displayStart(); // Drawing the start text
  hoverOnStartButton(); // Start button and Start text enlarge if mouse's position is on start button
}

// Circle 1 follows mouse, while circle 2 moves randomly. 3 possible scenarios can occur depending on how the circles interact: loveTriumph, deepSadness, and secretLover. Narrator text is displayed in textbox.
function animation(){
  // Display narrator text inside a textbox
  narratorSays(narrator.text.animation);

  // Display circle 1 and have it follow the mouse's position
  circle1.x = mouseX;
  circle1.y = mouseY;
  displayCircle(circle1.fill.r, circle1.fill.g, circle1.fill.b, circle1.x, circle1.y, circle1.size);

  // Display circle 2 and have it move randomly using Perlin noise
  moveCircle2(circle2.txChange, circle2.tyChange, circle2.vx, circle2.vy, circle2.speed);
  displayCircle(circle2.fill.r, circle2.fill.g, circle2.fill.b, circle2.x, circle2.y, circle2.size);

  // Cue loveTriumph if circles touch
  if (circlesTouch()) {
    state = `loveTriumph`;
  }

  // Cue deepSadness if circle 2 goes off canvas
  if (circleGoesOffCanvas()) {
    state = `deepSadness`;
  }

  // Cue secretLover if mouse hits specific location on canvas
  if (dist(mouseX, mouseY, circle1.triggerSecretLover.x, circle1.triggerSecretLover.y) < circle1.triggerDist) {
    state = `secretLover`;
  }
}

// Changes background and narrator text. Displays both circles in their last position from animation state.
function loveTriumph() {
  // Change background to love color
  background(bg.rLove, bg.gLove, bg.bLove);

  // Display circle 1
  displayCircle(circle1.fill.r, circle1.fill.g, circle1.fill.b, circle1.x, circle1.y, circle1.size);

  // Display circle 2
  displayCircle(circle2.fill.r, circle2.fill.g, circle2.fill.b, circle2.x, circle2.y, circle2.size);

  // Display narrator text inside a textbox
  narratorSays(narrator.text.loveTriumph);
}

// Changes background and narrator text. Displays both circles in their last position from animation state.
function deepSadness() {
  // Change background to depressing color
  background(bg.rSad, bg.gSad, bg.bSad);

  // Display circle 1
  displayCircle(circle1.fill.r, circle1.fill.g, circle1.fill.b, circle1.x, circle1.y, circle1.size);

  // Display circle 2
  displayCircle(circle2.fill.r, circle2.fill.g, circle2.fill.b, circle2.x, circle2.y, circle2.size);

  // Display narrator text inside a textbox
  narratorSays(narrator.text.deepSadness);
}

// Changes background and narrator text. Displays both circles in their last position from animation state. New secretCircle pops up next to circle 2.
function secretLover() {
  // Change background to depressing color
  background(bg.rSad, bg.gSad, bg.bSad);

  // Display circle1
  displayCircle(circle1.fill.r, circle1.fill.g, circle1.fill.b, circle1.x, circle1.y, circle1.size);

  // Display circle2
  displayCircle(circle2.fill.r, circle2.fill.g, circle2.fill.b, circle2.x, circle2.y, circle2.size);

  // Display secretCircle
  secretCircle.x = circle2.x + secretCircle.size/2;
  secretCircle.y = circle2.y + secretCircle.size/2;

  displayCircle(secretCircle.fill.r, secretCircle.fill.g, secretCircle.fill.b, secretCircle.x, secretCircle.y, secretCircle.size);

  // Display narrator text inside a textbox
  narratorSays(narrator.text.secretLover);
}

// OTHER FUNCTIONS *******************************************************************
//
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
    // Start button and text keep size of initial setup
    startButton.size = startButton.sizeSmaller;
    start.size = start.sizeSmaller;
  }
}

// If user clicks on Start button, cue `animation` state
function mouseClicked() {
  if (mouseIsInStartButton()) {
    state = `animation`;
  }
}

// Checks if mouse's position is inside the Start button
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
  fill(titleFill);
  textSize(height/7);
  textAlign(CENTER,CENTER);

  textFont(titleFont);
  text(`Looking`, width/3, height/3);
  text(`for`, width/2, height/2);
  text(`Love`, width*2/3, height*2/3);
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

// Circle2 moves randomly across the canvas (Perlin noise)
function moveCircle2(txChange, tyChange, vx, vy, speed) {
  circle2.tx += txChange;
  circle2.ty += tyChange;

  let noiseX = noise(circle2.tx);
  let noiseY = noise(circle2.ty);

  vx = map(noiseX, 0, 1, -speed, speed);
  vy = map(noiseY, 0, 1, -speed, speed);

  circle2.x += vx;
  circle2.y += vy;
}

// Check if circle 2 goes off canvas
function circleGoesOffCanvas() {
  if (circle2.x < 0 || circle2.x > width || circle2.y < 0 || circle2.y > height) {
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

// Displays textbox and narrator text
function narratorSays(narratorSpeech) {
  // Display textBox
  push();
  textBox.x = width/2;
  textBox.y = height - textBox.distToBottom;
  fill(textBox.fill.r, textBox.fill.g, textBox.fill.b, textBox.fill.alpha);
  rectMode(CENTER,CENTER);
  rect(textBox.x, textBox.y, textBox.length, textBox.height, textBox.cornerRadius);
  pop();

  // Displays narrator speech
  push();
  narrator.x = textBox.x;
  narrator.y = textBox.y;

  rectMode(CENTER,CENTER);
  fill(narrator.fill.r, narrator.fill.g, narrator.fill.b);
  textSize(narrator.size);
  textAlign(CENTER,CENTER);
  textFont(narrator.font);
  text(narratorSpeech, narrator.x, narrator.y, textBox.length-narrator.padding, textBox.height-narrator.padding);
  pop();
}
