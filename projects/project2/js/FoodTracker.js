class FoodTracker {
  constructor() {
    this.x = 117;
    this.y = 80;
    this.length = 0;
    this.totalLength = 156;
    this.height = 13;
    this.radius = 15;
    // lime green
    this.fill = {
      r: 219,
      g: 220,
      b: 100,
    };
  }

  // display the food tracker
  display(specificFoodTracker) {
    push();
    // display food tracker image
    image(specificFoodTracker.img, specificFoodTracker.x, specificFoodTracker.y, specificFoodTracker.length, specificFoodTracker.height);

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
