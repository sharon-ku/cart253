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
    this.distBufferToAnemone = {
      x: 100,
      y: 30,
    }

    // returns true if fish is keeping food inside its mouth
    this.foodInMouth = false;

    // returns true if this is a clownfish
    this.isAClownfish = true;
  }

  // Decide if it is time for the clownfish to feed the anemone
  decideIfTimeToFeedAnemone() {
    super.decideIfTimeToFeedAnemone();
    // It is time to feed anemone 50% of the time
    if (random() < 0.5) {
      this.timeToFeedAnemone = true;
    }
    else {
      this.timeToFeedAnemone = false;
    }
  }

  // Fish follows a series of actions to feed the anemone
  // It's a tough yet rewarding procedure!
  feedAnemone(fishFood, anemone) {
    //  step 1: store food in mouth
    let distBtwFishAndAnemone = dist(this.x, this.y, anemone.sprite.position.x, anemone.sprite.position.y);
    // set fish foods' position to fish's position
    fishFood.x = this.x;
    fishFood.y = this.y;
    this.foodInMouth = true;

    // step 2: once food is in fish's mouth, swim to the anemone
    // if it's already close to the anemone, then proceed to step 3
    if (distBtwFishAndAnemone > this.distBufferToAnemone.x) {
      if (this.x < anemone.sprite.position.x - this.distBufferToAnemone.x) {
        this.vx = this.speed.swimmingToAnemone; // swim right
        // this.scale.x = 1; // face right
      }
      else if (this.x > anemone.sprite.position.x + this.distBufferToAnemone.x) {
        this.vx = -this.speed.swimmingToAnemone; // swim left
        // this.scale.x = -1; // face left
      }
      else {
        this.vx = 0; // keep x position
        // this.scale.x = 1; // face right
      }

      if (this.y < anemone.sprite.position.y - this.distBufferToAnemone.y) {
        this.vy = this.speed.swimmingToAnemone; // swim down
      }
      else if (this.y > anemone.sprite.position.y + this.distBufferToAnemone.y) {
        this.vx = -this.speed.swimmingToAnemone; // swim left
      }
      else {
        this.vy = 0; // keep y position
      }

      this.x += this.vx;
      this.y += this.vy;

      // set direction that fish faces
      if (this.x < anemone.sprite.position.x) {
        this.scale.x = 1; // face right
      }
      else if (this.x > anemone.sprite.position.x) {
        this.scale.x = -1; // face left
      }
    }
    else {
      this.decideIfTimeToFeedAnemone();
    }
    // step3: let fish food float to the anemone
    // fishFood.floatsToAnemone(anemone);




    // this.decideIfTimeToFeedAnemone();
  }


}
