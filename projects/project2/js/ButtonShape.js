class ButtonShape extends Button {
  constructor(x,y) {
    super(x,y);

    this.vx = 0;
    this.vy = 0;
    this.speed = 2;
    this.change = 0;
  }

  // display the button
  display() {
    super.display();

    push();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // move the button randomly
  move() {
    // generates a random number between 0 and 1
    this.change = random();
    // change direction 0.5% of the time
    if (this.change < 0.005) {
      this.vx = random(-this.speed, this.speed);
      this.vy = random(-this.speed, this.speed);
    }
    this.x += this.vx;
    this.y += this.vy;
  }
}
