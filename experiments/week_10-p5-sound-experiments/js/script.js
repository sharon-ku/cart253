/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
"use strict";

let oscillator;
let angle = 0;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600,600);
  userStartAudio();

  oscillator = new p5.Oscillator(440,`sine`);
  oscillator.amp(0.2);

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  let sinAngle = sin(angle);
  let newFreq = map(sinAngle, -1,1,440,880);
  oscillator.freq(newFreq);

  angle += 0.1;
}

function mousePressed() {
  oscillator.start();
}

function mouseReleased() {
  oscillator.stop();
}
