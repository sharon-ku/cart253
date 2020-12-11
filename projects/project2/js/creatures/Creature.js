class Creature {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = undefined;
    this.width = undefined;
    this.sprite = createSprite(this.x, this.y, this.length, this.width);
    this.movingAnimation = loadAnimation(undefined, undefined);
    this.movingAnimation.frameDelay = undefined;
    this.sprite.addAnimation('moving', this.movingAnimation);
  }

  // Move creature
  move() {

  }

  // Returns true if the subject overlaps with fish's body
  overlapsWith(subject) {
    if ((subject.x < this.x + this.length / 2) &&
      (subject.x > this.x - this.length / 2) &&
      (subject.y < this.y + this.width / 2) &&
      (subject.y > this.y - this.width / 2)) {
      return true;
    } else {
      return false;
    }
  }


}
