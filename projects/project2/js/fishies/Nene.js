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
      swimmingToAnemone: 3,
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

    // stores whether it is time to feed anemone or not
    this.timeToFeedAnemone = false;

    // minimum distance needed between fish and anemone for fish to release food securely to anemone
    this.distBufferToAnemone = 30;

    // returns true if fish is keeping food inside its mouth
    this.foodInMouth = false;

    // returns true if this is a clownfish
    this.isAClownfish = true;
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

  // Fish follows a series of actions to feed the anemone
  // It's a tough yet rewarding procedure!
  feedAnemone(anemone, fishFood) {
    //  step 1: store food in mouth
    let distBtwFishAndAnemone = dist(this.x, this.y, anemone.x, anemone.y);
    // set fish foods' position to fish's position
    fishFood.x = this.x;
    fishFood.y = this.y;
    this.foodInMouth = true;

    // step 2: once food is in fish's mouth, swim to the anemone
    // if it's already close to the anemone, then proceed to step 3
    if (distBtwFishAndAnemone > this.distBufferToAnemone) {
      if (this.x < anemone.x - this.distBufferToAnemone) {
        this.vx = this.speed.SwimmingToAnemone; // swim right
        this.scale = 1; // face right
      }
      else if (this.x > anemone.x + this.distBufferToAnemone) {
        this.vx = -this.speed.SwimmingToAnemone; // swim left
        this.scale = -1; // face left
      }
      else {
        this.vx = 0; // keep x position
        this.scale = 1; // face right
      }

      if (this.y < anemone.y - this.distBufferToAnemone) {
        this.vy = this.speed.SwimmingToAnemone; // swim down
      }
      else if (this.y > anemone.y + this.distBufferToAnemone) {
        this.vx = -this.speed.SwimmingToAnemone; // swim left
      }
      else {
        this.vy = 0; // keep y position
      }
    }

    // step3: let fish food float to the anemone
    // fishFood.floatsToAnemone(anemone);





  }


}
