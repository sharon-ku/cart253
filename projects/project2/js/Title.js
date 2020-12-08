class Title {
  constructor() {
    this.line1 = `HUNGRY`;
    this.line2 = `FISHIES`;
    this.fill = 255;
    this.rect = {
      fill:255,
      length: width/2,
      height: height/3,
      alpha: 120,
    };
  }

  display(font) {
    // push();
    // fill(this.rect.fill, this.rect.fill, this.rect.fill, this.rect.alpha);
    // rectMode(CENTER);
    // rect(width/2, height/4+25, this.rect.length, this.rect.height);
    // pop();

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
