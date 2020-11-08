class Paddle {
  // The constructor sets up the paddle's properties
  constructor(w,h) {
    // size and position information
    this.width = w;
    this.height = h;
    this.x = 0;
    this.y = height - this.height/2;
    // color information
    this.fill = {
      r: 255,
      g: 255,
      b: 255,
    };
  }

  // display paddle as a rectangle
  display() {
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b);
    rectMode(CENTER);
    rect(this.x,this.y,this.width,this.height);
    pop();
  }

  // move paddle's horizontal position based on mouse's x position
  // paddle's vertical position stays the same
  move() {
    this.x = mouseX;

    // constrain paddle's horizontal movement to inside of canvas
    this.x = constrain(this.x,0,width);
  }

}
