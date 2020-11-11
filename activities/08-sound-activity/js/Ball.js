class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(50, 100);
    this.speed = 5;
    this.vx = random(-this.speed, this.speed);
    this.vy = random(-this.speed, this.speed);
    this.fill = {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255),
    }
  }

  // move ball
  move() {
    // let change = random();
    //
    // if (change < 0.05) {
    //   this.vx =
    //   this.vy = random(-this.speed, this.speed);
    // }

    this.x += this.vx;
    this.y += this.vy;

    // this.x = constrain(this.x, 0, width);
    // this.y = constrain(this.y, 0, height);
  }


  // bounce ball
  bounce() {
    if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
      this.vx = -this.vx;
    }

    if (this.y - this.size/2 < 0 || this.y +this.size/2> height) {
      this.vy = -this.vy;
    }
  }

  // display ball
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }


}
