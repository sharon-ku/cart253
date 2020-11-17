/**************************************************
Project 2: Prototype
Sharon Ku

display a frog

What I focused on for this prototype: getting an animation to work.
**************************************************/

"use strict";


// frog controlled by user
let frog;

// using an array to store all images
let frogImages = [];
// this variable stores the number of images
let numFrogImages = 7;


// preload()
//
// loads all images + sound effects
function preload() {
  for (let i=0; i<numFrogImages; i++) {
    let loadedImage = loadImage(`assets/images/frog-drawings/frog-${i}.png`);
    frogImages.push(loadedImage);
  }

}



// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(800,800);

  // create a new frog
  frog = new Frog();

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  // display my frog
  frog.display();

}


//
// }
