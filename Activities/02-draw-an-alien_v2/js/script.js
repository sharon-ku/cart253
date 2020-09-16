/**************************************************
Activity 2: Drawing an alien (v2)
Sharon Ku

I drew an alien, the one-eyed creature.
**************************************************/

// setup()
//
// Drawing an alien
function setup() {

  // Setting up a canvas
  createCanvas(1000,800);
  background(8, 65, 92);

  //Color palette
  noStroke();
  fill(8, 65, 92); //indigo dye
  fill(242, 224, 90); //minion yellow
    rect(0,0,30,30);
  fill(255, 217, 218); //pale pink
    rect(30,0,30,30);
  fill(144, 190, 222); //pale cerulean/blue
    rect(60,0,30,30);
  fill(104, 237, 198); //aquamarine
    rect(90,0,30,30);
  fill(144, 243, 255); //electric blue
    rect(120,0,30,30);
  fill(169, 224, 90); //inchworm/lime green
    rect(150,0,30,30);
  fill(202, 128, 202); //french mauve
    rect(180,0,30,30);
  fill(11, 128, 202); //green blue crayola
    rect(210,0,30,30);




  // Drawing stars (starting from left to right)
  fill(255, 217, 218);
  noStroke();
  ellipse(100,100,10,10);
  ellipse(200,200,10,10);
  ellipse(300,100,10,10);
  ellipse(400,200,10,10);
  ellipse(500,100,10,10);
  ellipse(600,200,10,10);
  ellipse(700,100,10,10);
  ellipse(800,200,10,10);
  ellipse(900,100,10,10);

  // Drawing the moon
  ellipse();





}

// draw()
//
// This is not used in the project.
function draw() {

}
