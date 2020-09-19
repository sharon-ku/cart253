/**************************************************
Week 3 variable experiments
Sharon Ku

3.2 Creating variables
3.3 Changing variables
**************************************************/

let bgShade = 0;
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let circleSpeed = 2;
let circleAcceleration =+ 0.25;

// setup()
//
// Description of setup() goes here.
function setup() {

  createCanvas(500, 500);




}

// draw()
//
// Description of draw() goes here.
function draw() {
  // bgShade = bgShade + 1;
  background(bgShade);
  circleX += circleSpeed;
  circleSpeed += circleAcceleration;
  // circleSize = circleSize * 1.01;
  // circleY = circleY / 1.01;
  ellipse(circleX,circleY,circleSize);


}
