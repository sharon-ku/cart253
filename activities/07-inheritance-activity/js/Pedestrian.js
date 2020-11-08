class Pedestrian {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.fill = 255;
    this.size = 20;
    this.alive = true;
  }

  handleInput() {

    if (keyIsDown(UP_ARROW)) {
      this.vy = -this.speed;
    }
    else if(keyIsDown(DOWN_ARROW)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }


    if (keyIsDown(LEFT_ARROW)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }

  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  display() {
    push();
    fill(this.fill);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }

  checkHit(vehicle) {
    if (this.x < vehicle.x+vehicle.width/2 &&
      this.x > vehicle.x-vehicle.width/2 &&
      this.y <vehicle.y + vehicle.height/2 &&
      this.y > vehicle.y-vehicle.height/2) {
        this.alive = false;
    }
  }


}
