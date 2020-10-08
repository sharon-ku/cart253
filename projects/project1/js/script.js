/**************************************************
Project 1: Simulation
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

let firefish = {
  x: 500,
  y: 250,
  length: 160,
  width: 50,
  vx: 0,
  vy: 0,
  speed: 3,
  tx: 0,
  ty: 10,
}


// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1920,1000);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  firefishCasualSwimming();
  displayFirefish();
}


function firefishCasualSwimming(){
  firefish.tx += 0.025;
  firefish.ty += 0.025;

  let noiseX = noise(firefish.tx);
  let noiseY = noise(firefish.ty);

  firefish.vx = map(noiseX, 0, 1, -firefish.speed, firefish.speed);
  firefish.vy = map(noiseY, 0, 1, -firefish.speed, firefish.speed);

  firefish.x += firefish.vx;
  firefish.y += firefish.vy;

  firefish.x = constrain(firefish.x, 0, width);
  firefish.y = constrain(firefish.y, 0, height);
}

function displayFirefish() {
  ellipse(firefish.x, firefish.y, firefish.length, firefish.width);
}
