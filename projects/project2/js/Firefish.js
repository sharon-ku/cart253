class Firefish {
  constructor(firefishImg1, firefishImg2, firefishFoodTrackerImg) {
    this.img1 = firefishImg1;
    this.img2 = firefishImg2;
    this.currentImage = firefishImg1; // Set firefish's current image to first image
    this.framesElapsed = 0;
    this.framesBtwEachImage = 50;
    this.x = 500;
    this.y = 200;
    this.length = 160;
    this.width = 66;
    this.vx = 0;
    this.vy = 0;
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
    this.scale = {
      x: 1,
      y: 1,
    };
    this.numFoodEaten = 0;
    this.foodTracker = {
      img: firefishFoodTrackerImg,
      length: 236,
      height: 74,
      x: 50,
      y: 50,
    };
    // cloaca means orifice from which fish releases the poop
    this.cloacaX = 0;
    this.cloacaY = 0;
    this.vertDistBtwFishAndCloaca = 10;
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

    // Firefish's velocity changes depending on where the finger is with respect to its body
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

}
