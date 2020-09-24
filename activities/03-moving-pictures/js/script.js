/**************************************************
Activity 3: Moving Pictures
Sharon Ku

Two circles, the left one bigger and more transparent than the right, come in from either side of the screen, growing as they do so. They stop in the centre while still growing. The background goes from black to red.
**************************************************/

//Setting up my variables
let bgColor = {
  red:0,
  green:0,
  blue:0,
  redChangeRate:0.5,
  redMin:0,
  redMax:255,
}

let bigCircle = {
  x: 0,
  y: 250,
  xSpeed: 1,
  xMin: 0,
  size: 200,
  sizeMin: 200, //same as intitial size
  growthRate: 1.002,
  fillR: 107,
  fillG: 255,
  fillB: 184,
  fillAlpha: 140,
}

let smallCircle = {
  x: 500,
  y: 250,
  xSpeed: -1,
  xMax: 500,
  size: 100,
  // sizeMin: 100, // same as initial size
  // growthRate: 1.004,
  relativeSize: 0.9,
  fillR: 252,
  fillG: 182,
  fillB: 219,
  fillAlpha: 200,
}


// setup()
//
//Setting up the canvas and removing strokes for all shapes
function setup() {

  createCanvas(500,500);
  noStroke();


}

// draw()
//
// Animating the background and 2 circles
function draw() {

  //Background changing from black to red
  // bgColor.red += bgColor.redChangeRate;
  bgColor.red = map(bigCircle.size, bigCircle.sizeMin, height, 0, bgColor.redMax);
  // bgColor.red = constrain(bgColor.red,bgColor.redMin,bgColor.redMax);
  background(bgColor.red,bgColor.green,bgColor.blue);

  console.log(bgColor.red);

  //Left circle moves to center, growing the whole time
    //Animating the circle's growth
    bigCircle.size *= bigCircle.growthRate;
    bigCircle.size = constrain(bigCircle.size, bigCircle.sizeMin, height); //limiting the circle's growth to size of canvas

    //Animating the circle's movement to the right
    bigCircle.x += bigCircle.xSpeed;
    bigCircle.x = constrain(bigCircle.x, bigCircle.xMin, width/2);

    fill(bigCircle.fillR, bigCircle.fillG, bigCircle.fillB, bigCircle.fillAlpha);
    ellipse(bigCircle.x, bigCircle.y, bigCircle.size);



  //Right circle moves to center, growing the whole time
    //Animating the right circle's growth
        /***My original code
        smallCircle.size *= smallCircle.growthRate;
        smallCircle.size = constrain(smallCircle.size, smallCircle.sizeMin, height); //limiting the circle's growth to size of canvas
        ***/

        //Revised code after reading how Pippin did it
        smallCircle.size = bigCircle.size * smallCircle.relativeSize;


    //Animating the circle's movement to the left
    smallCircle.x += smallCircle.xSpeed;
    smallCircle.x = constrain(smallCircle.x, width/2, smallCircle.xMax);

    fill(smallCircle.fillR, smallCircle.fillG, smallCircle.fillB, smallCircle.fillAlpha);
    ellipse(smallCircle.x, smallCircle.y, smallCircle.size);


}
