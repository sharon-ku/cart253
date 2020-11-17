/**************************************************
Functions for More Food Button:

displayMoreFoodButton();
changeButtonOpacity();
fingerIsOnMoreFoodButton();
hoverOnMoreFoodButton();
clickMoreFoodButton();
resetMoreFoodButton();
**************************************************/

// Display More Food Button
function displayMoreFoodButton() {
  push();
  imageMode(CENTER);
  // Position of button
  moreFoodButton.x = width - moreFoodButton.distFromEdge;
  moreFoodButton.y = moreFoodButton.distFromEdge;
  // Display button
  tint(moreFoodButton.tint.gray, moreFoodButton.tint.alpha);
  image(moreFoodButton.img, moreFoodButton.x, moreFoodButton.y, moreFoodButton.size.current, moreFoodButton.size.current);
  pop();
}

// If it's time for food, More Food Button is active (fully opaque), or else, it's inactive (more transparent)
function changeButtonOpacity() {
  if (timeForFood) {
    moreFoodButton.tint.alpha = 255; // fully opaque
  }
  else {
    moreFoodButton.tint.alpha = 90; // more transparent
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
    moreFoodButton.size.current = moreFoodButton.size.smaller;
  }
}

// If finger clicks on More Food Button while it's active, release food
function clickMoreFoodButton(){
  if (mouseIsPressed && fingerIsOnMoreFoodButton() && moreFoodButton.tint.alpha === 255) {
    showFood = true; // release food
    timeForFood = false; // since food has been released, it's no longer time for food
  }
}

// Once all fishfoods are gone (off the canvas or eaten), reactivate the MoreFoodButton and create new fishfoods
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
