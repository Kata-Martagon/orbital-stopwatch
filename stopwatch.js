

var increment = 0;
var startTime = new Date();
var paused = 0;
var hours = 0;
var minutes = 0;
var seconds = 0;
var hundredths = 0;


function run() {
var currentDate = new Date();
  if (paused === 0) {
    var currentDate = new Date();
    increment = currentDate - startTime;
    //console.log(increment)
    hundredths = Math.floor(increment % 1000/10);
    seconds = Math.floor(increment / 1000) % 60;
    minutes = Math.floor(increment / 60000) % 60;
    hours = Math.floor(increment / 3600000);
    console.log(hours + ':' + minutes + ':' + seconds + ':' + hundredths)
  }
  else {
    startTime = currentDate - increment;
  }
  return increment;
};

function start() {
  if (paused !== 1) {
    var startTime = new Date();
  }
  paused = 0;
  var intervalLoop = setInterval(run,10);
};

function pause() {
  paused = 1;
}

function reset(){
  increment = 0;
  paused = 1;
  hundredths = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  console.log(hours + ':' + minutes + ':' + seconds + ':' + hundredths);
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
