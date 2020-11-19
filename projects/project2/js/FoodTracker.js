class FoodTracker {
  constructor(foodTrackerImg) {
    this.x = undefined;
    this.y = 80;
    this.length = 0;
    this.totalLength = 156;
    this.height = 13;
    this.radius = 15; //radius of edge of rounded rectangle
    this.fill = { // lime green
      r: 219,
      g: 220,
      b: 100,
    };
    // this image shows which tracker corresponds to which fish
    this.containerImage = {
      img: foodTrackerImg,
      length: 236,
      height: 74,
      x: undefined,
      y: undefined,
    };
  }

  // display the food tracker
  display() {
    push();
    // display food tracker image
    image(this.containerImage.img, this.containerImage.x, this.containerImage.y, this.containerImage.length, this.containerImage.height);

    // display bar that updates when fish eats food
    fill(this.fill.r, this.fill.g, this.fill.b);
    rect(this.x, this.y, this.length, this.height, this.radius);
    pop();
  }

  // Update food tracker every time food is eaten by fish
  updateBar(fish, totalFood) {
    this.length = map(fish.numFoodEaten, 0, totalFood, 0, this.totalLength);
  }

}
