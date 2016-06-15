

// stopwatch looks //

var c = document.getElementById("stopwatch");
var ctx = c.getContext('2d');
ctx.font = "30px Arial";
ctx.fillStyle = "yellow";

function displayWatch() {
  ctx.clearRect(0, 0, c.width, c.height);
ctx.fillText(objTime.time, 10, 50);
}













//stopwatch functionality//

var increment = 0;
var startTime = new Date();
var paused = 0;

var objTime = {
 hours: 0,
 minutes: 0,
 seconds: 0,
 hundredths: 0,
 time: "",
 updateDisplay: function(millisec) {
   this.hundredths = Math.floor(millisec % 1000/10);
   this.seconds = Math.floor(millisec / 1000) % 60;
   this.minutes = Math.floor(millisec / 60000) % 60;
   this.hours = Math.floor(millisec / 3600000);
   this.time = this.hours + ':' + this.minutes + ':' + this.seconds + ':' + this.hundredths;
},
resetTime: function(value){
  this.updateDisplay(value);
}
};

///////////////////

function run() {
  var currentDate = new Date();
    if (paused === 0) {
      increment = currentDate - startTime;
      objTime.updateDisplay(increment);
      displayWatch();
    }
    else {
      startTime = currentDate - increment;
    }
  return increment;
}

//////////////////////

function start() {
  if (paused !== 1) {
    var startTime = new Date();
  }
  paused = 0;
  var intervalLoop = setInterval(run,10);
}

///////////////////

function pause() {
  paused = 1;
}

///////////////////

function reset(){
  increment = 0;
  paused = 1;
  objTime.resetTime(0);
  objTime.updateDisplay(0);
  displayWatch();
}

///////////////////

document.getElementById("start").addEventListener("click", function() {
  start();
});

document.getElementById("reset").addEventListener("click", function() {
  reset();
});

document.getElementById("pause").addEventListener("click", function() {
  pause();
});
