/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
let bgShade = 0;

let circle = {
  x: 0,
  y: 250,
  size: 100,
  speed: 2,

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
  background(bgShade);
  circle.x = circle.x + circle.speed;

  if (mouseX < width/3) {
    fill(50,75,135);
  }

  else if (mouseX < 2 * width/3) {
    fill(49,130,67);
  }

  else{
    fill(80, 170, 230);
  }
  ellipse(circle.x,circle.y,circle.size);
}
