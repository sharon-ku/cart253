class FoodTrackerForNene extends FoodTracker {
  constructor(foodTrackerImg) {
    super(foodTrackerImg);
    this.x = width-230;
    this.y= 310;

    // this image shows which tracker corresponds to which fish
    this.containerImage = {
      img: foodTrackerImg,
      x: this.x-67,
      y: this.y-30,
    };
  }
}
