class Raindrop {
  constructor() {
    // size information
    this.length = random(10,50);
    // position information
    this.x1 = random(0, width);
    this.y1 = random(-height, 0);
    this.x2 = this.x1;
    this.y2 = this.y1 + this.length;
    // velocity information
    this.vx = 0;
    this.vy = 8;
    this.maxSpeed = random(10,30);
    // acceleration information
    this.ax = 0;
    this.ay = 0;
    // for appearance
    this.strokeWeight = 2;
    this.stroke = {
      r: random(135,255),
      g: random(135,255),
      b: random(135,255),
      alpha: random(50,150),
      normal: { // stroke color when no lightning
        r: random(135,255),
        g: random(135,255),
        b: random(135,255),
      },
      lightning : { // stroke color when there is lightning
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

  // wrap the raindrop back to the top if it goes off canvas + play a note
  wrap() {
    if (this.y1 > height - random(-100,200)) {
      this.y1 -= height * 1.1;
      this.y2 -= height * 1.1;
    }
  }

  // change stroke color due to lightning
  changeToLightningColor() {
    this.stroke.r = this.stroke.lightning.r;
    this.stroke.g = this.stroke.lightning.g;
    this.stroke.b = this.stroke.lightning.b;
  }

  // after lightning, reset stroke color
  resetColor() {
    this.stroke.r = this.stroke.normal.r;
    this.stroke.g = this.stroke.normal.g;
    this.stroke.b = this.stroke.normal.b;
  }

  // display a raindrop
  display() {
    push();
    stroke(this.stroke.r, this.stroke.g, this.stroke.b, this.stroke.alpha);
    strokeWeight(this.strokeWeight);
    line(this.x1, this.y1, this.x2, this.y2);
    pop();
  }
}
