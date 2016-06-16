

var c = document.getElementById("physics");
var ctx = c.getContext("2d");

c.width = screen.width;
c.height = screen.height;

var particles = [];
var origins = [];
var fixedMasses = [];
var midX = c.width / 2;
var midY = c.height / 2;
var totalParticles = 0;

// Create Origins

setOrigins();

function setOrigins() {
// Hundredth origin
  var mass = 1000;
  var position = new Vector(midX, midY - 250);
  var velocity = new Vector(1.35, 0);
  var colour = 'rgb(122,214,245)';
  var scale = 1;
  var tempOrigin = new origin(mass, position, velocity, colour, scale);
  origins.push(tempOrigin);

// Tenth origin
  var mass1 = 850;
  var position1 = new Vector(midX, midY - 200);
  var velocity1 = new Vector(1.35, 0);
  var colour1 = 'rgb(124,252,0)';
  var scale1 = 2;
  var tempOrigin1 = new origin(mass1, position1, velocity1, colour1, scale1);
  origins.push(tempOrigin1);

// Second origin
  var mass1 = 800;
  var position1 = new Vector(midX, midY - 150);
  var velocity1 = new Vector(1.45, 0);
  var colour1 = 'rgb(249,230,6)';
  var scale1 = 3;
  var tempOrigin1 = new origin(mass1, position1, velocity1, colour1, scale1);
  origins.push(tempOrigin1);

// Minute Origin
  var mass2 = 1200;
  var position2 = new Vector(midX, midY - 100);
  var velocity2 = new Vector(2.2, 0);
  var colour2 = 'rgb(97,12,232)';
  var scale2 = 4;
  var tempOrigin2 = new origin(mass2, position2, velocity2, colour2, scale2);
  origins.push(tempOrigin2);
}

// Create Masses

for (var i = 0; i < 1; i++) {
  var mass = 10000000000;
  var position = new Vector(midX, midY)
  var tempFixedMass = new fixedMass(mass, position);
  fixedMasses.push(tempFixedMass);
}

function particle(mass, position, velocity, acceleration, colour, scale) {
  this.mass = mass;
  this.position = position;
  this.velocity = velocity;
  this.acceleration = acceleration;
  this.colour = colour;
  this.scale = scale;
}

function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
}

function origin(mass, position, velocity, colour, scale) {
  this.mass = mass;
  this.position = position;
  this.velocity = velocity;
  this.colour = colour;
  this.scale = scale;
}

function fixedMass(mass, position) {
  this.mass = mass;
  this.position = position;
}

function drawParticles() {
  particles.forEach(function (particle) {
    ctx.fillStyle = particle.colour;
    ctx.beginPath();
    ctx.fillRect(particle.position.x,particle.position.y,particle.scale,particle.scale);
    ctx.stroke();
  });
}

function drawOrigins() {
  origins.forEach(function (origin) {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(origin.position.x,origin.position.y,1,0,2*Math.PI);
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
function newParticle(origin) {
  var mass = origin.mass;
  var position = new Vector(origin.position.x, origin.position.y);
  var velocity = new Vector(origin.velocity.x, origin.velocity.y + Math.random() * ((0.3) - (-0.3)) + (-0.3));
  var acceleration = new Vector(0, 0);
  var colour = origin.colour;
  var scale = origin.scale;
  var tempParticle = new particle(mass, position, velocity, acceleration, colour, scale);
  particles.push(tempParticle);
};


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
    var ratioAccel = new Vector(ratio.x * gravAccel, ratio.y * gravAccel);
    particle.velocity.x -= ratioAccel.x;
    particle.velocity.y -= ratioAccel.y;
  })
}

function clear() {
  ctx.clearRect(0, 0, c.width, c.height);
}

function render() {
  var nowDate = new Date();
  var milliNow = nowDate.getMilliseconds();
  var tenthNow = nowDate.getMilliseconds();
  var secNow = nowDate.getSeconds();
  var minNow = nowDate.getMinutes();
  if ((Math.floor(milliNow / 10) !== Math.floor(milliPrev / 10)) && particleCount < 7500) {
    newParticle(origins[0]);
    milliPrev = milliNow;
    particleCount++;
  }
  if (Math.floor(tenthNow / 100) !== Math.floor(tenthPrev / 100)) {
    newParticle(origins[1]);
    tenthPrev = tenthNow;
  }
  if (Math.floor(secNow) !== Math.floor(secPrev)) {
    newParticle(origins[2]);
    secPrev = secNow;
    minCount = ((minCount + 1) % 61);
  }
  if (minCount === 0){
    newParticle(origins[3]);
    minCount++
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
var milliPrev = currentdate.getMilliseconds();
var tenthPrev = currentdate.getMilliseconds();
var secPrev = currentdate.getSeconds();
var minCount = 1;
var particleCount = 0;
run();
