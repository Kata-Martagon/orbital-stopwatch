

var increment = 0;

function run() {
  increment++;
  return increment;
};

function start() {
  return run();
};

function reset(){
  increment = 0;
  // return increment;
}

document.getElementById("start").addEventListener("click", function() {
  start();
});
