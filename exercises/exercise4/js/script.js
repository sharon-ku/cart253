/**************************************************
Exercise 4: The Age of Aquariums
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

"use strict";

let user = {
  x: 500,
  y: 400,
  size: 25,
  vx: 0,
  vy: 0,
  speed: 5,
};

let school = [];
let schoolSize = 7;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(1000, 800);
  noStroke();

  for (let i=0; i < schoolSize; i++) {
    // Create a fish
    let fish = createFish(random(0, width), random(0, height));
    // Add the fish to our array
    school.push(fish);
  }
}

// createFish(x,y)
// Creates a new JavaScript Object describing a fish and returns it
function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    minSize: 30,
    maxSize: 150,
    size: 0,
    vx: 0,
    vy: 0,
    speed: 2,
    minSpeed: 1.5,
    maxSpeed: 4.5,
  };

  fish.size = random(fish.minSize, fish.maxSize);
  fish.speed = map(fish.size, fish.maxSize, fish.minSize, fish.minSpeed, fish.maxSpeed);

  return fish;
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  for (let i = 0; i < school.length; i++) {
   moveFish(school[i]);
   displayFish(school[i]);
 }

 moveUser();
 displayUser();

}

function moveFish(fish) {
  let chance = random(0,1);
  if (chance < 0.05) {

    if (fish.x < user.x) {
      // fish.vx = random(0, fish.speed);
      fish.vx = fish.speed;
    }
    else if (fish.x > user.x) {
      // fish.vx = random(-fish.speed,0);
      fish.vx = random(-fish.speed,0);
    }
    else {
      fish.vx = 0;
    }

    if (fish.y < user.y) {
      fish.vy = fish.speed;
      // fish.vy = random(0, fish.speed);
    }
    else if (fish.y > user.y) {
      fish.vy = -fish.speed;
      // fish.vy = random(-fish.speed,0);
    }
    else {
      fish.vy = 0;
    }
  }


  // if (chance < 0.05) {
  //   fish.vx = random(-fish.speed,fish.speed);
  //   fish.vy = random(-fish.speed,fish.speed);
  // }

  fish.x += fish.vx;
  fish.y += fish.vy;

  fish.x = constrain(fish.x,0,width);
  fish.y = constrain(fish.y,0,height);
}


function displayFish(fish) {
  push();
  fill(200,100,100);
  noStroke();
  ellipse(fish.x,fish.y,fish.size);
  pop();
}

// function checkFood(food) {
//   if (!food.eaten) {
//     let d = dist(user.x, user.y, food.x, food.y);
//     if (d < user.size/2 + food.size/2) {
//       food.eaten = true;
//     }
//   }
// }

function displayUser() {
  push();
  fill(255);
  ellipse(user.x, user.y, user.size);
  pop();
}

function moveUser() {
  if (keyIsDown(LEFT_ARROW)) {
    user.vx = -user.speed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    user.vx = user.speed;
  }
  else {
    user.vx = 0;
  }

  if (keyIsDown(UP_ARROW)) {
    user.vy = -user.speed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    user.vy = user.speed;
  }
  else {
    user.vy = 0;
  }

  user.x += user.vx;
  user.y += user.vy;

  user.x = constrain(user.x,0,width);
  user.y = constrain(user.y,0,height);
}

// function mousePressed() {
//   let fish = createFish(mouseX,mouseY); // Create a fish at the mouse position
//   school.push(fish); // Add the fish to our array
//   // Now the school array has our new fish and it will be moved and drawn
//   // with all the others in the for loop!
// }
