class Frog {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.width = 125 * 1.7; // original width: 250
    this.height = 100 * 1.7; //original height: 200
    this.vx = 0;
    this.vy = 0;
    this.speed = 2;

    this.currentImage = 0; // sets the frog image
    this.framesElapsed = 0;
    this.framesBtwEachImage = 5;

    // scale affects direction that frog is facing
    this.scale = {
      x: 1, // facing right
      y: 1,
    };
  }

  // displays frog image
  display() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    scale(this.scale.x, this.scale.y);
    image(frogImages[this.currentImage], 0, 0, this.width, this.height);
    pop();
  }

  // move frog by holding down on right, left, up, down arrow keys
  move() {
    // constrain movement of frog to inside of canvas
    this.x = constrain(this.x, this.height / 2, width - this.height / 2);
    this.y = constrain(this.y, this.width / 2, height - this.width / 2);


    // frog moves in direction of the arrow key that is pressed
    // for right and left movement, frog faces the direction it is moving
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
      this.scale.x = 1; // face right
    } else if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
      this.scale.x = -1; // face left
    } else if (keyIsDown(UP_ARROW)) {
      this.y -= 5;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    }
  }

  // frog slaps its tongue down in the direction it is facing
  // the slapping effect is done by switching between images
  slapTongueDown() {
    console.log(this.currentImage);
    // if frog is facing right
    if (this.scale.x > 0) {
      if (mouseIsPressed) {
        // if left button on mouse is clicked,
        if (mouseButton === LEFT) {
          this.framesElapsed++;
          if (this.framesElapsed === this.framesBtwEachImage) {
            if (this.currentImage === 0) {
              this.currentImage = 4;
            } else if (this.currentImage === 4) {
              this.currentImage = 5;
            } else if (this.currentImage === 5) {
              this.currentImage = 6;
            } else if (this.currentImage === 6) {
              this.currentImage = 0;
            }
            this.framesElapsed = 0;
          }
        }

      }
    }



  }

}
