/**************************************************
Week 3 variable experiments
Sharon Ku

Experimenting with built-in variables
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
  fill(mouseX,mouseY,0);
  rectMode(CENTER);
  rect(width/2, height/2, mouseX, mouseY);

}
