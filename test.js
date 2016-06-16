
///test begining of function///

test( 'if it hasnt started working it will display 0 for all the values', function(assert) {
  var actual = increment;
  var expected = 0;
  assert.equal(actual, expected, 'returned 0' );
});

// test( 'if the function has cycled once, it will return 1 the next time', function(assert) {
//   var actual = run() > 0;
//   assert.ok(actual, 'returned 1' );
// });

// test( 'start calls the run function', function(assert) {
//   start();
//   var actual = increment;
//   var expected = run() - 1;
//   assert.equal(actual, expected, 'start called run function');
// });

///test Reset ///

test( 'Reset resets run to 0', function(assert) {
  reset();
  var actual = increment;
  var expected = 0;
  assert.equal(actual, expected, 'reset, reset to 0');
});

test( 'reset button called reset with a click', function(assert) {
  document.getElementById("reset").click();
  var actual = increment;
  var expected = 0;
  assert.equal(actual, expected, 'reset button works');
});

//
// test( 'start button called start with a click', function(assert) {
//   document.getElementById("start").click();
//   var actual = increment > 0;
//   assert.ok(actual, 'start button works');
// });

///start is different than increment///

test( 'function setTimeout is called after other tests', function(assert) {
var dummy = true;

  document.getElementById("start").click();
  var timeOut = setTimeout(testCont, 100);

  function testCont() {
    test( 'Start runs continously', function(assert) {
      console.log(increment);
      var actual = increment > 5;
      assert.ok(actual, 'start runs');
    });
  };

  assert.ok(dummy, 'called after other tests');
});

reset();

////testing pause/////

test( 'function setTimeout is called after other tests', function(assert) {
var dummy = true;
start();

var timeOut1 = setTimeout(runTest, 50);

function runTest() {

  document.getElementById("pause").click();
  var expected = increment;
  var timeOut = setTimeout(testPause, 100);

  function testPause () {
    test( 'pause button stops it from incrementing', function(assert) {
      var actual = increment;
      assert.equal(actual, expected, 'actual is the same as expected, meaning it stopped');
    });
  };

}

assert.ok(dummy, 'called after other tests');
});

//////display time///////

test( 'if running displays as time - hours, minutes, seconds, milliseconds', function(assert) {
  var actual = increment;
  var expected = 0;
  assert.equal(actual, expected, 'returned 0' );
});
