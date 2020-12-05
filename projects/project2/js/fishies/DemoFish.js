class DemoFish {
  constructor(demoFishImg1, demoFishImg2) {
    this.x = -100;
    this.y = height-250;
    this.xDestination = width/2-150;
    this.img1 = demoFishImg1;
    this.img2 = demoFishImg2;
    this.vx = 0;
    this.vy = 0;
    this.speed = 3;
  }

  // Display demo fish
  display() {
    push();
    imageMode(CENTER);
    image(this.img1, this.x, this.y);
    pop();
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
