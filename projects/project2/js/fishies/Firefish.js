class Firefish extends Fish {
  constructor(fishImg1, fishImg2, synth) {
    super(fishImg1, fishImg2, synth);
    // size information
    this.length = 160;
    this.width = 66;

    // movement information
    this.speed = {
      casualSwimming: 5,
      followingFinger: 1.5,
    };
    this.buffer = 10; // stop moving fish when it is within a certain buffer of the finger

    // variables used for perlin noise
    this.tx = 0;
    this.ty = 10;
    this.txChange = 0.025;
    this.tyChange = 0.025;

    // radius around fish where it can spot finger
    this.fieldOfVision = 350;

    // vertical distance between fish's center and fish's butt
    this.vertDistBtwFishAndCloaca = 10;

    // is true if fish is keeping food inside its mouth
    this.foodInMouth = false;


    // SOUND-RELATED VARIABLES
    // synthesizer
    this.synth = synth;
    // tracks the interval that plays note
    this.interval = undefined;
    // a little song tune I made up
    this.notes = [`C5`, `G4`, `E5`, `C5`, `A5`, `F4`, `F5`, `C5`, `B5`, `G4`, `G5`, `E5`, `F5`, `E5`, `D5`, `B5`];
    // track which note we're at
    this.currentNote = 0;
    // time between each note
    this.noteDuration = 500;
  }

  // play the next note in song tune
  playNextNote() {
    // fetch the note from the notes array
console.log(this.notes, this.currentNote, this.interval, this.noteDuration, this.length);
    let note = this.notes[this.currentNote];

    // play the note
    ths.synth.play(note, 0.2, 0, 0.4);
    // move to next note in array
    this.currentNote += 1;
    // restart array when reach the end
    if (this.currentNote === this.notes.length) {
      this.currentNote = 0;
    }
  }

  // Play song tune
  playTune() {
    if (this.interval === undefined) {
      this.interval = setInterval(this.playNextNote, this.noteDuration);
    } else {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }





}
