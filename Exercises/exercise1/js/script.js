/**************************************************
Exercise 1: I like to move it move it!
Sharon Ku

Here is a description of this template p5 project.
**************************************************/



let circleFill = {
  r:172,
  g:172,
  b:172,
}


// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth,windowHeight);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  //Circle 1
      //Animating the color of the circle based on mouse's position
      circleFill.r = map(mouseX, 0, windowWidth, 150, 255);
      circleFill.g = map(mouseX, 0, windowWidth, 200, 255);
      circleFill.b = 172;
      fill(circleFill.r, circleFill.g, circleFill.b);

      ellipse(100,100,100,100);

  //Circle 2
      //Animating the color of the circle based on mouse's position
      circleFill.r = map(mouseY, windowHeight, 0, 200, 255);
      circleFill.g = 172;
      circleFill.b = map(mouseY, windowHeight, 0, 150, 255);
      fill(circleFill.r, circleFill.g, circleFill.b);

      ellipse(500,500,100,100);


  //Circle 3
      //Animating the color of the circle based on mouse's position
      circleFill.r = 172;
      circleFill.g = map(mouseX, 0, windowWidth, 150, 255);
      circleFill.b = map(mouseY, windowHeight, 0, 200, 255);
      fill(circleFill.r, circleFill.g, circleFill.b);

      ellipse(700,100,100,100);





}
