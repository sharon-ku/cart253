class Frog {
  constructor(x, y) {
    // size information
    this.scale = 2;
    this.width = 250 * this.scale; // original width: 250
    this.height = 200 * this.scale; //original height: 200
    // position information
    this.x = x;
    this.y = y;
    // velocity information
    this.vx = 0;
    this.vy = 0;
    this.speed = 100;
    // image information
    this.currentImage = 0; // sets the frog image
    this.framesElapsed = {
      forBlink: 0,
    };

    // tint information
    this.tint = {
      current: 140,
      normal: 140,
      lightning: 255,
    };

    // counting frames needed for blinking
    this.framesBtwEachImageForBlink = 10;
    this.framesNeededForBlinking = 10;
    this.framesNeededForEyesOpen = 50;
  }

  // displays frog image
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    tint(this.tint.current);
    image(frogImages[this.currentImage], 0, 0, this.width, this.height);
    pop();
  }

  // make frog's eyes blink
  blink() {
    this.framesElapsed.forBlink++;
    if (this.framesElapsed.forBlink === this.framesBtwEachImageForBlink) {
      if (this.currentImage === 0) {
        this.currentImage = 1;
        this.framesBtwEachImageForBlink = this.framesNeededForBlinking;
      } else if (this.currentImage === 1) {
        this.currentImage = 0;
        this.framesBtwEachImageForBlink = this.framesNeededForEyesOpen;
      }
      this.framesElapsed.forBlink = 0;

    }
  }

  // move frog
  move() {
    // constrain movement of frog to inside of canvas
    this.x = constrain(this.x, this.height / 2, width - this.height / 2);
    this.y = constrain(this.y, this.width / 2, height - this.width / 2);

    this.x += this.vx;
    this.y += this.vy;
  }

  // click left and right arrow keys to change velocity
  handleInput() {
    if (keyCode === RIGHT_ARROW) {
      this.vx = this.speed;
    } else if (keyCode === LEFT_ARROW) {
      this.vx = -this.speed;
    } else {
      this.vx = 0;
    }
  }

  // when lightning strikes, reveal frog's true colors
  setLightningTint() {
    this.tint.current = this.tint.lightning;
  }

  // reset frog's tint to normal after lightning passed
  resetNormalTint() {
    this.tint.current = this.tint.normal;
  }



}
