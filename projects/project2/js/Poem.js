class Poem {
  constructor(poemFont, x, y) {
    this.poemLines = `Little Firefishy is now well fed,
      Watch it go, off to bed...,
      It suddenly feels something moving in its belly,
      Looks like it gave birth to adorable food babies!`;
    this.font = poemFont;
    this.x = x;
    this.y = y;
    this.size = 30;
    this.fillR = 255;
    this.fillG = 255;
    this.fillB = 255;
  }

  // display lines of poem
  display() {
    push();
    textAlign(CENTER);
    fill(this.fillR, this.fillG, this.fillB);
    textFont(this.font, this.size);
    text(this.poemLines, this.x, this.y);
    pop();
  }
}
