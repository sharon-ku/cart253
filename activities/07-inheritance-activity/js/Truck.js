class Truck extends Vehicle {
  constructor(x,y) {
    super(x,y);
    this.x=x;
    this.y=y;
    this.speed = 2.5;
    this.width = 100;
    this.height = 40;
  }

  display() {
    push();
    fill(255,255,0);
    super.display();
    pop();
  }
}
