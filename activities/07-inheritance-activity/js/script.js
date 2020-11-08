/**************************************************
Activity 7: Inheritance activity
Sharon Ku

Let’s making a road-crossing simulator!

The user will control a circular pedestrian at the bottom of the canvas. Cars, trucks, and motorcycles will be moving left and right across the canvas. If the pedestrian collides with any of the vehicles, they die. If they make it to the other side, they succeeded. Just like life!
**************************************************/

// possible states: title, simulation, success, failure
let state = `simulation`;


let pedestrian;


let vehicles = [];
let numCars = 10;
let numMotorcycles = 5;
let numTrucks = 10;

let string;

let titleText = `welcome`;
let successText = `BINGO!`;
let failureText = `boo`;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(windowWidth, windowHeight);

  // create a Pedestrian
  let x = width/2;
  let y = height;
  pedestrian = new Pedestrian(x,y);

  // create my cars and push to vehicles

  for (let i = 0; i<numCars; i++) {
    let x= random(0,width);
    let y = random(0,height);
    let car = new Car(x,y);
    vehicles.push(car);
  }

  // create my motorcycles and push to vehicles

  for (let i=0; i<numMotorcycles; i++) {
    let x=random(0,width);
    let y = random(0,height);
    let motorcycle = new Motorcycle(x,y);
    vehicles.push(motorcycle);
  }


  // create my trucks and push into vehicles
  for (let i=0; i<numTrucks; i++) {
    let x= random(0,width);
    let y=random(0,height);
    let truck = new Truck(x,y);
    vehicles.push(truck);
  }

  // set random directions
  for (let i=0; i<vehicles.length; i++) {
    let vehicle = vehicles[i];
    let r=random(0,1);
    if (r<0.5) {
      vehicle.vx = -vehicle.speed;
    }
    else {
      vehicle.vx = vehicle.speed;
    }
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);

  if (state ===`title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
  else if (state === `success`) {
    success();
  }
  else if (state === `failure`) {
    failure();
  }
}

// title state
function title() {
  displayText(titleText);
}

// display text in center of screen
function displayText(string) {
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(string,width/2,height/2);
  pop();
}


function keyPressed() {
  // if a key is pressed, switch state to simulation
  if (state === `title`) {
    state = `simulation`;
  }

  if (state === `simulation`) {

  }

}

// simulation state
function simulation() {
  pedestrian.handleInput();
  pedestrian.move();
  pedestrian.display();


  for (let i=0; i<vehicles.length; i++) {
    let vehicle = vehicles[i];
    vehicle.move();
    vehicle.wrap();
    vehicle.display();
    
    pedestrian.checkHit(vehicle);
  }

  if (!pedestrian.alive) {
    state = `failure`;
  }

  if (pedestrian.y < 0) {
    state = `success`;
  }

}

// success state
function success() {
  push();
    background(255,100,255);
  displayText(successText);

  pop();
}

// failure state
function failure() {
  displayText(failureText);
}
