class Snail extends Creature {
  constructor(x, y) {
    super(x, y);
    this.x = x;
    this.y = y;
    this.width = 73;
    this.height = 83;
    this.sprite = createSprite(this.x, this.y, this.width, this.height);
    this.movingAnimation = loadAnimation('assets/images/creatures/snail1.png', 'assets/images/creatures/snail2.png');
    this.movingAnimation.frameDelay = 70;
    this.sprite.addAnimation('moving', this.movingAnimation);
  }

  // Move snail
  move() {
    super.move();
    this.sprite.position.x += 0.5;
    console.log(this.sprite.position.x);
  }





}
