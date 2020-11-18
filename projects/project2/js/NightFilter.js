class NightFilter {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.length = width;
    this.height = height;
    this.fill = { // dark blue
      r: 33,
      g: 63,
      b: 104,
      alpha: 0,
      alphaChangeRate: 1,
      finalAlpha: 130,
    };
  }

  display() {
    push();
    rectMode(CORNER);
    // Filter goes from transparent to more opaque
    this.fill.alpha += this.fill.alphaChangeRate;
    this.fill.alpha = constrain(this.fill.alpha, 0, this.fill.finalAlpha);

    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    rect(this.x, this.y, this.length, this.height);
    pop();
  }
}
