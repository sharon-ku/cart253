class Ground {
  constructor(w,h,x,y) {
    // size information
    this.width = w;
    this.height = h;
    // position information
    this.x = x;
    this.y = y;

    // color information (dark brown)
    this.fill = {
      r: 127,
      g: 71,
      b: 5,
    };
  }

  // display the ground
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
