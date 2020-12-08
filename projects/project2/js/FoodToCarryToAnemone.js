// Acknowledgment!
// I dedicate this part of the code to Pippin for helping me think through the logic
// He recommended I make a "special" food separate from the fishFoods array to feed the anemone

class FoodToCarryToAnemone {
  constructor() {
    // position information
    this.x = 0;
    this.y = 0;
    // appearance information
    this.size = 15;
    this.fillR = 255;
    this.fillG = 200;
    this.fillB = 200;
    this.fillAlpha = 255;
    // acceptable distance from anemone to consider that food is overlapping with it
    this.distBufferToAnemone = 50;
  }

  // Display fish food
  display() {
    push();
    fill(this.fillR, this.fillG, this.fillB, this.fillAlpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // If food is close enough to be eaten by anemone, return true
  closeToAnemone(anemone, fishName) {
    if (this.x < (anemone.sprite.position.x + this.distBufferToAnemone) &&
      this.x > (anemone.sprite.position.x - this.distBufferToAnemone) &&
      this.y < (anemone.sprite.position.y + this.distBufferToAnemone) &&
      this.y > (anemone.sprite.position.y - this.distBufferToAnemone)) {
      return true;
    } else {
      return false;
    }
  }

  // Set fish food to fish's mouth position + move food with fish
  move(fishName) {
    // Set y value to same y value as fish
    this.y = fishName.y;

    // Set x value to fish's mouth's x position
    // if food to left of anemone, that means fish is swimming right
    if (this.x < anemone.sprite.position.x) {
      this.x = fishName.x + fishName.length / 2; // food on right side of body
    }
    // else if food to right of anemone, that means fish is swimming left
    else if (this.x > anemone.sprite.position.x) {
      this.x = fishName.x - fishName.length / 2; // food on left side of body
    }
  }


}
