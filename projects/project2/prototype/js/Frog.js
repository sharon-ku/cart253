class Frog {
  constructor() {
    this.x=100;
    this.y=100;
    this.width = undefined;
    this.height = undefined;
    this.vx=0;
    this.vy=0;
    this.speed=2;

  }

  // displays frog image
  display() {
    imageMode(CENTER);
    image(frogImages[0], width/2, height/2);
  }

  // move frog using arrow keys
  // move() {
  //   this.x
  // }

  keyPressed() {
    if (keyCode === LEFT_ARROW) {
      this.x += 5;
    }
    else if (keyCode === RIGHT_ARROW) {
      this.x -= 5;
    }
    else if (keyCode === UP_ARROW) {
      this.y -= 5;
    }
    else if (keyCode === DOWN_ARROW) {
      this.y += 5;
    }
  }

}
