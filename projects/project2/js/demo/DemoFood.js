class DemoFood {
  constructor(border) {
    this.x = random(border, width - border);
    this.y = 0; //random(-100,0);
    this.vx = 0;
    this.vy = 0;
    this.speedMax = 0.5;
    this.speed = random(0, this.speedMax);
    this.ax = 0;
    this.ay = 0;
    this.accelerationMax = 1;
    this.accelerationX = random(-this.accelerationMax, this.accelerationMax);
    this.accelerationY = 0.3;
    this.size = random(20,30);
    this.fillR = 255;
    this.fillG = random(165, 221);
    this.fillB = random(82, 185);
  }

  // Display fish food
  display() {
    push();
    fill(this.fillR, this.fillG, this.fillB);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  // Move fish food
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

  // Check if food is off screen
  offScreen() {
    if (this.y > height || this.x < 0 || this.x > width) {
      return true;
    } else {
      return false;
    }
  }

}
