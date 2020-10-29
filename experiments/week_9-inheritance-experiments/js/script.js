/**************************************************
Template p5 project
Pippin Barr

Here is a description of this template p5 project.
**************************************************/

"use strict";

let cars = [];
let numCars = 10;

let motorcycles = [];
let numMotorcycles = 10;

// setup()
//
// Description of setup() goes here.
function setup() {
  createCanvas(600,600);

  for (let i = 0; i < numCars; i++) {
    let x = random(0,width);
    let y = random(0,height);
    let car = new Car(x,y); // temporary variable to store car in
    cars.push(car);
  }

  for (let i = 0; i < numMotorcycles; i++) {
    let x = random(0,width);
    let y = random(0,height);
    let motorcycle = new Motorcycle(x,y); // temporary variable to store motorcycle in
    motorcycles.push(motorcycle);
  }
}

// draw()
//
// Description of draw() goes here.
function draw() {
  background(0);
  for (let i=0; i<cars.length; i++) {
    let car = cars[i]; // give me the car at the current position and store it in car
    car.move();
    car.wrap();
    car.display();
  }

  for (let i=0; i<motorcycles.length; i++) {
    let motorcycle = motorcycles[i]; // give me the motorcycle at the current position and store it in motorcycle
    motorcycle.move();
    motorcycle.wrap();
    motorcycle.display();
  }
}
