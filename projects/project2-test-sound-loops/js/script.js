/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let synth, soundLoop;
// let notePattern = [`C5`, `G4`, `E5`, `C5`, `A5`, `F4`, `F5`, `C5`, `B5`, `G4`, `G5`, `E5`, `F5`, `E5`, `D5`, `B5`];
// let notePattern = [60, 62, 64, 67, 69, 72];
// let notePattern = [60, 55, 60, 64, 62, 60, 59, 60, 62, 69, 67, 64, 67];

let notePattern1 = [67, 64, 60, 55, 57, 57, 57, 57, 57, 57, 67, 64, 67, 72, 74, 74, 74, 74, 74, 74];
// let notePattern1 = [63, 64, 62, 60, 59];
// let notePattern2 = [67, 64, 60, 55, 57, 57, 57, 57, 57, 57, 67, 64, 67, 72, 74, 74, 74, 74, 74, 74];
let notePattern2 = [55,60,64,67,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
// let intervalsBetweenNotes = [1, 1, 1, 1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.3];
// let dur = [1, 4, 0.5, 0.5, 4];

let velocity = {
  current: 0.5,
  min: 0,
  max: 0.5,
};

// setup()
//
// Description of setup() goes here.
function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(canvasPressed);
  colorMode(HSB);
  background(0, 0, 86);
  text('tap to start/stop', 10, 20);

  //the looper's callback is passed the timeFromNow
  //this value should be used as a reference point from
  //which to schedule sounds
  let intervalInSeconds1 = 0.3; //0.2
  // for (let i = 0; i < intervalsBetweenNotes.length; i++) {
    // let intervalBetweenNotes = intervalsBetweenNotes[i];
    soundLoop1 = new p5.SoundLoop(onSoundLoop, intervalInSeconds1);
    // soundLoop1 = new p5.SoundLoop(onSoundLoop);
  // }
  // soundLoop1 = new p5.SoundLoop(onSoundLoop, intervalInSeconds);
  let intervalInSeconds2 = 0.6;
soundLoop2 = new p5.SoundLoop(onSoundLoop2, intervalInSeconds2);

  synth = new p5.MonoSynth();
}

function canvasPressed() {
  // ensure audio is enabled
  userStartAudio();

  if (soundLoop1.isPlaying) {
    // soundLoop1.stop();
    soundLoop2.syncedStart(soundLoop1, 0.5);



    // add the synced loop to it
  } else {
    // start the loop
    soundLoop1.start();
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {

}

// function onSoundLoop(timeFromNow,dur) {
function onSoundLoop(timeFromNow) {
  let noteIndex = (soundLoop1.iterations - 1) % notePattern1.length;
  let note = midiToFreq(notePattern1[noteIndex]);
  synth.play(note, 0.5, timeFromNow);
  // synth.play(note, 0.5, timeFromNow, dur);
  background(noteIndex * 360 / notePattern1.length, 50, 100);
}

// function onSoundLoop(timeFromNow,dur) {
function onSoundLoop2(timeFromNow) {
  let noteIndex = (soundLoop2.iterations - 1) % notePattern2.length;
  let note = midiToFreq(notePattern2[noteIndex]);

  if (note<10) {
    velocity.current = 0;
  }


  console.log(note);
  synth.play(note, velocity.current, timeFromNow);

  // synth.play(note, 0.5, timeFromNow, dur);
  background(noteIndex * 360 / notePattern2.length, 50, 100);
}
