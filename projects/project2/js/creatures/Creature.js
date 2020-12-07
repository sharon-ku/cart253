class Creature {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = undefined;
    this.height = undefined;
    this.sprite = createSprite(this.x, this.y, this.width, this.height);
    this.movingAnimation = loadAnimation(undefined, undefined);
    this.movingAnimation.frameDelay = undefined;
    this.sprite.addAnimation('moving', this.movingAnimation);
  }

  move() {

  }


}
