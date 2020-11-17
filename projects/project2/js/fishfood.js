// This is what it means to be fishfood. It can be displayed and moved. The user can use the left and right arrow keys to change the current and water bend the fish food that way.

class FishFood {
  constructor() {
    this.x = random(fishtank.border, width - fishtank.border);
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.speedMax = 1.5;
    this.speed = random(0, this.speedMax);
    this.ax = 0;
    this.ay = 0;
    this.accelerationMax = 3;
    this.accelerationX = random(-this.accelerationMax, this.accelerationMax);
    this.accelerationY = 0.5;
    this.size = 15;
    this.fillR = 255;  // beige
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

  // move fishfood + change current using left and right arrow keys
  move() {
    this.ax = this.accelerationX;
    this.ay = this.accelerationY;

    this.accelerationX = constrain(this.accelerationX, -this.accelerationMax, this.accelerationMax);

    let chance = random();

    if (chance < 0.05) {
    this.vx = random(-this.speed,this.speed);
    }

    this.vy = this.speed;

    this.x += this.vx + this.ax;
    this.y += this.vy + this.ay;

    // Change current direction if user clicks left or right arrow key
    if (keyIsDown(LEFT_ARROW)) {
      this.accelerationX -= 0.05;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.accelerationX += 0.05;
    }
  }

  // checks if food is off screen
  offScreen() {
    if (this.y > height || this.x < 0 || this.x > width) {
      return true;
    }
    else {
      return false;
    }
  }

  // returns true if food is close enough to fish's body to be eaten
  foodEaten() {
    if ((this.x < firefish.x + firefish.length/2) && (this.x > firefish.x - firefish.length/2) && (this.y < firefish.y+firefish.width/2) && (this.y > firefish.y-firefish.width/2)) {
      return true;
    }
    else {
      return false;
    }
  }
}
