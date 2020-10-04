/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let circle ={
  x:0,
  y:250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 2,
}

let state = `title`; // Possible states are: title, animation, ending


// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500, 500);
  circle.vx = circle.speed;
  textSize(32);
  textAlign(CENTER,CENTER);
}

function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `animation`) {
    animation();
  }
  else if (state === `ending`) {
    ending();
  }
}

function title(){
  // Title
  fill(255);
  text(`Life.`, width/2, height/2);
}

function animation(){
  // Animation
  circle.x += circle.vx;
  circle.y += circle.vy;

  ellipse(circle.x, circle.y, circle.size);
  circleIsOffScreen();
}

function ending(){
  // Ending
  fill(127);
  text(`It's all over.`, width/2, height/2);
}

function keyPressed() {
  if (state === `title`) {
  state = `animation`;
  }
}

function circleIsOffScreen() {
  if (circle.x > width) {
    state = `ending`;
  }
}
