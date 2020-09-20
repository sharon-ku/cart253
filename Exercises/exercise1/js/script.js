/**************************************************
Exercise 1: I like to move it move it!
Sharon Ku

Here is a description of this template p5 project.
**************************************************/



let circleFill = {
  r: 172,
  g: 172,
  b: 172,
}

let circle1 = {
  x: 100,
  y: 100,
  speed: 0.008,
  acceleration: 4,
}

let circle2 = {
  x: 500,
  y: 500,
  speed: 0.006,
  acceleration: 3,
}






// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  // Circle 1
      // Animating the color of the circle based on mouse's position
      circleFill.r = map(mouseX, 0, windowWidth, 150, 255);
      circleFill.g = map(mouseX, 0, windowWidth, 200, 255);
      circleFill.b = 172;
      fill(circleFill.r, circleFill.g, circleFill.b);

      // Animating the circle's movement
      circle1.x += (mouseX - circle1.x) * circle1.speed * circle1.acceleration;
      circle1.y += (mouseY - circle1.y) * circle1.speed * circle1.acceleration;


      ellipse(circle1.x, circle1.y, 100, 100);
















  // Circle 2
      // Animating the color of the circle based on mouse's position
      circleFill.r = map(mouseY, windowHeight, 0, 200, 255);
      circleFill.g = 172;
      circleFill.b = map(mouseY, windowHeight, 0, 150, 255);
      fill(circleFill.r, circleFill.g, circleFill.b);

      // Animating the circle's movement
      circle2.x += (mouseX - circle2.x) * circle2.speed * circle2.acceleration;
      circle2.y += (mouseY - circle2.y) * circle2.speed * circle2.acceleration;

      ellipse(circle2.x, circle2.y, 100, 100);








  // Circle 3
      // Animating the color of the circle based on mouse's position
      circleFill.r = 172;
      circleFill.g = map(mouseX, 0, windowWidth, 150, 255);
      circleFill.b = map(mouseY, windowHeight, 0, 200, 255);
      fill(circleFill.r, circleFill.g, circleFill.b);

      ellipse(700,100,100,100);





}
