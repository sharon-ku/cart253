/**************************************************
Activity 7: juggling simulation
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

"use strict";

let gravityForce = 0.0025;

let paddle;


// an array to store individual balls
let balls = [];
// how many balls in juggling juggling field
let numBalls = 6;
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




// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600,600);
  noStroke();

  // create variables for our paddle arguments
  let w = 100;
  let h = 20;
  // create a new paddle
  paddle = new Paddle(w,h);

  // create ball by counting up to the number of balls
  for (let i = 0; i < numBalls;i++) {
    // create variables for our ball arguments
    let x = random(0,width);
    let y = random(-400,-100);
    let size = random(25,50);

    // create a new ball
    let ball = new Ball(x,y,size);
    // add the ball to the array of balls
    balls.push(ball);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  // display background color
  background(jugglingField.bgColor.r, jugglingField.bgColor.g, jugglingField.bgColor.b);

  // move and display the paddle
  paddle.move();
  paddle.display();

  // loop through all the balls in the array and display, move with gravity, and bounce them
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    // if ball is active, then show ball
    if (ball.active) {
      ball.gravity(gravityForce);
      ball.move();
      ball.bounce(paddle, bounceImpact);
      ball.display();
    }
  }

}
