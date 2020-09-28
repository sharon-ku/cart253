/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/


let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 1,
  vy: 0,
  ax: 0,
  ay: 0,
  speed: 5,
  acceleration: 0.1,
  maxSpeed: 10,
};

let angle = 0;
let rectScale = 0;
// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500,500);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);


  push();
  fill(255,0,0);
  rectMode(CENTER);
  translate(width/2, height/2);
  rotate(angle);
  scale(rectScale);
  rect(0,0,100,100);
  pop();

  angle = angle + 0.01;
  rectScale = rectScale + 0.01;
}
