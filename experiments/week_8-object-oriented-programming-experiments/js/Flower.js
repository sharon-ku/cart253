class Flower {

  // The constructor() sets up a flower's properties
  constructor(x, y, size, stemLength, petalColor) {
    // Position and size information
    this.x = x;
    this.y = y;
    this.size = size;
    this.maxSize = size; // NEW! To limit growth
    this.stemLength = stemLength;
    this.stemThickness = 10;
    this.petalThickness = 10;
    this.maxPetalThickness = 10; // NEW! To limit growth
    // Color information
    this.stemColor = {
      r: 50,
      g: 150,
      b: 50
    };
    this.petalColor = petalColor;
    this.centreColor = {
      r: 50,
      g: 0,
      b: 0
    };
    this.alive = true;
  }

  // shrink()
  // Shrinks the flower
  shrink() {
    // Choose a random amount to shrink
    let shrinkage = random(0, 0.1);
    // Reduce the petal thickness (divide by 10 to make it less rapid)
    this.petalThickness = this.petalThickness - shrinkage / 10;
    // Reduce the centre of the flower
    this.size = this.size - shrinkage;

    // If any of the key properties reach 0 or less, the flower is dead
    if (this.petalThickness <= 0 || this.size <= 0) {
      this.alive = false;
    }
  }

  // NEW! pollinate() handles the flower being pollinated (it grows)
  pollinate() {
    // Choose a random amount to grow
    let growth = random(0, 0.5);
    // Increase the petal thickness (divide by 10 to make it less rapid)
    this.petalThickness = this.petalThickness + growth / 10;
    // Increase the centre of the flower
    this.size = this.size + growth;

    // Constrain the elements
    this.petalThickness = constrain(this.petalThickness, 0, this.maxPetalThickness);
    this.size = constrain(this.size, 0, this.maxSize);
  }

  // display()
  // Displays the flower on the canvas
  display() {
    push();
    // Set the stroke weight for the petals and the stem
    strokeWeight(this.stemThickness);
    // Draw a line for the stem
    stroke(this.stemColor.r, this.stemColor.g, this.stemColor.b);
    line(this.x, this.y, this.x, this.y + this.stemLength);
    // Draw a circle with a heavy outline for the flower
    strokeWeight(this.petalThickness);
    fill(this.centreColor.r, this.centreColor.g, this.centreColor.b);
    stroke(this.petalColor.r, this.petalColor.g, this.petalColor.b);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
