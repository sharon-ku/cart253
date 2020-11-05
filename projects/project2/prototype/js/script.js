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
let numFrogImages = 7;


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
  frog.slapTongueDown();

  // loop through all the flies in the array and display them
  for (let i=0; i<flies.length; i++) {
    let fly = flies[i];
    fly.move(frog);
    fly.getSlappedByFrog(frog);
    fly.display();

  }

}

function mousePressed() {
  frog.mousePressed();
}


// function keyPressed() {
//   frog.keyPressed();
//
//
// }
