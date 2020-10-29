class Vehicle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    // it knows about width and height but it doesn't have one
    this.width = undefined;
    this.height = undefined;
    this.vx = 0; // it knows about velocity but it doesn't have one
    this.vy = 0;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  wrap() {
    if (this.x > width) {
      this.x -= width;
    }
  }

  display() {
    // define this in the subclasses!
  }
}
