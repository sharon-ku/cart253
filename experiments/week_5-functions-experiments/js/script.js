/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let hamlet1 = "To be or not to be";
let hamlet2 = 'That is the question';
let hamlet3 = `Whether 'tis nobler in the mind...`;

let hello ={
  string: `Hello, world!`,
  x: 0,
  y: 0,
  vx: 5,
  vy: 1,
};


// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(127);

  textAlign(CENTER, CENTER);
  // Make the font size respond to the mouse
  let size = map(mouseX, 0, width, 12, 128);
  textSize(size);
  textStyle(BOLD);

  // Make the fill respond to the mouse
  let red = map(mouseX, 0, width, 100, 200);
  let green = map(mouseY, 0, height, 100, 200);
  let blue = map(mouseX + mouseY, 0, width + height, 100, 200);
  fill(red, green, blue);

  // Make the stroke color respond to the mouse
  let strokeShade = map(mouseX, 0, width, 0, 255);
  stroke(strokeShade);

  // Make the stroke weight respond to the mouse
  let weight = map(mouseY, 0, height, 0, 40);
  strokeWeight(weight);

  text(`Hello, World!`, 250, 250);
}
