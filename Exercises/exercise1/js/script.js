/**************************************************
Exercise 1: I like to move it move it!
Sharon Ku

Here is a description of this template p5 project.
**************************************************/

let maxDistance = 100; //max distance between two points on the canvas

let circleFill = {
  r: 172,
  g: 172,
  b: 172,
}

let circle1 = {
  x: 100,
  y: 100,
  xMin: 0,
  xMax: 100,
  yMin: 0,
  yMax: 100,
  distMouse: 100,
  speed: 0.008,
  acceleration: 4,
  sizeMin: 100,
  sizeMax: 400,
}

let circle2 = {
  x: 500,
  y: 500,
  xMin: 0,
  xMax: 100,
  yMin: 0,
  yMax: 100,
  distMouse: 100,
  speed: 0.005,
  acceleration: 3.5,
  sizeMin: 80,
  sizeMax: 250,
}

let circle3 = {
  x: 700,
  y: 100,
  xMin: 0,
  xMax: 100,
  yMin: 0,
  yMax: 100,
  distMouse: 100,
  speed: 0.002,
  acceleration: 5,
  sizeMin: 50,
  sizeMax: 150,
}




// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();

  //calculating the diagonal distance from one corner of the canvas to the other corner
  maxDistance = dist(0, 0, windowWidth, windowHeight);
  console.log(windowWidth, windowHeight, maxDistance);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  // Circle 1 -----------------------------------------------------------------
      // Animating the color of the circle based on mouse's position
      circleFill.r = map(mouseX, 0, windowWidth, 150, 255);
      circleFill.g = map(mouseX, 0, windowWidth, 200, 255);
      circleFill.b = 172;
      fill(circleFill.r, circleFill.g, circleFill.b);


      // Animating the circle's size
      circle1.distMouse = dist(mouseX, mouseY, circle1.x, circle1.y);
      circle1.size = map(circle1.distMouse, 0, maxDistance, circle1.sizeMin, circle1.sizeMax);


      // Animating the circle's movement
          // Constraining the circle's movement to the inside of the canvas
          circle1.xMin = circle1.size / 2;
          circle1.xMax = windowWidth-(circle1.size / 2);
          circle1.yMin = circle1.size / 2;
          circle1.yMax = windowHeight-(circle1.size / 2);

          circle1.x = constrain(circle1.x, circle1.xMin, circle1.xMax);
          circle1.y = constrain(circle1.y, circle1.yMin, circle1.yMax);

          // Making the circle follow the mouse
          circle1.x += (mouseX - circle1.x) * circle1.speed * circle1.acceleration;
          circle1.y += (mouseY - circle1.y) * circle1.speed * circle1.acceleration;


      // Drawing the circle
      ellipse(circle1.x, circle1.y, circle1.size);














  // Circle 2 -----------------------------------------------------------------
      // Animating the color of the circle based on mouse's position
      circleFill.r = map(mouseY, windowHeight, 0, 200, 255);
      circleFill.g = 172;
      circleFill.b = map(mouseY, windowHeight, 0, 150, 255);
      fill(circleFill.r, circleFill.g, circleFill.b);


      // Animating the circle's size
      circle2.distMouse = dist(mouseX, mouseY, circle2.x, circle2.y);
      circle2.size = map(circle2.distMouse, 0, maxDistance, circle2.sizeMin, circle2.sizeMax);


      // Animating the circle's movement
          // Constraining the circle's movement to the inside of the canvas
          circle2.xMin = circle2.size / 2;
          circle2.xMax = windowWidth-(circle2.size / 2);
          circle2.yMin = circle2.size / 2;
          circle2.yMax = windowHeight-(circle2.size / 2);

          circle2.x = constrain(circle2.x, circle2.xMin, circle2.xMax);
          circle2.y = constrain(circle2.y, circle2.yMin, circle2.yMax);

          // Making the circle follow the mouse
          circle2.x += (mouseX - circle2.x) * circle2.speed * circle2.acceleration;
          circle2.y += (mouseY - circle2.y) * circle2.speed * circle2.acceleration;


      // Drawing the circle
      ellipse(circle2.x, circle2.y, circle2.size);








  // Circle 3 -----------------------------------------------------------------
      // Animating the color of the circle based on mouse's position
      circleFill.r = 172;
      circleFill.g = map(mouseX, 0, windowWidth, 150, 255);
      circleFill.b = map(mouseY, windowHeight, 0, 200, 255);
      fill(circleFill.r, circleFill.g, circleFill.b);


      // Animating the circle's size
      circle3.distMouse = dist(mouseX, mouseY, circle3.x, circle3.y);
      circle3.size = map(circle3.distMouse, 0, maxDistance, circle3.sizeMin, circle3.sizeMax);


      // Animating the circle's movement
          // Constraining the circle's movement to the inside of the canvas
          circle3.xMin = circle3.size / 2;
          circle3.xMax = windowWidth-(circle3.size / 2);
          circle3.yMin = circle3.size / 2;
          circle3.yMax = windowHeight-(circle3.size / 2);

          circle3.x = constrain(circle3.x, circle3.xMin, circle3.xMax);
          circle3.y = constrain(circle3.y, circle3.yMin, circle3.yMax);

          // Making the circle follow the mouse
          circle3.x += (mouseX - circle3.x) * circle3.speed * circle3.acceleration;
          circle3.y += (mouseY - circle3.y) * circle3.speed * circle3.acceleration;


      // Drawing the circle
      ellipse(circle3.x, circle3.y, circle3.size);





}
