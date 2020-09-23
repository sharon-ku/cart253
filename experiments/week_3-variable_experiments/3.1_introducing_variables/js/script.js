/**************************************************
Week 3 variable experiments
Sharon Ku

Experimenting with built-in variables
For 3.1 Introducing variables - this makes a rectangle of changing colors when you move the mouse
**************************************************/

// setup()
//
// Description of setup() goes here.
function setup() {

  createCanvas(windowWidth, windowHeight);






}

// draw()
//
// This makes a rectangle of changing colors when you move the mouse
function draw() {


  background(0);
  fill(mouseX/2,mouseY/4,0);
  rectMode(CENTER);
  rect(width/2, height/2, mouseX, mouseY);



}
