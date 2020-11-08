class Car extends Vehicle {
  constructor(x,y) {
    super(x,y);
    this.x=x;
    this.y=y;
    this.speed = 5;
    this.width = 50;
    this.height = 20;
  }

  display() {
    push();
    fill(255,0,0);
    super.display();
    pop();
  }
}
