/**************************************************
Exercise 6: Make Some Noise
Sharon Ku

Here is a description of this template p5 project.
**************************************************/


// frog controlled by user
let frog;

// using an array to store all images
let frogImages = [];
// this variable stores the number of images
let numFrogImages = 7;


// array that stores raindrops
let raindrops = [];
let numRaindrops = 100;
let raindropLength = 20;

// ground
let ground;

// microphone
let mic;

// volume needed to cue lightning
let volumeToCueLightning = 0.2;

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

// preload()
//
// load images
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
  // createCanvas(windowWidth, windowHeight);
  createCanvas(600,600);

  userStartAudio();

  // ground height
  let groundHeight = height/4;

  createRaindrops();
  createGround(groundHeight);
  createFrog(groundHeight);

  // create AudioIn object
  mic = new p5.AudioIn();
  // try to connect to user's microphone
  mic.start();


}

// add new raindrops to raindrops array
function createRaindrops() {
  for (let i = 0; i < numRaindrops; i++) {
    let x1 = random(0, width);
    let y1 = random(0, height);
    let x2 = x1;
    let y2 = y1 + raindropLength;
    let raindrop = new Raindrop(x1, y1, x2, y2);
    raindrops.push(raindrop);
  }
}

// create a new ground
function createGround(groundHeight) {
  // size information
  let w = width;
  // position information
  let x = width / 2;
  let y = height - (groundHeight / 2);
  ground = new Ground(w, groundHeight, x, y);
}

// create a new frog
function createFrog(groundHeight) {
  let frogX= width/2;
  let frogY= height - groundHeight;
  frog = new Frog(frogX, frogY);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  // display background color
  background(rainBg.r, rainBg.g, rainBg.b);

  // get current volume of sound that goes into the microphone
  let level = mic.getLevel();
  console.log(level);

  // check if volume is loud enough to cue lightning
  if (level > volumeToCueLightning) {
    background(255);
    for (let i = 0; i < raindrops.length; i++) {
      let raindrop = raindrops[i];
      raindrop.changeColor();
    }
  }


  // display the ground
  ground.display();

  // display the frog
  frog.display();
  frog.blink();

  // display raindrops
  for (let i = 0; i < raindrops.length; i++) {
    let raindrop = raindrops[i];
    raindrop.move();
    raindrop.wrap();
    raindrop.gravity(gravitationalForce);
    raindrop.display();
  }




}
