class Goby extends Fish {
  constructor(fishImg1, fishImg2) {
    super(fishImg1, fishImg2)
    // size information
    this.length = 130;
    this.width = 39;
    // movement information
    this.speed = {
      casualSwimming: 6,
      followingFinger: 2,
    };
    this.buffer = 30; // stop moving fish when it is within a certain buffer of the finger
    // variables used for perlin noise
    this.tx = 0;
    this.ty = 10;
    this.txChange = 0.025;
    this.tyChange = 0.025;
    // radius around fish where it can spot finger
    this.fieldOfVision = 350;
    // vertical distance between fish's center and fish's butt
    this.vertDistBtwFishAndCloaca = 3;
  }

}
