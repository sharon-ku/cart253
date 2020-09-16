/**************************************************
Activity 2: Draw an alien
Sharon Ku

Drawing a friendly alien whose name is Bobby.
**************************************************/

// setup()
//
// Drawing the alien.
function setup() {

// Setting up the canvas & coloring the background
createCanvas(640,480);
background(247, 198, 239);

// Drawing the body
noStroke();
fill(191, 191, 191);
ellipse(320,300,200,200);

// Drawing the head
fill(128, 128, 128);
ellipse(320,150,150,200);

// Drawing the eyes
fill(0);
ellipse(245,130,60,90); //leftie
ellipse(395,130,60,90); //rightie

// Drawing the nostrils
ellipse(310,170,5,5); //leftie
ellipse(330,170,5,5); //rightie

// Drawing the mouth
stroke(252, 88, 88);
strokeWeight(2);
rectMode(CENTER);
rect(320,210,15,10);





}

// draw()
//
// Description of draw() goes here.
function draw() {

}
