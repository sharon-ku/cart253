class Motorcycle extends Vehicle {
  constructor(x,y) {
    super(x,y);
    this.x=x;
    this.y=y;
    this.speed = 10;
    this.width = 25;
    this.height = 10;
  }

  display() {
    push();
    fill(0,255,0);
    super.display();
    pop();
  }
}
