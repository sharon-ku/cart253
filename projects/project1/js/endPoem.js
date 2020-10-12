// End poem

let poemLines = [];
let numPoemLines = 4;
let yLocationOfFirstLine = 210;
let spaceBetweenEachLine = 40;

let line = [`All your fishies are now well fed,`, `Watch them go, off to bed...`, `They suddenly feel something moving in their belly,`, `Looks like they gave birth to adorable food babies!`];

class PoemLine {
  constructor(lineText, x, y) {
    this.line = lineText;
    this.font = bodyTextFont;
    this.x = x;
    this.y = y;
    this.size = 30;
    this.fillR = 255;
    this.fillG = 255;
    this.fillB = 255;
  }

  // display lines of poem
  show() {
    push();
    textAlign(CENTER);
    fill(this.fillR, this.fillG, this.fillB);
    textFont(this.font, this.size);
    text(this.line, this.x, this.y);
    pop();
  }
}

// display end poem
function displayEndPoem() {
  push();
  for (let i = 0; i < numPoemLines; i++) {
    poemLines[i].show();
  }
  pop();
}
