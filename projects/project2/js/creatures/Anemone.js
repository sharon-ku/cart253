class Anemone extends Creature {
  constructor(x, y) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.length = 202;
    this.width = 101;
    // this.sprite = createSprite(this.x, this.y, this.length, this.width);
    this.movingAnimation = loadAnimation('assets/images/creatures/anemone1.png', 'assets/images/creatures/anemone2.png');
    this.movingAnimation.frameDelay = 70;
    this.sprite.addAnimation('moving', this.movingAnimation);
  }

}
