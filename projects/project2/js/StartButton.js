class StartButton {
  constructor() {
    this.size = 130;
    this.sizeBigger = 150;
    this.sizeSmaller = 130;
    this.x = 100;
    this.y = 100;
    this.fill = {
      // vivid sky blue
      r: 10,
      g: 205,
      b: 255,
      rHover: 10,
      gHover: 205,
      bHover: 255,
      alpha: 200,
    };
  }

  // display the button
  display(startButtonText) {
    push();
    this.x = startButtonText.x;
    this.y = startButtonText.y;

    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }


  // Start button enlarges and changes color
  hover() {
    push();
    this.size = this.sizeBigger;
    fill(this.fill.rHover, this.fill.gHover, this.fill.bHover, this.fill.alpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // Start button keeps size of initial setup
  setNormalSize() {
    this.size = this.sizeSmaller;
  }
}
