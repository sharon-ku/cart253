class RulesRect {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.distToEdge = 50;
    this.length = width - this.distToEdge;
    this.height = height - this.distToEdge;
    this.cornerRadius = 50;
    this.fill = {
      r: 4,
      g: 81,
      b: 101,
      alpha: 220,
    };
  }

  // display the rounded rectangle behind the rules image
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b, this.fill.alpha);
    rectMode(CENTER);
    rect(this.x, this.y, this.length, this.height, this.cornerRadius);
    pop();
  }

}
