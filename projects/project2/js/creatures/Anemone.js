class Anemone {
  constructor() {
    this.x = 360;
    this.y = 345;
    this.width = 202;
    this.height = 101;
    this.sprite = createSprite(this.x, this.y, this.width, this.height);
    this.movingAnimation = loadAnimation('assets/images/creatures/anemone1.png', 'assets/images/creatures/anemone2.png');
    this.movingAnimation.frameDelay = 70;
    this.sprite.addAnimation('moving', this.movingAnimation);
  }

  move() {
    this.sprite.position.x ++;
  }
}
