class ButtonShape extends Button {
  constructor(x,y) {
    super(x,y);
  }

  // display the button
  display() {
    super.display();

    push();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
