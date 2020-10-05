/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let circle = {
  x: 250,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 1,
  tx: 0, // A "time" value for the horizontal (for noise())
  ty: 10// A "time" value for the vertical (for noise())
  // We start these two "time" values at different numbers because
  // we want the horizontal and vertical to have different resulting
  // noise() values (and behaviours)
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500, 500);

}

function draw() {
  background(0);

  circle.tx = circle.tx + 0.025;
  circle.ty = circle.ty + 0.025;

  let noiseX = noise(circle.tx);
  let noiseY = noise(circle.ty);

  // Then we set our velocity to the value noise() returned (between 0 and 1)
  // mapped to our circle's speed range
  circle.vx = map(noiseX, 0, 1, -circle.speed, circle.speed);
  circle.vy = map(noiseY, 0, 1, -circle.speed, circle.speed);

  circle.x = circle.x + circle.vx;
  circle.y = circle.y + circle.vy;

  ellipse(circle.x, circle.y, circle.size);


  circle.x += circle.vx;
  circle.y += circle.vy;

  ellipse(circle.x, circle.y, circle.size);
}
