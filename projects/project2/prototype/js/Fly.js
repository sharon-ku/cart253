class Fly {
  constructor() {
    this.x = random(0,width);
    this.y = random(0,height);
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;
    this.fill = 255;
    this.size = 15;
  }

  // display a fly
  display() {
    push();
    noStroke();
    fill(this.fill);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // move fly randomly
  move(frog) {
    // constraining the fly's movement to the inside of the canvas
    this.x = constrain(this.x, frog.width/2, width-frog.width/2);
    this.y = constrain(this.y, frog.height/2, height-frog.height/2);

    // change allows me to adjust the jitteriness of the fly's movement
    let change = random();

    // change direction 1% of the time
    if (change < 0.01) {
      // choose random velocity within the speed limit
      this.vx = random(-this.speed,this.speed);
      this.vy = random(-this.speed,this.speed);
    }

    // adding velocity to fly's position
    this.x += this.vx;
    this.y += this.vy;
  }

  getSlappedByFrog() {

  }
}
