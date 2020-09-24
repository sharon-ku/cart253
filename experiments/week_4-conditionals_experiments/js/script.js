/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/


let caterpillar = {
  x: 100,
  y: 250,
  segmentSize: 50,
};


// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500,500);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
  noStroke();
  fill(100,200,100);

  let x = caterpillar.x;
  let numSegments = 5;
  // let segmentsDrawn = 0;

  // while (segmentsDrawn < numSegments){
  // ellipse(x,caterpillar.y,caterpillar.segmentSize);
  // x += 40;
  // segmentsDrawn += 1;
  // }

  for (let segmentsDrawn = 0; segmentsDrawn < numSegments; segmentsDrawn++){
    ellipse(x, caterpillar.y, caterpillar.segmentSize);
    x += 40;
  }

  console.log("caterpillar.x is"+caterpillar.x);

}
