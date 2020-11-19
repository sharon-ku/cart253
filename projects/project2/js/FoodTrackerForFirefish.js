class FoodTrackerForFirefish extends FoodTracker {
  // constructor() {
  constructor(foodTrackerImg) {
    super(foodTrackerImg);

    this.x = 117;

    this.containerImage = {
      img: foodTrackerImg,
      x: 50,
      y: 50,
    };
  }

}
