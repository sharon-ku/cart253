/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/


// Angles of rotation for our shape
let angleX = 0;
let angleY = 0;

function setup() {
  // Using WEBGL in createCanvas to specify 3D graphics
  createCanvas(500, 500, WEBGL);
}

function draw() {
  background(0);

  // Our shape
  push();
  // Translate to the center (not really needed, but just for completeness)
  translate(0, 0, 0);
  // Rotate AROUND the x axis
  rotateX(angleX);
  // Rotate AROUND the y axis
  rotateY(angleY);
  // Looks nicer
  noStroke();
  // Our central cube is white
  fill(255);
  box(100);
  // A red bar passing through the box
  fill(255, 0, 0);
  box(200, 25, 25);
  // A green bar passing through the box
  fill(0, 255, 0);
  box(25, 200, 25);
  // A blue bar passing through the box
  fill(0, 0, 255);
  box(25, 25, 200);
  // Note how the entire shape rotates because the rotateX() and rotateY() are applied to everything
  // afterwards until the pop() below here
  pop();

  // Increase the angles to rotate over time
  angleX = angleX + 0.01;
  angleY = angleY + 0.05;
}
