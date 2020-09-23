/**************************************************
Week 3 variable experiments
Sharon Ku

3.2 Creating variables
3.3 Changing variables
3.4 Introducing JavaScript objects
3.5 Debugging variables
3.6 Introducing random numbers
3.7 Map and constrain
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
  speed:1,
  fill:255
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
  circle.x = constrain(circle.x,0,width);

  circle.size = map(mouseY,0,height,50,500);

  circle.fill = map(circle.x,0,width,0,255);
  fill(circle.fill);
  ellipse(circle.x,circle.y,circle.size);


  //intro to random numbers
  // circle.speed = random(-5.5);
  // circle.y = random(0,height);
  // circle.fill = random(0,255);
  // circle.size = random(10,100);

  //intro to variables
  //circleSpeed += circleAcceleration;
  // circleSize = circleSize * 1.01;
  // circleY = circleY / 1.01;

  // console.log("circle.x is "+circle.x);



}
