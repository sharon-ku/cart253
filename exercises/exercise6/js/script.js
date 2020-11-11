/**************************************************
Exercise 6: Make Some Noise
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

// array that stores raindrops
let raindrops = [];
let numRaindrops = 100;
let raindropLength = 20;

// ground
let ground;

// gravitational force exerted on raindrops
let gravitationalForce = 0.005;

// color for rain background (dark grey)
let rainBg = {
  r: 97,
  g: 97,
  b: 97,
};

// color for lightning background (lighter grey)
let lightningBg = {
  r: 117,
  g: 117,
  b: 117,
};



// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  // createCanvas(600,600);

  // add new raindrops to raindrops array
  for (let i = 0; i < numRaindrops; i++) {
    let x1 = random(0, width);
    let y1 = random(0, height);
    let x2 = x1;
    let y2 = y1 + raindropLength;
    let raindrop = new Raindrop(x1, y1, x2, y2);
    raindrops.push(raindrop);
  }

  // create a new ground
  // size information
  let w = width;
  let h = height / 6;
  // position information
  let x = width / 2;
  let y = height - (h / 2);
  ground = new Ground(w, h, x, y);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  // display background color
  background(rainBg.r, rainBg.g, rainBg.b);

  // display the ground
  ground.display();

  // display raindrops
  for (let i = 0; i < raindrops.length; i++) {
    let raindrop = raindrops[i];
    raindrop.move();
    raindrop.wrap();
    raindrop.gravity(gravitationalForce);
    raindrop.display();
  }


}
