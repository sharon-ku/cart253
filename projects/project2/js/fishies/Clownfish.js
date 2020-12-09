class Clownfish extends Fish {
  constructor(fishImg1, fishImg2) {
    super(fishImg1, fishImg2);
    // size information
    this.length = undefined;
    this.width = undefined;

    // movement information
    this.speed = {
      casualSwimming: undefined,
      followingFinger: undefined,
      swimmingToAnemone: undefined,
    };
    this.buffer = undefined; // stop moving fish when it is within a certain buffer of the finger

    // variables used for perlin noise
    this.tx = undefined;
    this.ty = undefined;
    this.txChange = undefined;
    this.tyChange = undefined;

    // radius around fish where it can spot finger
    this.fieldOfVision = undefined;

    // vertical distance between fish's center and fish's butt
    this.vertDistBtwFishAndCloaca = undefined;

    // stores whether it is time to feed anemone or not
    this.timeToFeedAnemone = undefined;

    // minimum distance needed between fish and anemone for fish to release food securely to anemone
    this.distBufferToAnemone = {
      x: undefined, // minimum horizontal distance
      y: undefined, // minimum vertical distance
    };

    // is true if fish is keeping food inside its mouth
    this.foodInMouth = undefined;

    // hide for now
    // // Information on special food that clownfish draws and carries to anemone when time to feed anemone
    // this.specialFood = {
    //   // position information
    //   x: 0,
    //   y: 0,
    //   // appearance information
    //   size: 30,
    //   fillR: 255,
    //   fillG: 200,
    //   fillB: 200,
    //   fillAlpha: 255,
    //   // acceptable distance from anemone to consider that food is overlapping with it
    //   distForAnemoneToAccept: 50,
    // };

    // mark as undefined for now -- will delete later
    // Information on special food that clownfish draws and carries to anemone when time to feed anemone
    this.specialFood = {
      // position information
      x: undefined,
      y: undefined,
      // appearance information
      size: undefined,
      fillR: undefined,
      fillG: undefined,
      fillB: undefined,
      fillAlpha: undefined,
      // acceptable distance from anemone to consider that food is overlapping with it
      distForAnemoneToAccept: undefined,
    };

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
  feedAnemone(anemone) {
    // Calculate distance between fish and anemone
    // let distBtwFishAndAnemone = dist(this.x, this.y, anemone.sprite.position.x, anemone.sprite.position.y);

    // Make sure fish stays inside the tank
    this.stayInTank();

    // Calculate distance where fish can safely release food
    let distBufferToAnemone = dist(0, 0, this.distBufferToAnemone.x, this.distBufferToAnemone.y);

    // If fish is too far away from anemone, make it swim towards anemone
    // if (distBtwFishAndAnemone > distBufferToAnemone) {
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
        this.vy = -this.speed.swimmingToAnemone; // swim up
      }
      // else if fish is neither over nor under anemone
      else {
        this.vy = 0; // keep y position
      }

      // Update x and y position with velocity values
      this.x += this.vx;
      this.y += this.vy;
    }
    // // Calculate distance between fish and anemone
    // let distBtwFishAndAnemone = dist(this.x, this.y, anemone.sprite.position.x, anemone.sprite.position.y);
    //
    // // Make sure fish stays inside the tank
    // this.stayInTank();
    //
    // // Calculate distance where fish can safely release food
    // let distBufferToAnemone = dist(0, 0, this.distBufferToAnemone.x, this.distBufferToAnemone.y);
    // console.log(distBufferToAnemone);
    //
    // // If fish is too far away from anemone, make it swim towards anemone
    // if (distBtwFishAndAnemone > distBufferToAnemone) {
    //   // Update x velocity:
    //   // if fish is to the left of anemone
    //   if (this.x < anemone.sprite.position.x - this.distBufferToAnemone.x) {
    //     this.vx = this.speed.swimmingToAnemone; // swim right
    //   }
    //   // else if fish is to right of anemone
    //   else if (this.x > anemone.sprite.position.x + this.distBufferToAnemone.x) {
    //     this.vx = -this.speed.swimmingToAnemone; // swim left
    //   }
    //   // else if fish is neither to left or right of anemone
    //   else {
    //     this.vx = 0; // keep x position
    //   }
    //
    //   // Update y velocity:
    //   // if fish is on top of anemone
    //   if (this.y < anemone.sprite.position.y - this.distBufferToAnemone.y) {
    //     this.vy = this.speed.swimmingToAnemone; // swim down
    //   }
    //   // else if fish is under anemone
    //   else if (this.y > anemone.sprite.position.y + this.distBufferToAnemone.y) {
    //     this.vx = -this.speed.swimmingToAnemone; // swim up
    //   }
    //   // else if fish is neither over nor under anemone
    //   else {
    //     this.vy = 0; // keep y position
    //   }
    //
    //   // Update x and y position with velocity values
    //   this.x += this.vx;
    //   this.y += this.vy;
    // }
  // }

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
        // console.log(`timeToFeedAnemone= ` + this.timeToFeedAnemone);
        // console.log(` numFoodEaten = ` + this.numFoodEaten);

        return true;
      }
    }

    return false;

    // // If it's time to feed anemone:
    // if (this.timeToFeedAnemone) {
    //   if (!this.foodInMouth) {
    //     if (this.overlapsWithFood(fishFood)) {
    //       this.foodInMouth = true;
    //       return true;
    //     }
    //   }
    // }
    // // If it's not time to feed anemone:
    // else if (!this.timeToFeedAnemone) {
    //   // update numFoodEaten counter
    //   if (this.overlapsWithFood(fishFood)) {
    //     this.numFoodEaten++;
    //     // check if fish is full
    //     if (this.numFoodEaten === totalFood) {
    //       this.isFull = true;
    //     }
    //
    //     // decide if the next food it receives will be fed to the anemone
    //     this.decideIfTimeToFeedAnemone();
    //     // console.log(`timeToFeedAnemone= ` + this.timeToFeedAnemone);
    //     // console.log(`numFoodEaten clownfish = ` + this.numFoodEaten);
    //
    //     return true;
    //   }
    // }
    //
    // return false;
  }

  // hide all these for now (dispay and move special food)
  // Display fish food
  displaySpecialFood() {
    push();
    fill(this.specialFood.fillR, this.specialFood.fillG, this.specialFood.fillB, this.specialFood.fillAlpha);
    ellipse(this.specialFood.x, this.specialFood.y, this.specialFood.size);
    pop();
  }

  // If food is close enough to be eaten by anemone, return true
  specialFoodCloseToAnemone(anemone) {
    // if (this.specialFood.x < (anemone.sprite.position.x + this.specialFood.distForAnemoneToAccept) &&
    //   this.specialFood.x > (anemone.sprite.position.x - this.specialFood.distForAnemoneToAccept) &&
    //   this.specialFood.y < (anemone.sprite.position.y + this.specialFood.distForAnemoneToAccept) &&
    //   this.specialFood.y > (anemone.sprite.position.y - this.specialFood.distForAnemoneToAccept)) {
    //   return true;
    //   console.log(`yes`);
    // } else {
    //   return false;
    //   console.log(`NOPE`);
    // }
    if (this.specialFood.x < (anemone.sprite.position.x + this.specialFood.distForAnemoneToAccept) &&
      this.specialFood.x > (anemone.sprite.position.x - this.specialFood.distForAnemoneToAccept) &&
      this.specialFood.y < (anemone.sprite.position.y + this.specialFood.distForAnemoneToAccept) &&
      this.specialFood.y > (anemone.sprite.position.y - this.specialFood.distForAnemoneToAccept)) {
        // console.log(`yes, food close to anemone`);
      return true;

    } else {
      // console.log(`NOPE, food not close to anemone`);
      return false;

    }
  }

  // Set fish food to fish's mouth position + move food with fish
  moveSpecialFood() {
    // Set y value to same y value as fish
    this.specialFood.y = this.y + this.specialFood.yOffset;

    // Set x value to fish's mouth's x position
    // if food to left of anemone, that means fish is swimming right
    if (this.scale.x > 0) {
      this.specialFood.x = this.x + this.length / 2; // food on right side of body
    }
    // else if food to right of anemone, that means fish is swimming left
    else {
      this.specialFood.x = this.x - this.length / 2; // food on left side of body
    }


    // // Set y value to same y value as fish
    // this.specialFood.y = this.y;
    //
    // // Set x value to fish's mouth's x position
    // // if food to left of anemone, that means fish is swimming right
    // if (this.specialFood.x < anemone.sprite.position.x) {
    //   this.specialFood.x = this.x + this.length / 2; // food on right side of body
    // }
    // // if (this.scale.x > 0) {
    // //   this.specialFood.x = this.x + this.length / 2; // food on right side of body
    // // }
    // // else if food to right of anemone, that means fish is swimming left
    // else {
    //   this.specialFood.x = this.x - this.length / 2; // food on left side of body
    // }
  }



}
