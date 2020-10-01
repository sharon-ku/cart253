/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/


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
  background(0);

  parallels(100,100);
  parallels(50,50);



}


function parallels(x,y){
  for(let i=0; i<10; i++){
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(x,y,2,50);
    x += 5;
  }
}
