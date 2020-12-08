class Nene extends Clownfish {
  constructor(fishImg1, fishImg2) {
    super(fishImg1, fishImg2);
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
    this.vertDistBtwFishAndCloaca = 0;

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


  interactsWithFood(fishFood, anemone, fishName) {
    super.interactsWithFood(fishFood,anemone,fishName);
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
        // console.log(`Nene timeToFeedAnemone= ` + this.timeToFeedAnemone);
        // console.log(`Nene numFoodEaten = ` + this.numFoodEaten);

        return true;
      }
    }

    return false;


  }

}
