
function hoverOnStartButton() {
  if (mouseIsInStartButton()) {
    push();
    // Start button enlarges and changes color
    startButton.size = startButton.sizeBigger;
    fill(startButton.fill.rHover, startButton.fill.gHover, startButton.fill.bHover, startButton.fill.alpha);
    ellipse(startButton.x, startButton.y, startButton.size);

    // Start text enlarges
    start.size = start.sizeBigger;
    fill(start.fill.r, start.fill.g, start.fill.b);
    textAlign(CENTER, CENTER);
    textSize(start.size);
    textFont(start.font);
    text(start.text, start.x, start.y);
    pop();
  }
  else {
    // Start button and text keep size of initial setup
    startButton.size = startButton.sizeSmaller;
    start.size = start.sizeSmaller;
  }
}

// If user clicks on Start button, cue `animation` state
function mouseClicked() {
  if (mouseIsInStartButton()) {
    state = `animation`;
  }
}

// Checks if mouse's position is inside the Start button
function mouseIsInStartButton() {
  if (mouseX < startButton.x+(startButton.size/2) && mouseX > startButton.x-(startButton.size/2)) {
    if (mouseY < startButton.y+(startButton.size/2) && mouseY > startButton.y-(startButton.size/2)) {
      return true;
    }
  }
  else{
    return false;
  }
}

// Display the circular Start button
function displayStartButton() {
  push();
  startButton.x = start.x;
  startButton.y = start.y;

  fill(startButton.fill.r, startButton.fill.g, startButton.fill.b, startButton.fill.alpha);
  ellipse(startButton.x, startButton.y, startButton.size);
  pop();
}


// Display the Start text
function displayStart() {
  push();
  fill(start.fill.r, start.fill.g, start.fill.b);
  textSize(start.size);
  textAlign(CENTER, CENTER);

  start.x = width*1/5;
  start.y = height*4/5;

  textFont(start.font);
  text(start.text, start.x, start.y);
  pop();
}
