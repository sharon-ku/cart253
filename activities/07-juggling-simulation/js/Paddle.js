class Paddle {
  // The constructor sets up the paddle's properties
  constructor(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    // color information
    this.fill = {
      r: 255,
      g: 255,
      b: 255,
    };
  }

  // display paddle as a rectangle
  display() {
    fill(this.fill.r, this.fill.g, this.fill.b);
    rectMode(CENTER);
    rect(this.x,this.y,this.width,this.height);
  }

  // move paddle's horizontal position based on mouse's x position
  // paddle's vertical position stays the same
  move() {
    this.x = mouseX;

  }

}
