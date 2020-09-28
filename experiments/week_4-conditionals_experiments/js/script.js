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

  if (mouseX < circle.x) {
    circle.ax = -circle.acceleration;
  }
  else {
    circle.ax = circle.acceleration;
  }

  if (mouseY < circle.y){
    circle.ay = -circle.acceleration;
  }
  else{
    circle.ay = circle.acceleration;
  }

  circle.vx = circle.vx + circle.ax;
  circle.vx = constrain(circle.vx, -circle.maxSpeed, circle.maxSpeed);
  circle.vy = circle.vy + circle.ay;
  circle.vy = constrain(circle.vy, -circle.maxSpeed, circle.maxSpeed);

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);

}
