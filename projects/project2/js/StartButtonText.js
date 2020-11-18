class StartButtonText {
  constructor(x,y) {
    this.string = `START`;
    this.x = x;
    this.y = y;
    this.size = 30;
    this.sizeBigger = 40;
    this.sizeSmaller = 30;
    this.fill = {
      r: 255,
      g: 255,
      b: 255,
    };
  }

  // display the text
  display(bodyTextFont) {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    textSize(this.size);
    textAlign(CENTER, CENTER);
    textFont(bodyTextFont);
    text(this.string, this.x, this.y);
    pop();
  }

  // text enlarges
  hover() {
    this.size = this.sizeBigger;
  }

  // button text keeps size of initial setup
  setNormalSize() {
    this.size = this.sizeSmaller;
  }
}
