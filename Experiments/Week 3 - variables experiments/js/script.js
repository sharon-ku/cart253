/**************************************************
Week 3 variable experiments
Sharon Ku

Experimenting with built-in variables
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {
  /***For 3.1 Intro variables
  createCanvas(windowWidth, windowHeight);
  ***/
  createCanvas(500, 500);




}

// draw()
//
// Description of draw() goes here.
function draw() {

  /***For 3.1 Introducing variables - this makes a rectangle of changing colors when you move the mouse
  background(0);
  fill(mouseX/2,mouseY/4,0);
  rectMode(CENTER);
  rect(width/2, height/2, mouseX, mouseY);
  ***/
  background(0);
  ellipse(250,250,100);

}
