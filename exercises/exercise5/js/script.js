/**************************************************
Exercise 5: Juggle Garden
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

"use strict";

// possible states: animation, success, fail
let state = `animation`;

// number of successful juggles that user accomplished
let numSuccessfulJuggles = 0;

// total number of juggles to fill up the counter and pass
let totalJugglesForPass = 3;

// gravitational force exerted on the balls
let gravityForce = 0.0025;

// paddle controlled by user
let paddle;

// an array to store individual good balls
let goodBalls = [];
// how many good balls in juggling field
let numGoodBalls = 6;

// an array to store individual bad balls
let badBalls = [];
// how many bad balls in juggling field
let numBadBalls = 6;

// max distance that ball will bounce away in the horizontal direction once it hits the pedal
let bounceImpact = 2;

// our juggling field
let jugglingField = {
  // color of background
  bgColor: {
    r: 0,
    g: 0,
    b: 0,
  }
};

// progress bar is a rectangular bar that keeps track of how many good ball and bad ball juggles have been made
// if user juggles a good ball, progress bar goes up
// if user juggles a bad ball, progress bar goes down
let progressBar = {
  counter: 0,
  x: 50,
  y: 50,
  width: 50,
  height: 10,
  totalWidth: 100,
  fill: 255,
};

// message that is displayed on canvas in `success` state
let successMessage = {
  text: `You are now a professional juggler.`,
  x: 100,
  y: 100,
  size: 25,
  fill: 255,
}

// message that is displayed on canvas in `fail` state
let failMessage = {
  text: `I'm sorry to say this,
  but you have no future as a juggler.`,
  x: 100,
  y: 100,
  size: 25,
  fill: 255,
}

// setup()
//
// Create a canvas, remove strokes from all shapes, create a new paddle, create good balls in goodBall array, create bad balls in badBall array.
function setup() {
  createCanvas(600,600);
  noStroke();

  // create variables for our paddle arguments
  let w = 100;
  let h = 20;
  // create a new paddle
  paddle = new Paddle(w,h);

  // create good balls by counting up to the number of good balls
  for (let i = 0; i < numGoodBalls;i++) {
    // create variables for our good ball arguments
    let x = random(0,width);
    let y = random(-400,-100);
    let size = random(25,50);

    // create a new good ball
    let goodBall = new GoodBall(x,y,size);
    // add the ball to the array of good balls
    goodBalls.push(goodBall);
  }

  // create bad balls by counting up to the number of bad balls
  for (let i = 0; i < numBadBalls;i++) {
    // create variables for our bad ball arguments
    let x = random(0,width);
    let y = random(-400,-100);
    let size = random(25,50);

    // create a new bad ball
    let badBall = new BadBall(x,y,size);
    // add the ball to the array of bad balls
    badBalls.push(badBall);
  }

}

// draw()
//
// Display background color and set up 3 states (animation, success, fail)
function draw() {
  // display background color
  background(jugglingField.bgColor.r, jugglingField.bgColor.g, jugglingField.bgColor.b);

  // setting up states
  if (state === `animation`) {
    animation();
  }
  else if (state === `success`) {
    success();
  }
  else if (state === `fail`) {
    fail();
  }
}

// animation()
//
// Paddle is displayed. It moves horizontally with mouse's position.
// Good balls and bad balls are displayed and fall from top of canvas with gravity.
// If good ball overlaps with paddle, it bounces off paddle and counter increases.
// if bad ball overlaps with paddle, it bounces off paddle and counter decreases.
function animation() {
  // move and display the paddle
  paddle.move();
  paddle.display();

  // loop through all the good balls in the array and display, move with gravity, and bounce them
  for (let i = 0; i < goodBalls.length; i++) {
    let goodBall = goodBalls[i];
    // if good ball is active, then show good ball
    if (goodBall.active) {
      goodBall.gravity(gravityForce);
      goodBall.move();
      goodBall.bounce(paddle, bounceImpact);
      goodBall.display();

      // if paddle touches bad ball, increase progress bar counter by 1
      if (goodBall.overlapsWithPaddle(paddle)) {
        progressBar.counter++;
      }
    }
  }

  // loop through all the bad balls in the array and display, move with gravity, and bounce them
  for (let i = 0; i < badBalls.length; i++) {
    let badBall = badBalls[i];
    // if bad ball is active, then show bad ball
    if (badBall.active) {
      badBall.gravity(gravityForce);
      badBall.move();
      // badBall.overlapsWithPaddle(paddle);
      badBall.bounce(paddle, bounceImpact);
      badBall.display();

      // if paddle touches bad ball, decrease progress bar counter by 1
      if (badBall.overlapsWithPaddle(paddle)) {
        progressBar.counter--;
      }

    }
  }

  console.log(progressBar.counter);

  if (progressBar.counter < 0) {
    state = `fail`;
  }
  else if (progressBar.counter >= totalJugglesForPass) {
    state = `success`;
  }
}


// success()
// possible end state #1: displays positive message advising the user of its status as a professional juggler.
function success() {
  displayMessage(successMessage);
}

// display a message in the middle of the canvas.
function displayMessage(message) {
  message.x = width/2;
  message.y = height/2;

  push();
  textAlign(CENTER);
  fill(message.fill);
  textSize(message.size);
  text(message.text, message.x, message.y);
  pop();
}

// fail()
// possible end state #2: displays negative message advising the user against pursuing a career as a juggler.
function fail() {
  displayMessage(failMessage);
}
