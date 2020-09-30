/**************************************************
Exercise 2: Dodge-em
Sharon Ku

COVID-19, represented by a red circle, will move from the left side of the canvas to the right at a random y position. As COVID-19 moves from left to right across the screen, it follows the user circle's vertical position. Each time it reaches the right side, it will reset to the left at a random y position. The user will control their own circle with the mouse position. The user circle follows the mouse with a velocity and acceleration though, so beware! The background changes colors based on the mouse's y position. If the COVID-19 circle touches the user circle, everything stops! In the background we see random static for visual flair and we don’t see the mouse cursor.
**************************************************/

// User circle
let user = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  speed: 0.01,
  ax: 0,
  ay: 0,
  acceleration: 0.06,
  size: 50,
  fill: {
    r: 250,
    g: 193,
    b: 114,
  },
};

// Scared face on user circle
let scaredFace = {
  x: 0,
  y: 0,
  image: undefined,
};

// Covid circle
let covid = {
  size: 100,
  x: 0,
  y: 250,
  vx: 0,
  vy: 0,
  speed: 3,
  fill: {
    r: 226,
    g: 91,
    b: 69,
  },
};

// Background colors
let bg = {
  r: 21,
  g: 76,
  b: 73,
  // russian green
  rMin: 21,
  gMin: 76,
  bMin: 73,
  // deep jungle green (aka darker than russian green)
  rMax: 81,
  gMax: 152,
  bMax: 114,
};

// Minimum x and y values
let xMin = 0;
let yMin = 0;

// preload()
//
// Loads the scaredFace Image
function preload() {
  scaredFace.image = loadImage("assets/images/scaredFace.png");
}

// setup()
//
// Setting up the canvas, removing all strokes, hiding cursor, assigning covid's x velocity
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  covid.vx = covid.speed;

  noCursor();
}

// draw()
//
// The background's color changes, a static effect is displayed, the COVID-19 circle moves across the screen, the user circle follows the mouse, and the scared face moves with the user circle. The program stops running if COVID-19 catches the user circle.
function draw() {
  // Background color changes based on mouse's y position
  bg.r = map(mouseY, width, yMin, bg.rMin, bg.rMax);
  bg.g = map(mouseY, width, yMin, bg.gMin, bg.gMax);
  bg.b = map(mouseY, width, yMin, bg.bMin, bg.bMax);

  background(bg.r, bg.g, bg.b);

  // Display static
  push();
  for (let i = 0; i < 100; i++) {
    let x = random(0, width);
    let y = random(0, height);
    stroke(505);
    point(x, y);
  }
  pop();

  // Covid 19 movement
  // x position: Goes from left to right of screen
  covid.x += covid.vx;
  // y position: Follows the user circle's vertical position
  if (covid.y < user.y) {
    covid.y += covid.vy;
    covid.vy = covid.speed;
  }
  else {
    covid.y += covid.vy;
    covid.vy = -covid.speed;
  }

  // Once covid reaches the right side of canvas, send covid back to left side of canvas at random y position
  if (covid.x > width) {
    covid.x = 0;
    covid.y = random(0, height);
  }

  // Display Covid 19
  push();
  fill(covid.fill.r, covid.fill.g, covid.fill.b);
  ellipse(covid.x, covid.y, covid.size);
  pop();

  // User circle movement: follows the mouse with velocity and acceleration
  user.x = constrain(user.x, xMin, width);
  user.y = constrain(user.y, yMin, height);

  if (user.x < mouseX) {
    user.x += user.vx;
    user.vx += user.ax;
    user.ax = user.acceleration;
  }
  else {
    user.x += user.vx;
    user.vx += user.ax;
    user.ax = -user.acceleration;
  }

  if (user.y < mouseY) {
    user.y += user.vy;
    user.vy += user.ay;
    user.ay = user.acceleration;
  }
  else {
    user.y += user.vy;
    user.vy += user.ay;
    user.ay = -user.acceleration;
  }

  // Scared face moves with user circle
  scaredFace.x = user.x;
  scaredFace.y = user.y;

  // Display user circle
  fill(user.fill.r, user.fill.g, user.fill.b);
  ellipse(user.x, user.y, user.size);

  // Display scared face on user circle
  imageMode(CENTER);
  image(scaredFace.image, scaredFace.x, scaredFace.y);

  // Check for catching Covid 19
  let d = dist(covid.x, covid.y, user.x, user.y);
  if (d < covid.size / 2 + user.size / 2) {
    noLoop();
  }
}
