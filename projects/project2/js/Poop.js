class Poop {
  constructor(fishX, fishY) {
    this.x = fishX;
    this.y = fishY;
    this.vx = 0;
    this.vy = 0;
    this.speed = 1;
    this.ax = 0;
    this.ay = 0;
    this.acceleration = 3;
    this.size = 5;
    this.fillR = 102;  // poop brown color
    this.fillG = 75;
    this.fillB = 0;
  }

  // display poop pebble
  show() {
    push();
    fill(this.fillR, this.fillG, this.fillB);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // poop flows upwards --> it knows how to fly!
  move() {
    this.ay = -this.acceleration;
    this.vx = this.speed;
    this.vy = this.speed;
    this.x +=  this.vx + this.ax;
    this.y +=  this.vy + this.ay;
  }
}
