/**************************************************
Activity 2: Drawing an alien (v2)
Sharon Ku

I drew the home of an alien, the one-eyed creature.
**************************************************/

// setup()
//
// Drawing a scene with an alien in it
function setup() {

  // Setting up a canvas
  createCanvas(1000,800);
  background(144, 190, 222);

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
  fill(169, 224, 0); //lime green
    rect(150,0,30,30);
//  fill(202, 128, 202); //french mauve
  //  rect(180,0,30,30);
//  fill(11, 128, 202); //green blue crayola
//    rect(210,0,30,30);




  // Drawing stars (starting from left to right)
  fill(255, 217, 218);
  noStroke();
  ellipse(100,100,10,10); //ell 1
  ellipse(200,250,10,10); //ell 2
  ellipse(300,50,10,10);  //ell 3
  ellipse(400,200,10,10); //ell 4
  ellipse(500,100,10,10);
  ellipse(600,200,10,10);
  ellipse(700,100,10,10);
  ellipse(800,200,10,10);
  ellipse(900,100,10,10);

  // Drawing the moon
    //Filled part of moon
      fill(255, 217, 218); //pale pink
      ellipse(800,150,170);
    //Dark side of the moon
      fill(144, 190, 222); //pale cerulean/blue
      ellipse(750,125,170);

  // Drawing the little alien
    //body
    fill(169, 224, 0);
    rect(300,360,150,190,20);

    //left ear
    fill(169, 224, 0);
    rect(300,300,50,90,20);

    //left foot
    fill(169, 224, 0);
    rect(300,500,50,90,20);

    //right foot
    fill(169, 224, 0);
    rect(400,500,50,90,20);

    //left eye (opened)
    fill(0);
    ellipse(350,420,20)

    //right eye (closed)
    stroke(0);
    strokeWeight(7);
    line(420,420,400,420);

    //tongue
    fill(255, 217, 218);
    noStroke();
    rect(370,455,20,20,0,0,20,20);

    //mouth line
    stroke(0);
    strokeWeight(7);
    line(360,455,400,455);
}

// draw()
//
// This is not used in the project.
function draw() {

}
