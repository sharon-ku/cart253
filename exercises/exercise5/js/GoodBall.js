class GoodBall {
  constructor(x,y,size) {
    // position and size information
    this.x = x;
    this.y = y;
    this.size = size;
    // velocity and speed information
    this.vx = 0;
    this.vy = 0;
    this.maxSpeed = 10;
    // acceleration information
    this.ax = 0;
    this.ay = 0;
    // active if ball is still on canvas
    this.active = true;
    // color information
    this.fill = { //lime green
      r: 207,
      g: 255,
      b: 105,
    };
  }

  // gravitational force exerted on the ball (affects ball's y acceleration)
  gravity(force) {
    this.ay += force;
  }

  // move the ball
  move() {
    // we add acceleration to our velocity
    this.vx += this.ax;
    this.vy += this.ay;

    // constrain velocity so it doesn't reach terminal velocity
    this.vx = constrain(this.vx,-this.maxSpeed,this.maxSpeed);
    this.vy = constrain(this.vy,-this.maxSpeed,this.maxSpeed);

    // add velocity to our x and y position
    this.x += this.vx;
    this.y += this.vy;

    // if ball goes off the screen, it's inactive
    if (this.y - this.size/2 > height) {
      this.active = false;
    }
  }

  // display ball as circle
  display() {
    push();
    fill(this.fill.r, this.fill.g, this.fill.b);
    ellipse(this.x,this.y,this.size);
    pop();
  }

  // returns true if ball is overlapping with paddle
  overlapsWithPaddle(paddle) {
    if (this.x > paddle.x - paddle.width/2 &&
        this.x < paddle.x + paddle.width/2 &&
        this.y + this.size/2 > paddle.y - paddle.height/2 &&
        this.y - this.size/2 < paddle.y + paddle.height/2) {

        return true;
    }
    else {
      return false;

    }
  }

  // if ball overlaps with paddle, make it bounce
  bounce(paddle, bounceImpact) {
    if (this.x > paddle.x - paddle.width/2 &&
        this.x < paddle.x + paddle.width/2 &&
        this.y + this.size/2 > paddle.y - paddle.height/2 &&
        this.y - this.size/2 < paddle.y + paddle.height/2) {

        // bounce
        // depending on which side of the paddle the ball falls on, it will bounce off in that direction

        let dx = this.x - paddle.x;
        this.vx += map(dx,-paddle.width/2,paddle.width/2,-bounceImpact,bounceImpact);

        this.vy = -this.vy; // switch ball's direction to up
        this.ay = 0; // the ball will not lose its bounce height
    }
  }


}
