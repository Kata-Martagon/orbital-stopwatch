

var c = document.getElementById("physics");
var ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

var particles = [];
var origins = [];
var fixedMasses = [];
var midX = c.width / 2;
var midY = c.height / 2;
var totalParticles = 0

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

// Vector.prototype.distance = function(fixedMass) {
//   this.x = this.x - fixedMass.x;
//   this.y = this.y - fixedMass.y;
// }

function origin(mass, position) {
  this.mass = mass;
  this.position = position;
}

function fixedMass(mass, position) {
  this.mass = mass;
  this.position = position;
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
    ctx.fillStyle = '#FF9999';
    ctx.beginPath();
    ctx.arc(midX,midY,1,0,2*Math.PI);
    ctx.fill();
  });
}

function drawFixedMasses() {
  fixedMasses.forEach(function (particle) {
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(midX, midY,1,0,2*Math.PI);
    ctx.fill();
  });
}

//CREATE OBJECTS - REDUCE DOWN TO FOREACH OR SOMETHING
function newParticle() {
  var mass = 500;
  var position = new Vector(midX + i, midY - 100);
  var velocity = new Vector(1.5, Math.random() * (0.5 - (-0.5)) + (-0.5));
  var acceleration = new Vector(0, 0);
  var tempParticle = new particle(mass, position, velocity, acceleration);
  particles.push(tempParticle);
};

for (var i = 0; i < 1; i++) {
  var mass = 1;
  var position = new Vector(50, 50);
  var tempOrigin = new origin(mass, position);
  origins.push(tempOrigin);
}

for (var i = 0; i < 1; i++) {
  var mass = 10000000000;
  var position = new Vector(midX, midY)
  var tempFixedMass = new origin(mass, position);
  fixedMasses.push(tempFixedMass);
}

////////////////////////////////////

function runParticles(particles,fixedMasses) {
  particles.forEach(function(particle) {
    calculateChangeOfPosition(particle,fixedMasses);
  })
}

//Calculate Particle Move Necessary

function calculateChangeOfPosition(particle, fixedMasses) {
  calculateVelocity(particle, fixedMasses);
  particle.position.x += particle.velocity.x;
  particle.position.y += particle.velocity.y;
  // console.log(particle.position);
}

function calculateVelocity(particle, fixedMasses) {

  fixedMasses.forEach(function(fixedMass) {
    var distance = new Vector(0, 0);
    distance.x += (particle.position.x - fixedMass.position.x);
    distance.y += (particle.position.y - fixedMass.position.y);
    var magnitude = Math.sqrt(Math.pow(distance.x, 2) + Math.pow(distance.y, 2));
    var ratio = new Vector (distance.x / (Math.abs(distance.x) + Math.abs(distance.y)), distance.y / (Math.abs(distance.x) + Math.abs(distance.y)));
    var gravAccel = 6.674 * Math.pow(10, -11) * particle.mass * fixedMass.mass / Math.pow(magnitude, 2);
    var ratioAccel = new Vector (ratio.x * gravAccel, ratio.y * gravAccel);

    //console.log(magnitude);
    // console.log(ratio);
    // console.log(gravAccel);
    // console.log(ratioAccel);

    particle.velocity.x -= ratioAccel.x;
    particle.velocity.y -= ratioAccel.y;

    // console.log(particle.velocity);
  })
}

function clear() {
  ctx.clearRect(0, 0, c.width, c.height);
}

function render() {
  var nowDate = new Date();
  var milliNow = nowDate.getMilliseconds();
  if (Math.round(milliNow / 1) !== Math.round(secondsPrev / 1)) {
    secondsPrev = milliNow;
    if (totalParticles < 20000) {
      newParticle();
      totalParticles++
    }
    else {console.log("full")}
  }
  drawParticles();
  drawOrigins();
  drawFixedMasses();
  runParticles(particles, fixedMasses);
}

function queue() {
  window.requestAnimationFrame(run);
}

function run() {
  clear();
  render();
  queue();
};

var currentdate = new Date();
var secondsPrev = currentdate.getMilliseconds();

run();






//
// drawParticles();
// drawOrigins();
// drawFixedMasses();
//
// var move = new Vector(50,50)
// calculateChangeOfPosition(particles[1], fixedMasses)
//
// var wait = setTimeout(repeat,1000)
//
// function repeat() {
//   drawParticles();
//   drawOrigins();
//   drawFixedMasses();
// }


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
