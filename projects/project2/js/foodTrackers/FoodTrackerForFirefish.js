class FoodTrackerForFirefish extends FoodTracker {
  constructor(foodTrackerImg) {
    super(foodTrackerImg);
    this.x = 117;

    // this image shows which tracker corresponds to which fish
    this.containerImage = {
      img: foodTrackerImg,
      x: 50,
      y: 50,
    };
  }

}
