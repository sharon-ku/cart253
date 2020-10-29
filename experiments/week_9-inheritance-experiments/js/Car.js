class Car extends Vehicle {
  constructor(x,y) {
    super(x,y);
    this.width = 50;
    this.height = 20;
    this.vx = 5;
  }

  // we can remove move() and wrap() since the Vehicle does that


  
  display() {
    push();
    rectMode(CENTER);
    noStroke();
    fill(255,0,0);
    rect(this.x,this.y,this.width,this.height);
    pop();
  }
}
