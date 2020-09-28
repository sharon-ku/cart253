/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/


let angle1 = 0;
let angle2 = 0;

function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);

  translate(250, 250);
  rotate(angle1);
  rectMode(CENTER);
  rect(0, 0, 100, 100);

  translate(100, 0);
  rotate(angle2)
  rect(0, 0, 50, 50);

  angle1 = angle1 + 0.01;
  angle2 = angle2 + 0.02;
}
