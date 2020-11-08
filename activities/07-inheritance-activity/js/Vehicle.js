class Vehicle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = undefined;
    this.width = undefined;
    this.height = undefined;

  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  wrap() {
    if (this.x > width) {
      this.x-= width;
    }
    else if (this.x < 0) {
      this.x += width;
    }
  }



  display() {
    push();
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }


}
