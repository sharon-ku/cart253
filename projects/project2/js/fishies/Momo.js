class Momo extends Clownfish {
  constructor(fishImg1, fishImg2) {
    super(fishImg1, fishImg2);
    // size information
    this.length = 97;
    this.width = 50;

    // movement information
    this.speed = {
      casualSwimming: 4,
      followingFinger: 2,
      swimmingToAnemone: 2.5,
    };
    this.buffer = 10; // stop moving fish when it is within a certain buffer of the finger

    // variables used for perlin noise
    this.tx = 50;
    this.ty = 20;
    this.txChange = 0.006;
    this.tyChange = 0.050;

    // radius around fish where it can spot finger
    this.fieldOfVision = 350;

    // vertical distance between fish's center and fish's butt
    this.vertDistBtwFishAndCloaca = 0;

    // stores whether it is time to feed anemone or not
    this.timeToFeedAnemone = true;

    // minimum distance needed between fish and anemone for fish to release food securely to anemone
    this.distBufferToAnemone = {
      x: 20, // minimum horizontal distance //50
      y: 20, // minimum vertical distance //30
    }

    // is true if fish is keeping food inside its mouth
    this.foodInMouth = false;

    // put here for now
    // Information on special food that clownfish draws and carries to anemone when time to feed anemone
    this.specialFood = {
      // position information
      x: 0,
      y: 0,
      yOffset: 0, // y distance offset from fish image's mouth position
      // appearance information
      size: 15,
      fillR: 255,
      fillG: 221,
      fillB: 185,
      fillAlpha: 255,
      // acceptable distance from anemone to consider that food is overlapping with it
      distForAnemoneToAccept: 70, //50
    };
  }

  // put here for now
  // Fish follows a series of actions to feed the anemone
  // It's a tough yet rewarding procedure!
  // feedAnemone(anemone) {
  //   super.feedAnemone(anemone);
  //   // Calculate distance between fish and anemone
  //   let distBtwFishAndAnemone = dist(this.x, this.y, anemone.sprite.position.x, anemone.sprite.position.y);
  //
  //   // Make sure fish stays inside the tank
  //   this.stayInTank();
  //
  //   // Calculate distance where fish can safely release food
  //   let distBufferToAnemone = dist(0, 0, this.distBufferToAnemone.x, this.distBufferToAnemone.y);
  //   console.log(distBufferToAnemone);
  //
  //   // If fish is too far away from anemone, make it swim towards anemone
  //     // Update x velocity:
  //     // if fish is to the left of anemone
  //     if (this.x < anemone.sprite.position.x - this.distBufferToAnemone.x) {
  //       this.vx = this.speed.swimmingToAnemone; // swim right
  //     }
  //     // else if fish is to right of anemone
  //     else if (this.x > anemone.sprite.position.x + this.distBufferToAnemone.x) {
  //       this.vx = -this.speed.swimmingToAnemone; // swim left
  //     }
  //     // else if fish is neither to left or right of anemone
  //     else {
  //       this.vx = 0; // keep x position
  //     }
  //
  //     // Update y velocity:
  //     // if fish is on top of anemone
  //     if (this.y < anemone.sprite.position.y - this.distBufferToAnemone.y) {
  //       this.vy = this.speed.swimmingToAnemone; // swim down
  //     }
  //     // else if fish is under anemone
  //     else if (this.y > anemone.sprite.position.y + this.distBufferToAnemone.y) {
  //       this.vy = -this.speed.swimmingToAnemone; // swim up
  //     }
  //     // else if fish is neither over nor under anemone
  //     else {
  //       this.vy = 0; // keep y position
  //     }
  //
  //     // Update x and y position with velocity values
  //     this.x += this.vx;
  //     this.y += this.vy;
  //   }


  // interactsWithFood(fishFood, anemone, fishName) {
  //   super.interactsWithFood(fishFood,anemone,fishName);
  //   // If it's time to feed anemone:
  //   if (this.timeToFeedAnemone) {
  //     if (!this.foodInMouth) {
  //       if (this.overlapsWithFood(fishFood)) {
  //         this.foodInMouth = true;
  //         return true;
  //       }
  //     }
  //   }
  //   // If it's not time to feed anemone:
  //   else if (!this.timeToFeedAnemone) {
  //     // update numFoodEaten counter
  //     if (this.overlapsWithFood(fishFood)) {
  //       this.numFoodEaten++;
  //       // check if fish is full
  //       if (this.numFoodEaten === totalFood) {
  //         this.isFull = true;
  //       }
  //
  //       // decide if the next food it receives will be fed to the anemone
  //       this.decideIfTimeToFeedAnemone();
  //       console.log(`Momo timeToFeedAnemone= ` + this.timeToFeedAnemone);
  //       console.log(`Momo numFoodEaten = ` + this.numFoodEaten);
  //
  //       return true;
  //     }
  //   }
  //
  //   return false;
  //
  //
  // }


  // put display, close, and move here for now
  // Display fish food
  // displaySpecialFood() {
  //   push();
  //   fill(this.specialFood.fillR, this.specialFood.fillG, this.specialFood.fillB, this.specialFood.fillAlpha);
  //   ellipse(this.specialFood.x, this.specialFood.y, this.specialFood.size);
  //   pop();
  // }

  // If food is close enough to be eaten by anemone, return true
  // specialFoodCloseToAnemone(anemone) {
  //   super.specialFoodCloseToAnemone(anemone);
  //   if (this.specialFood.x < (anemone.sprite.position.x + this.specialFood.distForAnemoneToAccept) &&
  //     this.specialFood.x > (anemone.sprite.position.x - this.specialFood.distForAnemoneToAccept) &&
  //     this.specialFood.y < (anemone.sprite.position.y + this.specialFood.distForAnemoneToAccept) &&
  //     this.specialFood.y > (anemone.sprite.position.y - this.specialFood.distForAnemoneToAccept)) {
  //     return true;
  //     console.log(`yes`);
  //   } else {
  //     return false;
  //     console.log(`NOPE`);
  //   }
  // }

  // Set fish food to fish's mouth position + move food with fish
  // moveSpecialFood() {
  //   super.moveSpecialFood();
  //   // Set y value to same y value as fish
  //   this.specialFood.y = this.y + this.specialFood.yOffset;
  //
  //   // Set x value to fish's mouth's x position
  //   // if food to left of anemone, that means fish is swimming right
  //   // if (this.specialFood.x < anemone.sprite.position.x) {
  //   //   this.specialFood.x = this.x + this.length / 2; // food on right side of body
  //   // }
  //   if (this.scale.x > 0) {
  //     this.specialFood.x = this.x + this.length / 2; // food on right side of body
  //   }
  //   // else if food to right of anemone, that means fish is swimming left
  //   else {
  //     this.specialFood.x = this.x - this.length / 2; // food on left side of body
  //   }
  // }

}
