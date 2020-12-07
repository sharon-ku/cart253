class DemoFish {
  constructor(demoFishImg1, demoFishImg2) {
    this.x = -100;
    this.y = height-250;
    this.xDestination = width/2-150;
    this.img1 = demoFishImg1;
    this.img2 = demoFishImg2;
    this.length = 480;
    this.height = 197;
    this.vx = 0;
    this.vy = 0;
    this.speed = 3;
    // circle that expands around demoFish
    this.ring = {
      // stroke information
      strokeWeight: 5,
      strokeFill: {
        r: 255,
        g: 255,
        b: 255,
      },
      // alpha information (for stroke fill)
      alpha: {
        current: 0,
        min: 0,
        max: 100,
      },
      // size information
      size: {
        current: -50,
        min: -50,
        max: 700,
        increaseRate: 8,
      },
    };
  }

  // Display demo fish
  display() {
    push();
    imageMode(CENTER);
    image(this.img1, this.x, this.y);
    pop();
  }

  // Display circle that expands around demoFish
  displayRing() {
    push();
    noFill();
    strokeWeight(this.ring.strokeWeight);
    stroke(this.ring.strokeFill.r, this.ring.strokeFill.g, this.ring.strokeFill.b, this.ring.alpha.current);
    // ellipse(this.x + this.length/2, this.y + 10, this.ring.size.current);
    ellipse(this.x, this.y, this.ring.size.current);
    pop();
  }

  // Increase the ring attached to demoFish
  increaseRingSize() {
    // increase the ring's size until it reaches max size
    if (this.ring.size.current < this.ring.size.max) {
      this.ring.size.current += this.ring.size.increaseRate;
    }
    // if ring reaches max size, set it back to min size
    else if (this.ring.size.current >= this.ring.size.max) {
      this.ring.size.current = this.ring.size.min;
    }
  }

  // Change the alpha of the ring, mapped to its size
  // As ring expands, its alpha decreases
  changeRingAlpha() {
    this.ring.alpha.current = map(this.ring.size.current, this.ring.size.min, this.ring.size.max, this.ring.alpha.max, this.ring.alpha.min);
  }



  // Move demo fish
  move() {
    if (this.x < this.xDestination) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }

    // Move demo fish
    demoFish.x += demoFish.vx;
    demoFish.y += demoFish.vy;
  }

  // Floating demo fish
}
