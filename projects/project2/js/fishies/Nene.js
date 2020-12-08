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
      swimmingToAnemone: 1,
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
    this.timeToFeedAnemone = true;

    // minimum distance needed between fish and anemone for fish to release food securely to anemone
    this.distBufferToAnemone = {
      x: 50, // minimum horizontal distance
      y: 30, // minimum vertical distance
    }

    // is true if fish is keeping food inside its mouth
    this.foodInMouth = false;
  }

  // Decide if it is time for the clownfish to feed the anemone
  decideIfTimeToFeedAnemone() {
    super.decideIfTimeToFeedAnemone();
    // It is time to feed anemone 50% of the time
    if (random() < 0.5) {
      this.timeToFeedAnemone = true;
    } else {
      this.timeToFeedAnemone = false;
    }
  }

  // Fish follows a series of actions to feed the anemone
  // It's a tough yet rewarding procedure!
  feedAnemone(fishFood, anemone, fishName) {

    // Calculate distance between fish and anemone
    let distBtwFishAndAnemone = dist(this.x, this.y, anemone.sprite.position.x, anemone.sprite.position.y);

    // Make sure fish stays inside the tank
    this.stayInTank();

    // Calculate distance where fish can safely release food
    let distBufferToAnemone = dist(0, 0, this.distBufferToAnemone.x, this.distBufferToAnemone.y);

    // If fish is too far away from anemone, make it swim towards anemone
    if (distBtwFishAndAnemone > distBufferToAnemone) {
      // Update x velocity:
      // if fish is to the left of anemone
      if (this.x < anemone.sprite.position.x - this.distBufferToAnemone.x) {
        this.vx = this.speed.swimmingToAnemone; // swim right
      }
      // else if fish is to right of anemone
      else if (this.x > anemone.sprite.position.x + this.distBufferToAnemone.x) {
        this.vx = -this.speed.swimmingToAnemone; // swim left
      }
      // else if fish is neither to left or right of anemone
      else {
        this.vx = 0; // keep x position
      }

      // Update y velocity:
      // if fish is on top of anemone
      if (this.y < anemone.sprite.position.y - this.distBufferToAnemone.y) {
        this.vy = this.speed.swimmingToAnemone; // swim down
      }
      // else if fish is under anemone
      else if (this.y > anemone.sprite.position.y + this.distBufferToAnemone.y) {
        this.vx = -this.speed.swimmingToAnemone; // swim up
      }
      // else if fish is neither over nor under anemone
      else {
        this.vy = 0; // keep y position
      }

      // Update x and y position with velocity values
      this.x += this.vx;
      this.y += this.vy;
    }
  }

  // If food overlaps with fish's body, add to numFoodEaten counter or feed food to anemone, check if fish is full, and return true
  // Override interactsWithFood method from Fish.js
  interactsWithFood(fishFood, anemone, fishName) {
    // If it's time to feed anemone:
    if (this.timeToFeedAnemone) {
      if (!this.foodInMouth) {
        if (this.overlapsWithFood(fishFood)) {
          this.foodInMouth = true;
          return true;
        }
      }
    }
    // If it's not time to feed anemone:
    else if (!this.timeToFeedAnemone) {
      // update numFoodEaten counter
      if (this.overlapsWithFood(fishFood)) {
        this.numFoodEaten++;
        // check if fish is full
        if (this.numFoodEaten === totalFood) {
          this.isFull = true;
        }

        // decide if the next food it receives will be fed to the anemone
        this.decideIfTimeToFeedAnemone();
        console.log(`timeToFeedAnemone= ` + this.timeToFeedAnemone);
        console.log(`numFoodEaten clownfish = ` + this.numFoodEaten);

        return true;
      }
    }

    return false;
  }


}
