/**************************************************
Activity 4: Dodging COVID-19
Sharon Ku

COVID-19, represented by a red circle, will move from the left side of the canvas to the right at a random y position. Each time it reaches the right side, it will reset to the left at a random y position. The user will control their own circle with the mouse position. If the COVID-19 circle touches the user circle, everything stops! In the background we see random static for visual flair and we don’t see the mouse cursor.
**************************************************/

// User circle
let circle = {
  size: 100,
  R: 0,
  G: 255,
  B: 0,
  x: 0,
  y: 0,
};

// Covid circle
let covid = {
  size: 100,
  R: 255,
  G: 0,
  B: 0,
  x: 100,
  y: 100,
  vx: 1,
  // ax: 0,
  // acceleration: 0.0007,
};

let bg = {
  R: 0,
  G: 0,
  B: 0,
  infected: {
    R: 50,
    G: 50,
    B: 50,
  }
};

let covidReturns = false;
let infected = false;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(bg.R, bg.G, bg.B);

  // Animating covid circle ---------------------------------



  covid.x += covid.vx;
  // covid.vx += covid.ax;
  // covid.ax += covid.acceleration;

  push();
  fill(covid.R, covid.G, covid.B);
  ellipse(covid.x, covid.y, covid.size);
  pop();

  if(covid.x === windowWidth) {
    covidReturns = true;
  }

  if(covidReturns) {
    covid.x = 0;
    covid.y = random(0, windowHeight);
    covidReturns = false;
  }

  // console.log(covidReturns, covid.x);

  // Animating the user circle ---------------------------------
  circle.x = mouseX;
  circle.y = mouseY;
  ellipse(circle.x, circle.y, circle.size);

  if (covid.x === circle.x && covid.y === circle.y){
    infected = true;
  }

  if (infected === true){
    background(bg.infected.R, bg.infected.G, bg.infected.B);
  }

}
