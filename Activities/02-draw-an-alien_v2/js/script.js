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

/**
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

**/

/***
Unused colours
  fill(202, 128, 202); //french mauve
  rect(180,0,30,30);
  fill(11, 128, 202); //green blue crayola
  rect(210,0,30,30);
***/



  // Drawing stars (starting from left to right)
  fill(255, 217, 218); //light pink
  noStroke();
  ellipse(100,100,10,10); //ell 1
  fill(242, 224, 90); //minion yellow
  ellipse(200,250,10,10); //ell 2
  fill(104, 237, 198); //aquamarine
  ellipse(300,50,10,10);  //ell 3
  fill(144, 243, 255); //electric blue
  ellipse(400,200,10,10); //ell 4
  fill(255, 217, 218); //light pink
  ellipse(500,100,10,10); //ell 5
  fill(242, 224, 90); //minion yellow
  ellipse(600,200,10,10); //ell 6
  fill(104, 237, 198); //aquamarine
  ellipse(800,200,10,10); //ell 7
  fill(144, 243, 255); //electric blue
  ellipse(850,300,10,10); //ell 8
  fill(255, 217, 218); //light pink
  ellipse(920,50,10,10); //ell 9


  // Drawing the moon
    //Filled part of moon
      fill(255, 217, 218); //pale pink
      ellipse(780,150,170);
    //Dark side of the moon
      fill(144, 190, 222); //pale cerulean/blue
      ellipse(730,125,170);

  // Drawing the hills --> see next attempt
/**

    //Hill 1
      strokeWeight(10);
      stroke(8, 65, 928);
      point(0,420);
      point(330,500);
      point(600,800);
      strokeWeight(1);

      stroke(8, 65, 928);
      fill(144, 190, 222);
      //noFill();
      beginShape();
      curveVertex(0,420);
      curveVertex(0,420);
      curveVertex(330,500);
      curveVertex(600,800);
    //  curveVertex(600,800);
      curveVertex(0,420);
      curveVertex(0,420);
      endShape(CLOSE);


//Drew a simple hump
    strokeWeight(10);
    stroke(8, 65, 928);
    fill(255, 217, 218);
    beginShape();
    curveVertex(0, 500);
    curveVertex(100, 100);
    curveVertex(200, 100)
    curveVertex(300, 500);
    endShape();
**/

//Drawing the hills - second attempt
    //Hill 1
    noStroke();
    fill(144, 243, 255);
    ellipse(150,920,1000,1000);









  // Drawing the little alien
    //body
    noStroke();
    fill(169, 224, 0);
    rect(220,360,150,190,20);

    //left ear
    fill(169, 224, 0);
    rect(220,300,50,90,20);

    //left foot
    fill(169, 224, 0);
    rect(220,500,50,90,20);

    //right foot
    fill(169, 224, 0);
    rect(320,500,50,90,20);

    //left eye (opened)
    fill(0);
    ellipse(270,420,20)

    //right eye (closed)
    stroke(0);
    strokeWeight(7);
    line(340,420,320,420);

    //tongue
    fill(255, 217, 218);
    noStroke();
    rect(300,455,20,20,0,0,20,20);

    //mouth line
    stroke(0);
    strokeWeight(7);
    line(280,455,330,455);
}

// draw()
//
// This is not used in the project.
function draw() {

}
