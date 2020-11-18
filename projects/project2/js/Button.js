class Button {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = undefined;
    this.sizeBigger = undefined;
    this.sizeSmaller = undefined;
    this.fill = {
      r: undefined,
      g: undefined,
      b: undefined,
      alpha: undefined,
    };
  }

  // display the button
  display() {

  }

  // button enlarges when mouse hovers over it
  hover() {
    this.size = this.sizeBigger;
  }

  // button keeps small size when mouse is not hovering over it
  setNormalSize() {
    this.size = this.sizeSmaller;
  }
}
