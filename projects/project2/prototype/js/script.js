/**************************************************
Project 2: Prototype
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

"use strict";

// frog controlled by user
let frog;


// using an array to store all images
let frogImages = [];
// this variable stores the number of images
let numFrogImages = 4;


// array that stores fly variables
let flies = [];

// number of flies in array
let numFlies = 10;

// distance between frog and bug needed to slap the bug
let slappingDistance = 50;



// preload()
//
// loads all images + sound effects
function preload() {
  // for (let i=0; i<numImages; i++) {
  //   let loadedImage = loadImage(`assets/images/frog-drawings/frog-${i}.png`);
  //   images.push(loadedImage);
  // }

// load frog images without tongue
  frogImages[0] = loadImage(`assets/images/frog-drawings/frog-1.png`);
  frogImages[1] = loadImage(`assets/images/frog-drawings/frog-2.png`);
  frogImages[2] = loadImage(`assets/images/frog-drawings/frog-3.png`);
  frogImages[3] = loadImage(`assets/images/frog-drawings/frog-4.png`);

// load frog images with tongue
  frogImages[4] = loadImage(`assets/images/frog-drawings/frog-tongue1.png`);
  frogImages[5] = loadImage(`assets/images/frog-drawings/frog-tongue2.png`);
  frogImages[6] = loadImage(`assets/images/frog-drawings/frog-tongue3.png`);
}



// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(800,800);

  // create a new frog
  frog = new Frog();

  // create flies by counting up to the number of flies
  for (let i=0; i<numFlies; i++) {
    // create a new fly
    let fly = new Fly();
    // add the fly to the array of flies
    flies.push(fly);
  }


}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);


  // imageMode(CENTER);
  // image(frogImages[0], width/2, height/2);

  // display my frog
  frog.move();
  frog.display();

  // loop through all the flies in the array and display them
  for (let i=0; i<flies.length; i++) {
    let fly = flies[i];
    fly.move(frog);
    fly.display();

  }

}


// function keyPressed() {
//   frog.keyPressed();
//
//
// }
