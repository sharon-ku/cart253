class Poem {
  constructor(poemFont, x, y) {
    this.poemLines = `All the fishies are now well fed,
      Watch them go, off to bed...
      They suddenly feel something moving in their bellies,
      Looks like they gave birth to adorable food babies!`;
    this.font = poemFont;
    this.x = x;
    this.y = y;
    this.size = 30;
    this.fill = {
      r: 255,
      g: 255,
      b: 255,
    };
  }

  // display lines of poem
  display() {
    push();
    textAlign(CENTER);
    fill(this.fill.r, this.fill.g, this.fill.b);
    textFont(this.font, this.size);
    text(this.poemLines, this.x, this.y);
    pop();
  }
}
