class Anemone {
  constructor(x, y) {
    this.sprite = createSprite(x, y, 202, 101);
    this.movingAnimation = loadAnimation('assets/images/creatures/anemone1.png', 'assets/images/creatures/anemone2.png');
    this.movingAnimation.frameDelay = 70;
    this.sprite.addAnimation('moving', this.movingAnimation);
  }
}
