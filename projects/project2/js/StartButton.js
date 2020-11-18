class StartButton {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = 130;
    this.sizeBigger = 150;
    this.sizeSmaller = 130;
    this.fill = {
      // vivid sky blue
      r: 10,
      g: 205,
      b: 255,
      alpha: 220,
    };
  }

  // display the button
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // button enlarges
  hover() {
    this.size = this.sizeBigger;
  }

  // Start button keeps size of initial setup
  setNormalSize() {
    this.size = this.sizeSmaller;
  }
}
