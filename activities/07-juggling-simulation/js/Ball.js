class Ball {
  constructor(
    x,
    y,
    size,
    speed,
    vx,
    vy,
    acceleration,
    ax,
    ay
  ) {

    // position and size information
    this.x = x;
    this.y = y;
    this.size = size;
    // velocity and speed information
    this.speed = speed;
    this.vx = vx;
    this.vy = vy;
    // acceleration information
    this.acceleration = acceleration;
    this.ax = ax;
    this.ay = ay;
    // color information
    this.fill = { //lime green
      r: 207,
      g: 255,
      b: 105,
    };
  }

  // display ball as circle
  display() {
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x,this.y,this.size);
    console.log(this.x,this.y);
  }

  // move the ball
  move() {
    this.ay = this.acceleration;
    this.vy = this.speed;
    this.x += this.vx + this.ax;
    this.y += this.vy + this.ay;

    console.log(this.x,this.y);
  }
}
