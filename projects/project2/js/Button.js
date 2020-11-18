class Button {
  constructor(x,y) {
    // movement information
    this.x = x;
    this.y = y;
    // this.vx = 0;
    // this.vy = 0;
    // this.speed = 2;
    // this.change = random();
    // size information
    this.size = undefined;
    this.sizeBigger = undefined;
    this.sizeSmaller = undefined;
    this.sizeChangeRate = 0.4;
    this.grow = true;
    // fill information
    this.fill = {
      r: undefined,
      g: undefined,
      b: undefined,
      alpha: undefined,
    };

  }

  // display the button
  display() {

  }

  // move the button
  move() {
    // this.change = random();
    // if (this.change < 0.01) {
    //   this.vx = random(-this.speed, this.speed);
    //   this.vy = random(-this.speed, this.speed);
    // }
    // this.x += this.vx;
    // this.y += this.vy;
  }

  // button changes sizes when mouse hovers over it
  hover() {
    if (this.grow) {
      this.size+= this.sizeChangeRate;
      if (this.size >= this.sizeBigger) {
        this.grow = false;
      }
    }
    else {
      this.size-= this.sizeChangeRate;
      if (this.size <= this.sizeSmaller) {
        this.grow = true;
      }
    }
  }

  // button keeps small size when mouse is not hovering over it
  setNormalSize() {
    this.size = this.sizeSmaller;
  }
}
