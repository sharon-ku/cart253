class FoodTrackerForGoby extends FoodTracker {
  constructor(foodTrackerImg) {
    super(foodTrackerImg);

    this.x = 367;

    this.containerImage = {
      img: foodTrackerImg,
      x: 300,
      y: 50,
    };
  }
}
