class ButtonText extends Button {
  constructor(x, y) {
    super(x, y);
    this.string = undefined;
    this.typeface = undefined;
  }

  // display the text
  display() {
    super.display();

    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    textSize(this.size);
    textAlign(CENTER, CENTER);
    textFont(this.typeface);
    text(this.string, this.x, this.y);
    pop();
  }

  move(startButtonCircle) {
    this.x = startButtonCircle.x;
    this.y = startButtonCircle.y;
  }
}
