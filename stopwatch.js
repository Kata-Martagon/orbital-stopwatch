

var increment = 0;
var startTime = new Date()
var paused = 0

function run() {
  if (paused === 0) {
    var currentDate = new Date();
    increment = currentDate - startTime;
    console.log(increment)
  }
  return increment;
};

function start() {
  startTime = new Date();
  paused = 0;
  var intervalLoop = setInterval(run,10);
};

function pause() {
  paused = 1;
}

function reset(){
  increment = 0;
}

document.getElementById("start").addEventListener("click", function() {
  start();
});

document.getElementById("reset").addEventListener("click", function() {
  reset();
});

document.getElementById("pause").addEventListener("click", function() {
  pause();
});
