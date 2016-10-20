

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
  var velocity = new Vector(1.45, 0);
  var colour = 'rgb(122,214,245)';
  var scale = 1;
  var spread = Math.PI / 10;
  var tempOrigin = new origin(mass, position, velocity, colour, scale, spread);
  origins.push(tempOrigin);

// Tenth origin
  var mass = 850;
  var position = new Vector(midX, midY - 200);
  var velocity = new Vector(1.49, 0);
  var colour = 'rgb(120,238,120)';
  var scale = 1.5;
  var spread = Math.PI / 10;
  var tempOrigin = new origin(mass, position, velocity, colour, scale, spread);
  origins.push(tempOrigin);

// Second origin
  var mass = 800;
  var position = new Vector(midX, midY - 150);
  var velocity = new Vector(1.68, 0);
  var colour = 'rgb(249,230,6)';
  var scale = 2;
  var spread = Math.PI / 10;
  var tempOrigin = new origin(mass, position, velocity, colour, scale, spread);
  origins.push(tempOrigin);

// Minute Origin
  var mass = 1200;
  var position = new Vector(midX, midY - 100);
  var velocity = new Vector(2.5, 0);
  var colour = 'rgb(97,12,232)';
  var scale = 2.5;
  var spread = Math.PI / 10;
  var tempOrigin = new origin(mass, position, velocity, colour, scale, spread);
  origins.push(tempOrigin);
}

// Create Masses

  var mass = 10000000000;
  var position = new Vector(midX, midY)
  var tempFixedMass = new fixedMass(mass, position);
  fixedMasses.push(tempFixedMass);



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

function origin(mass, position, velocity, colour, scale, spread) {
  this.mass = mass;
  this.position = position;
  this.velocity = velocity;
  this.colour = colour;
  this.scale = scale;
  this.spread = spread;
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
  fixedMasses.forEach(function (fixedMass) {
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(fixedMass.position.x, fixedMass.position.y,1,0,2*Math.PI);
    ctx.fill();
  });
}

function createSpread(velocity, spread) {
  var magnitude = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2));
  var angle = Math.atan(velocity.y / velocity.x);
  if (velocity.x < 0) {
    angle += Math.PI;
  }
  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  var newAngle = (angle + (plusOrMinus * (Math.random() * spread) / 2));
  var newVelocity = new Vector(magnitude * Math.cos(newAngle), magnitude * Math.sin(newAngle));
  return newVelocity;
}

//CREATE OBJECTS - REDUCE DOWN TO FOREACH OR SOMETHING
function newParticle(origin) {
  var velocity = createSpread(origin.velocity, origin.spread);
  // var ySpread = Math.pow( -1, Math.ceil(Math.random() * 2)) * (magnitude * (Math.random() * origin.spread) / (2 * Math.PI))
  // var xSpread = Math.pow( -1, Math.ceil(Math.random() * 2)) * Math.sqrt(Math.pow(magnitude, 2) - Math.pow(ySpread, 2));
  var spread = origin.spread;
  var mass = origin.mass;
  var position = new Vector(origin.position.x, origin.position.y);
  var velocity = new Vector(velocity.x, velocity.y);
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

function setup() {
  var nowDate = new Date();
  var milliNow = nowDate.getMilliseconds();
  var tenthNow = nowDate.getMilliseconds();
  var secNow = nowDate.getSeconds();
  var minNow = nowDate.getMinutes();
  if ((Math.floor(milliNow / 10) !== Math.floor(milliPrev / 10)) && particleCount < 5000) {
    if (pause === 0) {
      newParticle(origins[0]);
      milliPrev = milliNow;
      particleCount++;
    }
  }
  if (Math.floor(tenthNow / 100) !== Math.floor(tenthPrev / 100)) {
    if (pause === 0) {
      newParticle(origins[1]);
      tenthPrev = tenthNow;
    }
  }
  if (Math.floor(secNow) !== Math.floor(secPrev)) {
    if (pause === 0) {
      newParticle(origins[2]);
      secPrev = secNow;
      minCount = ((minCount + 1) % 61);
    }
  }
  if (minCount === 1){
    if (pause === 0) {
      newParticle(origins[3]);
      minCount++
    }
  }
};

function render() {
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
  setup();
  render();
  queue();
};

var currentdate = new Date();
var milliPrev = currentdate.getMilliseconds();
var tenthPrev = currentdate.getMilliseconds();
var secPrev = currentdate.getSeconds();
var minCount = 2;
var particleCount = 0;

var pause = 0;

run();

document.body.addEventListener('click', function() {
  if (pause === 0) {
    pause = 1
  }
  else {pause = 0}
});
