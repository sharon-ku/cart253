class FishFood {
  constructor(border) {
    this.x = random(border, width - border);
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.speedMax = 0.2; //1
    this.speed = random(0, this.speedMax);
    this.ax = 0;
    this.ay = 0;
    this.accelerationMax = 0.5; //2
    this.accelerationX = random(-this.accelerationMax, this.accelerationMax);
    this.accelerationY = 0.5;
    this.size = random(10,20);
    this.fillR = 255;
    this.fillG = random(165, 221);
    this.fillB = random(82, 185);
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

//   // once clownfish releases fish food to anemone when feeding time, food floats to anemone
//   floatsToAnemone(anemone) {
//     console.log(this.x, this.y, this.vx, this.vy);
//     // make fish food move towards anemone
//     if (this.x < anemone.sprite.position.x) {
//       this.vx=0.5;
//     }
//     else if (this.x > anemone.sprite.position.x) {
//       this.vx=-0.5;
//     }
//     else {
//       this.vx = 0;
//     }
//
//     if (this.y < anemone.sprite.position.y) {
//       this.vy=0.5;
//     }
//     else if (this.y > anemone.sprite.position.y) {
//       this.vy=-0.5;
//     }
//     else {
//       this.vy = 0;
//     }
//
//     this.x += this.vx;
//     this.y += this.vy;
//
//     // // when anemone's position equals food's position, remove food and no longer time to feed anemone for this return
//     // // also decide if next turn is time to feed anemone
//     // if (this.x === anemone.sprite.position.x && this.y === anemone.sprite.position.y) {
//     //   fish.timeToFeedAnemone = false;
//     //   fish.decideIfTimeToFeedAnemone();
//     // }
//   }
}
