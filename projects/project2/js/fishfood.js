class FishFood {
  constructor(border) {
    this.x = random(border, width - border);
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.speedMax = 1.5;
    this.speed = random(0, this.speedMax);
    this.ax = 0;
    this.ay = 0;
    this.accelerationMax = 2.5;
    this.accelerationX = random(-this.accelerationMax, this.accelerationMax);
    this.accelerationY = 0.5;
    this.size = 15;
    this.fillR = 255; // beige
    this.fillG = 221;
    this.fillB = 185;
    this.fillAlpha = 255;
  }

  // display fish food
  show() {
    push();
    fill(this.fillR, this.fillG, this.fillB, this.fillAlpha);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // move fish food
  move() {
    this.ax = this.accelerationX;
    this.ay = this.accelerationY;

    this.accelerationX = constrain(this.accelerationX, -this.accelerationMax, this.accelerationMax);

    let chance = random();

    if (chance < 0.05) {
      this.vx = random(-this.speed, this.speed);
    }

    this.vy = this.speed;

    this.x += this.vx + this.ax;
    this.y += this.vy + this.ay;

  }

  // Change current direction if user clicks left or right arrow key
  changeCurrent() {
    if (keyIsDown(LEFT_ARROW)) {
      this.accelerationX -= 0.05;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.accelerationX += 0.05;
    }
  }

  // checks if food is off screen
  offScreen() {
    if (this.y > height || this.x < 0 || this.x > width) {
      return true;
    } else {
      return false;
    }
  }

  // returns true if food is close enough to fish's body to be eaten
  foodEaten(fishName) {
    if ((this.x < fishName.x + fishName.length / 2) && (this.x > fishName.x - fishName.length / 2) && (this.y < fishName.y + fishName.width / 2) && (this.y > fishName.y - fishName.width / 2)) {
      return true;
    } else {
      return false;
    }
  }
}
