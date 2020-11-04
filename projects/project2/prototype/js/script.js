/**************************************************
Project 2: Prototype
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

"use strict";

// using an array to store all images
let frogImages = [];
// this variable stores the number of images
let numFrogImages = 2;

// preload()
//
// loads all images + sound effects
function preload() {
  // for (let i=0; i<numImages; i++) {
  //   let loadedImage = loadImage(`assets/images/frog-drawings/frog-${i}.png`);
  //   images.push(loadedImage);
  // }

  frogImages[0] = loadImage(`assets/images/frog-drawings/frog-1.png`);
  frogImages[1] = loadImage(`assets/images/frog-drawings/frog-2.png`);
  frogImages[2] = loadImage(`assets/images/frog-drawings/frog-3.png`);
  frogImages[3] = loadImage(`assets/images/frog-drawings/frog-4.png`);


}



// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);





}
