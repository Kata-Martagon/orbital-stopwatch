

var increment = 0;

function run() {
  increment++;
  console.log(increment)
  return increment;
};

function start() {
  var test = setInterval(run,10);
};

function reset(){
  increment = 0;
}

document.getElementById("start").addEventListener("click", function() {
  start();
});

document.getElementById("reset").addEventListener("click", function() {
  reset();
});
