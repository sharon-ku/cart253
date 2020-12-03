class FoodTrackerForFirefish extends FoodTracker {
  constructor(foodTrackerImg) {
    super(foodTrackerImg);
    this.x = width-200;
    this.y= 130;

    // this image shows which tracker corresponds to which fish
    this.containerImage = {
      img: foodTrackerImg,
      x: this.x-54,
      y: this.y-24,
      length: 236*4/5,
      height: 74*4/5,
    };
  }

}
