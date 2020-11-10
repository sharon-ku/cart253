/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/
"use strict";


let synth;
let notes = [`F2`, `G2`, `Ab3`, `Bb3`, `C3`, `Db3`, `Eb3`, `F3`]; //F-minor
let currentNote = 0;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600,600);
  userStartAudio();

  synth = new p5.PolySynth();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
}

function keyPressed() {
  // start the ghost player
  setInterval(playRandomNote, 500);
}

function playRandomNote() {
  let note = notes[currentNote];
  synth.play(note, 1,0,0.1);

  currentNote +=1;
  if (currentNote === notes.length) {
    currentNote = 0;
  }
}
