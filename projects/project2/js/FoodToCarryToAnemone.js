class FoodToCarryToAnemone {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.speedMax = 0.2; //1
    this.speed = random(0, this.speedMax);
    this.ax = 0;
    this.ay = 0;
    this.accelerationMax = 0.5; //2
    this.accelerationX = random(-this.accelerationMax, this.accelerationMax);
    this.accelerationY = 0.5;
    // this.size = random(10,20);
    this.size = 15;
    this.fillR = 255;
    // this.fillG = random(165, 221);
    // this.fillB = random(82, 185);
    this.fillG = 200;
    this.fillB = 200;
    this.fillAlpha = 255;
  }

  // display fish food
  display() {
    push();
    fill(this.fillR, this.fillG, this.fillB, this.fillAlpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // if food overlaps with anemone, return true
  closeToAnemone(anemone, fishName) {
      if (this.x < (anemone.sprite.position.x+50) &&
          this.x > (anemone.sprite.position.x-50) &&
          this.y < (anemone.sprite.position.y+50) &&
          this.y > (anemone.sprite.position.y-50)) {
            // // set timeToFeedAnemone to false for this turn
            // fishName.timeToFeedAnemone = false;
            // // food no longer in fishs' mouth
            // fishName.foodInMouth = false;
            // // // remove food from fishFoods array
            // // fishFoods.splice(i, 1);
            // // decide if on next turn, fish needs to feed anemone
            // fishName.decideIfTimeToFeedAnemone();
            return true;
            // console.log(`fishFoods.length = ` +fishFoods.length);
            // return;
      }
      else {
        return false;
      }
  }

  // set fish food to fish's mouth position + move food with fish
  move(fishName) {
    this.y = fishName.y;

    if (this.x < anemone.sprite.position.x) {
      this.x = fishName.x + fishName.length/2; // food on right side of body
    }
    else if (this.x > anemone.sprite.position.x) {
      this.x = fishName.x - fishName.length/2; // food on left side of body
    }
  }


}
