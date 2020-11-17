/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

let frog;
let frogAnimation = {
  idle: undefined,
  walking: undefined,
  slapping: undefined,
};

function preload() {
  // loads all the image files
  frogAnimation.walking = loadAnimation('assets/images/frog/frog-0.png', 'assets/images/frog/frog-1.png');
}

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(800,600);


  frog = createSprite(width/2,height/2);

  frogAnimation.walking.frameDelay = 50;
  frog.addAnimation('walking', frogAnimation.walking);

  frogAnimation.slapping.frameDelay = 50;
  frog.addAnimation('slapping', 'assets/images/frog/frogSlap1.png', 'assets/images/frog/frogSlap2.png', 'assets/images/frog/frogSlap1.png', 'assets/images/frog/frogSlap3.png');

}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(200);

  frog.position.x = mouseX;
  frog.position.y = mouseY;

  drawSprites();
}
