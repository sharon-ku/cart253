class Car extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.vx=5;
    this.width = 50;
    this.height = 20
    this.drunkenness = 0.2;
  }

  move() {
    this.veer();

    super.move();
  }

  veer() {
    let r = random();
    if (r < this.drunkenness) {
      // this causes it to sometimes lurch up or down at a random velocity)
      this.vy = random(-5,5);
    }
  }

  wrap() {
    super.wrap();

    if (this.y > height) {
      this.y -= height;
    }
    else if (this.y < height) {
      this.y += height;
    }
  }

  display() {
    super.display();

    push();
    rectMode(CENTER);
    noStroke();
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
