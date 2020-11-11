class Raindrop {
  constructor(x1, y1, x2, y2) {
    // position information
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    // velocity information
    this.vx = 0;
    this.vy = 5;
    this.maxSpeed = random(7,10);
    // acceleration information
    this.ax = 0;
    this.ay = 0;
    // for appearance
    this.strokeWeight = 2;
    this.stroke = {
      r: 0,
      g: 0,
      b: 0,
      lightning : {
        r: 255,
        g: 255,
        b: 255,
      },
    };
  }

  // apply gravitational force to raindrop's y acceleration
  gravity(gravitationalForce) {
    this.ay = gravitationalForce;
  }

  // move the raindrops
  move() {
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy,-this.maxSpeed, this.maxSpeed);

    this.vx += this.ax;
    this.vy += this.ay;

    this.x1 += this.vx;
    this.x2 += this.vx;
    this.y1 += this.vy;
    this.y2 += this.vy;
  }

  // wrap the raindrop back to the top if it goes off canvas
  wrap() {
    if (this.y1 > height) {
      this.y1 -= height * 1.1;
      this.y2 -= height * 1.1;
    }
  }

  // display a raindrop
  display() {
    push();
    stroke(this.stroke.r, this.stroke.g, this.stroke.b);
    strokeWeight(this.strokeWeight);
    line(this.x1, this.y1, this.x2, this.y2);
    pop();
  }
}
