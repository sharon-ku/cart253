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

  // set the text to move with the button shape's position
  move(buttonShape) {
    this.x = buttonShape.x;
    this.y = buttonShape.y;
  }
}
