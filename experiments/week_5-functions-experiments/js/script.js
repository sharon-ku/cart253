/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/


// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(500, 500);

  let hotCelsius = toCelsius(100);
  console.log (`100 degress Fahrenheit is ${hotCelsius} degrees Celsius.`);

  let coldCelsius = toCelsius(10);
  console.log (`10 degrees Fahrenheit is ${coldCelsius} degrees Celsius.`);
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  let x = random(0,width);
  let y = random(0,height);

  let color = randomColor();
  fill(randomColor().r, randomColor().g, randomColor().b);
  ellipse(250,250,100,100);

}

function toCelsius(fahrenheit) {
  let celsius = (fahrenheit - 32) * 5/9;
  return celsius;
}


function parallels(x,y){
  for(let i=0; i<10; i++){
    noStroke();
    fill(255);
    rectMode(CENTER);
    rect(x,y,2,50);
    x += 5;
  }
}

function randomColor() {
  let result = {
    r: random(0,255),
    g: random(0,255),
    b: random(0,255),
  };
  return result;
}
