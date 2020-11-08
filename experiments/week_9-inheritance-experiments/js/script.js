/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

"use strict";

let vehicles = [];
let numCars = 10;
let numMotorcycles = 10;
let numSportsCars = 3;

// Set up the canvas and our cars
function setup() {
  createCanvas(600, 600);



  // Create the correct number of cars and put them in our array
  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new Car(x, y);
    vehicles.push(car);
  }

  // Create the correct number of motorcycles and put them in our array
  for (let i = 0; i < numMotorcycles; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let motorcycle = new Motorcycle(x, y);
    vehicles.push(motorcycle);
  }


  for (let i=0; i<numSportsCars; i++) {
    let x = random(0,width);
    let y = random(0,height);
    let sportsCar = new SportsCar(x,y);
    vehicles.push(sportsCar);
  }

}

// Display and move the cars
function draw() {
  background(0);




  for (let i=0; i<vehicles.length; i++) {
    let vehicle = vehicles[i];
    vehicle.move();
    vehicle.wrap();
    vehicle.display();
  }
}
