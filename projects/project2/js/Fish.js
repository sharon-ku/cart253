class Fish {
  constructor(fishImg1, fishImg2, fishFoodTrackerImg) {
    this.img1 = fishImg1;
    this.img2 = fishImg2;
    this.currentImage = fishImg1; // Set fish's current image to first image
    this.framesElapsed = 0;
    this.framesBtwEachImage = 50;
    this.x = undefined;
    this.y = undefined;
    this.length = undefined;
    this.width = undefined;
    this.vx = 0;
    this.vy = 0;
    this.speed = {
      casualSwimming: undefined,
      followingFinger: undefined,
    };
    this.buffer = undefined;
    this.tx = undefined;
    this.ty = undefined;
    this.txChange = undefined;
    this.tyChange = undefined;
    this.fieldOfVision = undefined;
    this.scale = {
      x: 1,
      y: 1,
    };
    this.numFoodEaten = 0;
    this.foodTracker = {
      img: fishFoodTrackerImg,
      length: 236,
      height: 74,
      x: undefined,
      y: undefined,
    };
    // cloaca means orifice from which fish releases the poop
    this.cloacaX = 0;
    this.cloacaY = 0;
    this.vertDistBtwFishAndCloaca = undefined;
  }

  // Fish faces direction it is swimming
  setDirection() {
    push();
    translate(this.x, this.y);
    if (this.vx > 0) {
      this.scale.x = 1; // face right
    } else {
      this.scale.x = -1; // face left
    }
    pop();
  }

  // Display fish
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(this.scale.x, this.scale.y);
    this.setDirection(); // Fish faces the direction it is swimming
    image(this.currentImage, 0, 0, this.length, this.width);
    pop();
  }

  // Fish switches between image 1 and image 2
  switchImages() {
    this.framesElapsed++;
    if (this.framesElapsed === this.framesBtwEachImage) {
      if (this.currentImage === this.img1) {
        this.currentImage = this.img2;
      } else {
        this.currentImage = this.img1;
      }
      this.framesElapsed = 0;
    }
  }

  // Fish swims randomly using Perlin noise
  casualSwimming(fishtank) {
    this.tx += this.txChange;
    this.ty += this.tyChange;

    let noiseX = noise(this.tx);
    let noiseY = noise(this.ty);

    let chanceOfChangingDirections = random();

    if (chanceOfChangingDirections < 0.05) {
      this.vx = map(noiseX, 0, 1, -this.speed.casualSwimming, this.speed.casualSwimming);
      this.vy = map(noiseY, 0, 1, -this.speed.casualSwimming, this.speed.casualSwimming);
    }

    this.x += this.vx;
    this.y += this.vy;

    this.x = constrain(this.x, fishtank.border, width - fishtank.border);
    this.y = constrain(this.y, fishtank.border, height - fishtank.border);
  }

  // Returns true if finger is within the fish's field of vision
  sensesFinger(finger) {
    if (dist(this.x, this.y, finger.x, finger.y) < this.fieldOfVision) {
      return true;
    } else {
      return false;
    }
  }

  // The fish follows the finger
  followsFinger(finger) {
    // Calculating distance from fish to finger
    let distX = this.x - finger.x;
    let distY = this.y - finger.y;

    // Fish's velocity changes depending on where the finger is with respect to its body
    if (distX < -this.buffer) {
      this.vx = this.speed.followingFinger;
    } else if (distX > this.buffer) {
      this.vx = -this.speed.followingFinger;
    } else {
      this.vx = 0; // Stop moving if the fish is within buffer of the finger
    }
    if (distY < 0) {
      this.vy = this.speed.followingFinger;
    } else if (distY > 0) {
      this.vy = -this.speed.followingFinger;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Setting the fish's direction (facing left or facing right)
    if (this.vx > 0) {
      this.scale.x = 1; // face right
    } else if (this.vx < 0 || this.vx === 0) {
      this.scale.x = -1; // face left
    }
  }

  // Calculating position of fish's cloaca
  determineCloacaLocation() {
    // Calculating x position of cloaca
    if (this.scale.x < 0) { // fish is facing left
      this.cloacaX = this.x + this.length / 2;
    } else { // fish is facing right
      this.cloacaX = this.x - this.length / 2;
    }

    // Calculating y position of cloaca
    this.cloacaY = this.y + this.vertDistBtwFishAndCloaca;
  }

}
