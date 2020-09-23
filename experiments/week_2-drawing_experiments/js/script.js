/**************************************************
Drawing Experiments
Sharon Ku

Experimenting with p5's drawing and color functions

Currently drawing a face with two rectangles in background.
**************************************************/

// setup()
//
// Draws a face on the canvas.
function setup() {
  createCanvas(500,500);

  // Set the background to blue
  background(32, 115, 247);

  // Draw the skin-colored head
  fill(250,200,200);
  ellipse(250,250,200,200);

  // Draw the black eyes
  fill(0);
  ellipse(200,250,30,30);
  ellipse(300,250,30,30);

  // Draw the mouth
  strokeWeight(10);
  line(200,300,300,300);

  // Draw 2 Rectangles from previous practice experimentation
  rectMode(CENTER);
  strokeWeight(0);
  fill(247, 161, 32);
  rect(40,250,50,50);

  fill(247, 89, 32);
  rectMode(CORNER);
  rect(400,350,50,50);


}

// draw()
//
// Does nothing.
function draw() {

}
