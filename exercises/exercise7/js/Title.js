class Title {
  constructor() {
    this.line1 = `HUNGRY`;
    this.line2 = `FISHIES`;
    this.fill = 255;
  }

  display(font) {
    push();
    fill(this.fill);
    textSize(height/8);
    textAlign(CENTER,CENTER);
    textFont(font);
    text(this.line1, width/2, height/5);
    text(this.line2, width/2, height/3);
    pop();
  }
}
