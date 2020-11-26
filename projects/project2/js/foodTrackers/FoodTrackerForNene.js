class FoodTrackerForNene extends FoodTracker {
  constructor(foodTrackerImg) {
    super(foodTrackerImg);
    this.x = 617;

    // this image shows which tracker corresponds to which fish
    this.containerImage = {
      img: foodTrackerImg,
      x: 550,
      y: 50,
    };
  }
}
