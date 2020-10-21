/**************************************************
Week 7: Arrays
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

"use strict";

let fortunes = [
  `The leaves will fall beautifully today.`,
  `You will trip over Cutie Pie today.`,
  `I will still not enjoy gum.`,
  `Happiness is yours for the taking.`,
  `You will take a nice walk out.`
];

let chosenFortune = `Click to see your future!`;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600, 600);
  textAlign(CENTER,CENTER);
  textSize(32);
  fill(255);


}


// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
  text(chosenFortune,width/2,height/2);
}

function mousePressed() {
  chosenFortune = random(fortunes);
}
