class FoodTrackerForGoby extends FoodTracker {
  // constructor() {
  constructor(foodTrackerImg) {
    super(foodTrackerImg);

    this.x = 367;

    this.containerImage = {
      img: foodTrackerImg,
      x: 700, //300
      y: 50,
    };
  }
}
