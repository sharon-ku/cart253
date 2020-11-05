class Frog {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.width = undefined;
    this.height = undefined;
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;
  }

  // displays frog image
  display() {
    imageMode(CENTER);
    image(frogImages[0], this.x, this.y);
  }

  // move frog by holding down on right, left, up, down arrow keys
  move() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    } else if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    } else if (keyIsDown(UP_ARROW)) {
      this.y -= 5;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    }
  }

}
