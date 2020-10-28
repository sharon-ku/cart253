/**************************************************
Activity 7: juggling simulation
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

"use strict";

// our juggling field
let jugglingField = {
  // an array to store individual paddles
  paddles: [],
  // how many paddles in juggling field
  numPaddles: 1,
  // an array to store individual balls
  balls: [],
  // how many balls in juggling juggling field
  numBalls: 1,
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

  // create paddle by counting up to the number of paddles
  for (let i=0; i<jugglingField.numPaddles;i++) {
    // create variables for our paddle arguments
    let x = random(0,width);
    let y = height - (height/10);
    let w = 100;
    let h = 20;

    // create a new paddle
    let paddle = new Paddle(x,y,w,h);
    // add the paddle to the array of paddles
    jugglingField.paddles.push(paddle);
  }

  // create ball by counting up to the number of balls
  for (let i=0; i<jugglingField.numBalls;i++) {
    // create variables for our ball arguments
    let x = random(0,width);
    let y = 0;
    let size = 50;
    let speed = 5;
    let vx = 0;
    let vy = 0;
    let acceleration = 0.5;
    let ax = 0;
    let ay = 0;

    // create a new ball
    let ball = new Ball(x,y,size,speed,vx,vy,acceleration,ax,ay);
    // add the ball to the array of balls
    jugglingField.balls.push(ball);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  // display background color
  background(jugglingField.bgColor.r, jugglingField.bgColor.g, jugglingField.bgColor.b);

  // loop through all the paddles in the array and display and move them
  for (let i=0; i<jugglingField.numPaddles; i++) {
    let paddle = jugglingField.paddles[i];
    paddle.display();
    paddle.move();
  }

  // loop through all the balls in the array and display and move them
  for (let i=0; i<jugglingField.numBalls; i++) {
    let ball = jugglingField.balls[i];
    ball.display();
    ball.move();
  }
}
