/**************************************************
Activity 3: Moving Pictures
Sharon Ku

Two circles, the left one bigger and more transparent than the right, come in from either side of the screen, growing as they do so. They stop in the centre while still growing. The background goes from black to red.
**************************************************/

//Setting up my variables
let bgColor = {
  red:0,
  green:0,
  blue:0,
  redChangeRate:0.5,
  redMin:0,
  redMax:255,
}

let bigCircle = {
  x: 0,
  y: 250,
  size: 200,
}


// setup()
//
//Description of setup
function setup() {

  createCanvas(500,500);
  noStroke();
}

// draw()
//
// Description of draw() goes here.
function draw() {

  //Background changing from black to red
  bgColor.red += bgColor.redChangeRate;
  bgColor.red = constrain(bgColor.red,bgColor.redMin,bgColor.redMax);
  background(bgColor.red,bgColor.green,bgColor.blue);




  ellipse(bigCircle.x, bigCircle.y, bigCircle.size);


}
