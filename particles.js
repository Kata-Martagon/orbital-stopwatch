

var c = document.getElementById("physics");
var ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

var particles = [];
var origins = [];
var fixedMasses = [];

function loop() {
  change();
}

function particle(mass, position, velocity, acceleration) {
  this.mass = mass;
  this.position = position;
  this.velocity = velocity;
  this.acceleration = acceleration;
}

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
}

function origin(mass, position) {
  this.mass = mass;
  this.position = position;
}

function fixedMass(mass, position) {
  this.mass = mass;
  this.position = position;
}

function render(particles, origins, fixedMasses) {
  drawParticles();
  drawOrigins();
  drawFixedMasses();
}

function drawParticles() {
  particles.forEach(function (particle) {
    ctx.fillStyle = 'rgb(122,214,245)';
    ctx.beginPath();
    ctx.fillRect(particle.position.x,particle.position.y,1,1);
    ctx.stroke();
  });
}

function drawOrigins() {
  origins.forEach(function (particle) {
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(particle.position.x,particle.position.y,1,0,2*Math.PI);
    ctx.fill();
  });
}

function drawFixedMasses() {
  fixedMasses.forEach(function (particle) {
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(particle.position.x,particle.position.y,1,0,2*Math.PI);
    ctx.fill();
  });
}

//CREATE OBJECTS - REDUCE DOWN TO FOREACH OR SOMETHING

for (var i = 0; i < 10; i++) {
  var mass = 1;
  var position = new Vector(i * 1, i * 2);
  var velocity = new Vector(i * 1, i * 2);
  var acceleration = new Vector(i * 1, i * 2);
  var tempParticle = new particle(mass, position, velocity, acceleration);
  particles.push(tempParticle);
}

for (var i = 0; i < 1; i++) {
  var mass = 1;
  var position = new Vector(50, 50);
  var tempOrigin = new origin(mass, position);
  origins.push(tempOrigin);
}

for (var i = 0; i < 1; i++) {
  var mass = 1;
  var position = new Vector(100, 100)
  var tempFixedMass = new origin(mass, position);
  fixedMasses.push(tempFixedMass);
}

////////////////////////////////////

drawParticles();
drawOrigins();
drawFixedMasses();

var move = new Vector(50,50)

function moveParticle() {
  particle.position.x += move.x;
  particle.position.y += move.y;
}

moveParticle();

var wait = setTimeout(repeat,1000)

function repeat() {
  drawParticles();
  drawOrigins();
  drawFixedMasses();
}


//
// var mass = 1;
// var position = new Vector(1,2);
// var velocity = new Vector(10,11);
// var acceleration = new Vector(20,21);
// var posChange = new Vector(3,3);
//
// var fmMass = 1;
// var fmPosition = new Vector(10,52);
//
// var particle1 = new particle(mass, position, velocity, acceleration);
// var mass1 = new fixedMass(fmMass, fmPosition);
//
// particle1.position.add(posChange)
//
// console.log(particle1.position);
// console.log(mass1.position);
