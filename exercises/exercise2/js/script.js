/**************************************************
Exercise 2: Dodge-em
Sharon Ku

COVID-19, represented by a red circle, will move from the left side of the canvas to the right at a random y position. Each time it reaches the right side, it will reset to the left at a random y position. The user will control their own circle with the mouse position. If the COVID-19 circle touches the user circle, everything stops! In the background we see random static for visual flair and we don’t see the mouse cursor.
**************************************************/

// User circle
let user = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  acceleration: 0.06,
  speed: 3,
  size: 100,
  r: 0,
  g: 255,
  b: 0,
};

// Covid circle
let covid = {
  size: 100,
  x: 0,
  y: 250,
  vx: 0,
  vy: 0,
  speed: 5,
  fill:{
    r: 255,
    g: 0,
    b: 0,
  }
  // ax: 0,
  // acceleration: 0.0007,
};

let bg = {
  r: 0,
  g: 0,
  b: 0,
};

let xMin = 0;
let yMin = 0;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  covid.vx = covid.speed;

  // noCursor();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bg.r, bg.g, bg.b);

  // Display static
  push();
  for (let i = 0; i < 10; i++) {
    let x = random(0,width);
    let y = random(0,height);
    stroke(255);
    point(x,y);
  }
  pop();

  // Covid 19 movement
  covid.x += covid.vx;
  covid.y += covid.vy;

  if(covid.x > width) {
    covid.x = 0;
    covid.y = random(0, height);
  }

  // Display Covid 19
  push();
  fill(covid.fill.r, covid.fill.g, covid.fill.b);
  ellipse(covid.x, covid.y, covid.size);
  pop();

  // User circle movement
  user.x = constrain(user.x, xMin, width);
  user.y = constrain(user.y, yMin, height);

  if (user.x < mouseX){
    user.x += user.vx;
    user.vx += user.ax;
    user.ax = user.acceleration;
  }
  else{
    user.x += user.vx;
    user.vx += user.ax;
    user.ax = -user.acceleration;
  }

  console.log(user.x);

  if (user.y < mouseY){
    user.y += user.vy;
    user.vy += user.ay;
    user.ay = user.acceleration;
  }
  else{
    user.y += user.vy;
    user.vy += user.ay;
    user.ay = -user.acceleration;
  }

  // Display user circle
  fill(user.r, user.g, user.b);
  ellipse(user.x, user.y, user.size);

  // Check for catching Covid 19
  let d = dist(covid.x, covid.y, user.x, user.y);
  if (d < ((covid.size/2) + (user.size/2))){
  noLoop();
  }
}
