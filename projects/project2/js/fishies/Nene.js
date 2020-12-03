class Nene extends Fish {
  constructor(fishImg1, fishImg2) {
    super(fishImg1, fishImg2)
    // size information
    this.length = 107;
    this.width = 57;
    // movement information
    this.speed = {
      casualSwimming: 5,
      followingFinger: 1.5,
    };
    this.buffer = 10; // stop moving fish when it is within a certain buffer of the finger
    // variables used for perlin noise
    this.tx = 5;
    this.ty = 30;
    this.txChange = 0.010;
    this.tyChange = 0.025;
    // radius around fish where it can spot finger
    this.fieldOfVision = 350;
    // vertical distance between fish's center and fish's butt
    this.vertDistBtwFishAndCloaca = 10;
    
    // // stores whether it is time to feed anemone or not
    // this.timeToFeedAnemone = false;
  }

  // Decide if it is time for the clownfish to feed the anemone
  decideIfTimeToFeedAnemone() {
    // It is time to feed anemone 50% of the time
    if (random() < 0.05) {
      this.timeToFeedAnemone = true;
    }
    else {
      this.timeToFeedAnemone = false;
    }
  }
}
