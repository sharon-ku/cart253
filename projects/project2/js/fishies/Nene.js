class Nene extends Fish {
  constructor(fishImg1, fishImg2) {
    super(fishImg1, fishImg2)
    // size information
    this.length = 107;
    this.width = 57;
    // movement information
    this.speed = {
      casualSwimming: 5,
      followingFinger: 1.5, //1.5
      swimmingToAnemone: 1.5, //1.5
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

    // returns true if fish is keeping food inside its mouth
    this.foodInMouth = false;

    // returns true if this is a clownfish
    this.isAClownfish = true;

    // returns true if fish is close enough to release food to anemone
    this.timeToReleaseFoodToAnemone = false;

    // // food information (fish draws this food when it goes to feed the anemone)
    // this.food = {
    //   fillR: 255,
    //   fillG: 200,
    //   fillB: 100,
    // }
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
  feedAnemone(fishFood, anemone, fishName) {

    //  step 1: store food in mouth
    let distBtwFishAndAnemone = dist(this.x, this.y, anemone.sprite.position.x, anemone.sprite.position.y);
    // console.log(distBtwFishAndAnemone);


    // set fish foods' position to fish's mouth position
    // and set direction that fish faces when swimming
    // fishFood.y = this.y;
    //
    // if (this.x < anemone.sprite.position.x) {
    //   this.scale.x = 1; // face right
    //   fishFood.x = this.x + this.length/2; // food on right side of body
    // }
    // else if (this.x > anemone.sprite.position.x) {
    //   this.scale.x = -1; // face left
    //   fishFood.x = this.x - this.length/2; // food on left side of body
    // }
    // console.log(fishFood.x, fishFood.y);

    // step 2: once food is in fish's mouth, swim to the anemone until it is within range of releasing food
    // Make sure fish stays inside the tank
    this.stayInTank();


    // calculate distance where fish can safely release food
    let distBufferToAnemone = dist(0,0,this.distBufferToAnemone.x, this.distBufferToAnemone.y);

    if (distBtwFishAndAnemone > distBufferToAnemone) {
      if (this.x < anemone.sprite.position.x - this.distBufferToAnemone.x) {
        this.vx = this.speed.swimmingToAnemone; // swim right
      }
      else if (this.x > anemone.sprite.position.x + this.distBufferToAnemone.x) {
        this.vx = -this.speed.swimmingToAnemone; // swim left
      }
      else {
        this.vx = 0; // keep x position
      }

      if (this.y < anemone.sprite.position.y - this.distBufferToAnemone.y) {
        this.vy = this.speed.swimmingToAnemone; // swim down
      }
      else if (this.y > anemone.sprite.position.y + this.distBufferToAnemone.y) {
        this.vx = -this.speed.swimmingToAnemone; // swim up
      }
      else {
        this.vy = 0; // keep y position
      }

      this.x += this.vx;
      this.y += this.vy;


    }
  }

  // If food overlaps with fish's body, add to numFoodEaten counter or feed food to anemone
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
      else if (this.foodInMouth) {
        // this.feedAnemone(fishFood, anemone, fishName);
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
        console.log(`timeToFeedAnemone= `+ this.timeToFeedAnemone);
        console.log(`numFoodEaten clownfish = `+ this.numFoodEaten);

        return true;
      }
    }

    return false;
  }


}
