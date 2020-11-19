class Goby extends Fish {
  constructor(fishImg1, fishImg2, fishFoodTrackerImg) {
    super(fishImg1, fishImg2, fishFoodTrackerImg)

    this.x = random(0,width);
    this.y = random(0,height);
    this.length = 130;
    this.width = 39;

    this.speed = {
      casualSwimming: 5,
      followingFinger: 1.5,
    };
    this.buffer = 10;
    this.tx = 0;
    this.ty = 5;
    this.txChange = 0.025;
    this.tyChange = 0.025;
    this.fieldOfVision = 350;

    // this.numFoodEaten = 0;
    // this.foodTracker = {
    //   // img: firefishFoodTrackerImg,
    //   img: fishFoodTrackerImg,
    //   // length: 236,
    //   // height: 74,
    //   x: 300,
    //   y: 50,
    // };

    this.vertDistBtwFishAndCloaca = 10;
  }

}
