/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let bg = 0;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500, 500);

}

function draw() {
  background(bg);

  if (keyIsDown(65)) {
    rectMode(CENTER);
    rect(250,250,100,100);
  }
}
