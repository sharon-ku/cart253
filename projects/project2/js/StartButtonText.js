class StartButtonText {
  constructor() {
    this.string = `START`;
    this.x = 100;
    this.y = 100;
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

    this.x = width*1/5;
    this.y = height*4/5;

    textFont(bodyTextFont);
    text(this.string, this.x, this.y);
    pop();
  }

  // text enlarges
  hover(bodyTextFont) {
    this.size = this.sizeBigger;
    fill(this.fill.r, this.fill.g, this.fill.b);
    textAlign(CENTER, CENTER);
    textSize(this.size);
    textFont(bodyTextFont);
    text(this.text, this.x, this.y);
    pop();
  }

  // button text keeps size of initial setup
  setNormalSize() {
    this.size = this.sizeSmaller;
  }
}
