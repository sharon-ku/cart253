/**************************************************
Week 3 variable experiments
Sharon Ku

3.2 Creating variables
3.3 Changing variables
3.4 Introducing JavaScript objects
**************************************************/

let bgShade = 0;

/** previous way of writing the variables
let circleX = 0;
let circleY = 250;
let circleSize = 100;
let circleSpeed = 2;
let circleAcceleration = 0.25;
**/


let circle = {
  x:0,
  y:250,
  size:100,
  speed:2
};

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
  circle.x += circle.speed;
  //circleSpeed += circleAcceleration;
  // circleSize = circleSize * 1.01;
  // circleY = circleY / 1.01;
  ellipse(circle.x,circle.y,circle.size);


}
