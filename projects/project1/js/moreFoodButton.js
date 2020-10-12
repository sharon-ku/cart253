// Display More Food Button
function displayMoreFoodButton() {
  push();
  imageMode(CENTER);
  moreFoodButton.x = width - moreFoodButton.distFromEdge;
  moreFoodButton.y = moreFoodButton.distFromEdge;

  tint(moreFoodButton.tint.gray, moreFoodButton.tint.alpha);
  image(moreFoodButton.img, moreFoodButton.x, moreFoodButton.y, moreFoodButton.size.current, moreFoodButton.size.current);
  pop();

  if (timeForFood) {
    moreFoodButton.tint.alpha = 255;
  }
  else {
    moreFoodButton.tint.alpha = 90;
  }
}

// Once all fishfoods are gone, reactivate the MoreFoodButton and create new fishfoods
function resetMoreFoodButton() {
  if (fishfoods.length === 0) {
    timeForFood = true;
    showFood = false;

    // Create new fishfoods in array
    for (let i = 0; i < numFishfoods; i++) {
      fishfoods[i] = new Fishfood();
    }
  }
}

// Checks if finger is hovering on More Food Button
function fingerIsOnMoreFoodButton() {
  if (finger.x < moreFoodButton.x+(moreFoodButton.size.current/2) && finger.x > moreFoodButton.x-(moreFoodButton.size.current/2)) {
    if (finger.y < moreFoodButton.y+(moreFoodButton.size.current/2) && finger.y > moreFoodButton.y-(moreFoodButton.size.current/2)) {
      return true;
    }
  }
  else{
    return false;
  }
}

// More Food Button enlarges if finger hovers over it
function hoverOnMoreFoodButton() {
  if (fingerIsOnMoreFoodButton()) {
    moreFoodButton.size.current = moreFoodButton.size.bigger;
  }
  else {
    // More food button keeps its initial size
    moreFoodButton.size.current = moreFoodButton.size.smaller;
  }

}

// If finger clicks on More Food Button, release food
function clickMoreFoodButton(){
  if (mouseIsPressed && fingerIsOnMoreFoodButton() && moreFoodButton.tint.alpha === 255) {
    showFood = true;
    timeForFood = false;
  }

  if (showFood) {
    for (let i = fishfoods.length-1; i >= 0; i--) {
      fishfoods[i].move();
      fishfoods[i].show();

      if (fishfoods[i].foodEaten()) {
        firefish.numFoodEaten ++;
      }

      if (fishfoods[i].foodEaten() || fishfoods[i].offScreen()) {
        fishfoods.splice(i,1);
      }
    }
  }

}
