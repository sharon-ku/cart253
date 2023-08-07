/**************************************************
Exercise 6: Make Some Noise
Sharon Ku

Click on the canvas to activate the short tune. User-controlled froggie tries to sabotage the music by moving left and right on the screen (click on right and left arrow keys). User can clap or make a loud noise to create the lightning and the thunder.
**************************************************/

// create canvas
let canvas;

// frog controlled by user
let frog;

// using an array to store all images
let frogImages = [];
// this variable stores the number of images
let numFrogImages = 7;

// array that stores raindrops
let raindrops = [];
let initialNumRaindrops = 50; //100
let maxNumRaindrops = 500; // cannot exceed this many raindrops on canvas
let minNumRaindropsToAdd = 20;
let maxNumRaindropsToAdd = 50;

// ground
let ground;

// Grab info of parent that canvas goes into
let canvasDiv = document.getElementById('canvas-parent');



// SOUND-RELATED VARIABLES ------------------------------------------------
// volume needed to cue lightning
let volumeToCueLightning = 0.1;

// microphone
let mic;
// to store oscillator
let oscillator;

// synthesizer
let synth;
// tracks the interval that plays note
let interval;
// a little song tune I made up
let notes = [`C5`, `G4`, `E5`, `C5`, `A5`, `F4`, `F5`, `C5`, `B5`, `G4`, `G5`, `E5`, `F5`, `E5`, `D5`, `B5`];
// track which note we're at
let currentNote = 0;
// time between each note
let noteDuration = 500;

// -----------------------------------------------------------------


// gravitational force exerted on raindrops
let gravitationalForce = 0.01;

// color for background (dark grey)
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
  for (let i = 0; i < numFrogImages; i++) {
    let loadedImage = loadImage(`assets/images/frog-drawings/frog-${i}.png`);
    frogImages.push(loadedImage);
  }
}


// setup()
//
// Description of setup() goes here.
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  // append canvas to #canvas-parent
  canvas.parent('canvas-parent');

  userStartAudio();

  // ground height
  let groundHeight = height / 4;

  // create raindrops, frog, ground, and frog
  createRaindrops(initialNumRaindrops);
  createGround(groundHeight);
  createFrog(groundHeight);

  // create a new synthesizer
  synth = new p5.PolySynth;

  // create AudioIn object
  mic = new p5.AudioIn();
  // try to connect to user's microphone
  mic.start();

  // create an oscillator
  oscillator = new p5.Oscillator(0, `sine`);
}

// add new raindrops to raindrops array
function createRaindrops(numRaindrops) {
  for (let i = 0; i < numRaindrops; i++) {
    let note = random(notes);
    let raindrop = new Raindrop(note);
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
  // create the ground
  ground = new Ground(w, groundHeight, x, y);
}

// create a new frog
function createFrog(groundHeight) {
  let frogX = width / 2;
  let frogY = height - groundHeight;
  frog = new Frog(frogX, frogY);
}

// draw()
//
// Display background color, ground, frog, and raindrops. Frog knows how to blink. Raindrops fall with gravity. When microphone level reaches a certain threshold, it causes lightning.
function draw() {
  // display background color
  background(rainBg.r, rainBg.g, rainBg.b);

  // display the ground
  ground.display();

  // display the frog + let it blink
  frog.display();
  frog.blink();

  // make sure that number of raindrops does not exceed maximum number of raindrops
  raindrops.length = constrain(raindrops.length, 0, maxNumRaindrops);

  // display, move, and wrap raindrops
  for (let i = 0; i < raindrops.length; i++) {
    let raindrop = raindrops[i];
    raindrop.move();
    raindrop.wrap();
    raindrop.gravity(gravitationalForce);
    raindrop.display();
  }

  // get current volume of sound that goes into the microphone
  let level = mic.getLevel();

  // check if volume is loud enough to cue lightning
  if (level > volumeToCueLightning) {
    cueLightning(level);
  }
}

// when lightning strikes, change raindrop color to white, add new raindrops, change frog's tint, display lightning filter, create thunder noise. Two seconds later, return to calmness with resetToNoLightning function.
function cueLightning(level) {
  // change raindrop color
  for (let i = 0; i < raindrops.length; i++) {
    let raindrop = raindrops[i];
    raindrop.changeToLightningColor();
  }
  // map number of new raindrops to how loud the lightning clap was
  let numRaindropsToAdd = map(level, volumeToCueLightning, 1, minNumRaindropsToAdd, maxNumRaindropsToAdd);
  createRaindrops(numRaindropsToAdd);

  // change frog's tint
  frog.setLightningTint();

  // display white filter to simulate lightning
  displayWhiteFilter();

  // create thunder noise using oscillator
  oscillator.freq(100);
  oscillator.start();

  // after 2 seconds, reset raindrops and frog tint to no lightning + stop thunder noise
  setTimeout(resetToNoLightning, 300);
}

// display a white filter to simulate lightning flash
function displayWhiteFilter() {
  push();
  fill(255, 255, 255, 120);
  noStroke();
  rectMode(CORNER);
  rect(0, 0, width, height);
  pop();
}

// reset raindrops and frog's tint to no lightning
function resetToNoLightning() {
  // reset color of raindrops
  for (let i = 0; i < raindrops.length; i++) {
    let raindrop = raindrops[i];
    raindrop.resetColor();
  }
  // reset frog's tint
  frog.resetNormalTint();
  // stop "thunder" noise
  oscillator.stop();
}

// when mouse pressed, start song tune
function mousePressed() {
  if (interval === undefined) {
    interval = setInterval(playNextNote, noteDuration);
  } else {
    clearInterval(interval);
    interval = undefined;
  }
}

// play the next note in song tune
function playNextNote() {
  // fetch the note from the notes array
  let note = notes[currentNote];
  // play the note
  synth.play(note, 0.2, 0, 0.4);
  // move to next note in array
  currentNote += 1;
  // restart array when reach the end
  if (currentNote === notes.length) {
    currentNote = 0;
  }
}

// press left + right arrow keys to move frog and play what is supposed to be the next note in the song tune
function keyPressed() {
  frog.handleInput();
  frog.move();
  playNextNote();
}
