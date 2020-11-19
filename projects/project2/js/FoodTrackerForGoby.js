class FoodTrackerForGoby extends FoodTracker {
  constructor(foodTrackerImg) {
    super(foodTrackerImg);

    this.x = 367;

    // this image shows which tracker corresponds to which fish
    this.containerImage = {
      img: foodTrackerImg,
      x: 300,
      y: 50,
    };
  }
}
