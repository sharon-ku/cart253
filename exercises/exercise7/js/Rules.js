class Rules {
  constructor(rulesImg) {
    this.img = rulesImg;
    this.length = 782;
    this.height = 569;
    this.x = width/2;
    this.y = height/2;
  }

  // display the rules image
  display() {
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.length, this.height);
    pop();
  }
}
