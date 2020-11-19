class Firefish extends Fish {
  
  constructor(fishImg1, fishImg2, fishFoodTrackerImg) {
    super(fishImg1, fishImg2, fishFoodTrackerImg)
    this.x = 500;
    this.y = 200;
    this.length = 160;
    this.width = 66;
    this.speed = {
      casualSwimming: 5,
      followingFinger: 1.5,
    };
    this.buffer = 10;
    this.tx = 0;
    this.ty = 10;
    this.txChange = 0.025;
    this.tyChange = 0.025;
    this.fieldOfVision = 350;
    // this.numFoodEaten = 0;
    // this.foodTracker = {
    //   // img: firefishFoodTrackerImg,
    //   img: fishFoodTrackerImg,
    //   // length: 236,
    //   // height: 74,
    //   x: 50,
    //   y: 50,
    // };
    this.vertDistBtwFishAndCloaca = 10;
  }


}
