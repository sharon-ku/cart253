/**************************************************
Activity 8: Sound activity
Sharon Ku

Let’s make a simple musical toy!

The canvas will start blank and the user can add moving circles by clicking. As a circle moves it will emit a tone based on its distance from the centre of the canvas. When a circle touches the edges of the canvas it will bounce, and play a note!

The result will hopefully be a kind of musical instrument based on some basic physics programming and an example of how we can use procedural sound creatively.
**************************************************/

// array that stores balls
let balls = [];


// setup()
//
// Just creates the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.bounce();
    ball.move();
    ball.display();
  }
}

function mousePressed() {
  createBall(mouseX, mouseY);
}

function createBall(x,y) {
  let ball = new Ball(x, y);
  balls.push(ball);
}
