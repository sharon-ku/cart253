class PoemLine {
  constructor(lineText, x, y) {
    this.line = lineText;
    this.font = bodyTextFont;
    this.x = x;
    this.y = y;
    this.size = 30;
    this.fillR = 255;
    this.fillG = 255;
    this.fillB = 255;
  }

  // display lines of poem
  show() {
    push();
    textAlign(CENTER);
    fill(this.fillR, this.fillG, this.fillB);
    textFont(this.font, this.size);
    text(this.line, this.x, this.y);
    pop();
  }
}
