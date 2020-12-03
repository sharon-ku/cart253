class FoodTracker {
  constructor(foodTrackerImg) {
    this.x = undefined;
    this.y = undefined; // originally, 80
    this.length = 0;
    this.totalLength = 156*4/5;
    this.height = 13*4/5;
    this.radius = 15; //radius of edge of rounded rectangle
    this.fill = { // lime green
      r: 219,
      g: 220,
      b: 100,
    };
    // this image shows the tracker corresponding to the fish
    this.containerImage = {
      img: foodTrackerImg,
      xOffset: -54,
      yOffset: -24,
      length: 236*4/5,
      height: 74*4/5,
    };
  }

  // display the food tracker
  display() {
    push();
    // display food tracker image
    image(this.containerImage.img, this.x+this.containerImage.xOffset, this.y+this.containerImage.yOffset, this.containerImage.length, this.containerImage.height);

    // display bar that updates when fish eats food
    fill(this.fill.r, this.fill.g, this.fill.b);
    rect(this.x, this.y, this.length, this.height, this.radius);
    pop();
  }

  // Update food tracker every time food is eaten by fish
  updateBar(fish, totalFood) {
    this.length = map(fish.numFoodEaten, 0, totalFood, 0, this.totalLength);

    // ensure that bar does not exceed its total length
    if (fish.numFoodEaten >= totalFood) {
      this.length = this.totalLength;
    }
  }

}
