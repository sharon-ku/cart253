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
/***
Unused colours
  fill(202, 128, 202); //french mauve
  rect(180,0,30,30);
  fill(11, 128, 202); //green blue crayola
  rect(210,0,30,30);
***/



  // Drawing stars (starting from left to right)
  fill(255, 217, 218);
  noStroke();
  ellipse(100,100,10,10); //ell 1
  ellipse(200,250,10,10); //ell 2
  ellipse(300,50,10,10);  //ell 3
  ellipse(400,200,10,10); //ell 4
  ellipse(500,100,10,10); //ell 5
  ellipse(600,200,10,10); //ell 6
  ellipse(700,100,10,10); //ell 7
  ellipse(800,200,10,10); //ell 8
  ellipse(900,100,10,10); //ell 9

  // Drawing the moon
    //Filled part of moon
      fill(255, 217, 218); //pale pink
      ellipse(800,150,170);
    //Dark side of the moon
      fill(144, 190, 222); //pale cerulean/blue
      ellipse(750,125,170);

  // Drawing the hills
    //Hill 1
      strokeWeight(10);
      stroke(8, 65, 928);
      point(0,420);
      point(330,500);
      point(600,800);
      strokeWeight(1);

      stroke(8, 65, 928);
      //noFill();
      beginShape();
      curveVertex(0,420);
      curveVertex(0,420);
      curveVertex(330,500);
      curveVertex(600,800);
      curveVertex(600,800);
      endShape();














  // Drawing the little alien
    //body
    noStroke();
    fill(169, 224, 0);
    rect(250,360,150,190,20);

    //left ear
    fill(169, 224, 0);
    rect(250,300,50,90,20);

    //left foot
    fill(169, 224, 0);
    rect(250,500,50,90,20);

    //right foot
    fill(169, 224, 0);
    rect(350,500,50,90,20);

    //left eye (opened)
    fill(0);
    ellipse(300,420,20)

    //right eye (closed)
    stroke(0);
    strokeWeight(7);
    line(370,420,350,420);

    //tongue
    fill(255, 217, 218);
    noStroke();
    rect(320,455,20,20,0,0,20,20);

    //mouth line
    stroke(0);
    strokeWeight(7);
    line(310,455,350,455);
}

// draw()
//
// This is not used in the project.
function draw() {

}
