
test( 'if it hasnt started working it will display 0 for all the values', function(assert) {
  var actual = increment;
  var expected = 0;
  assert.equal(actual, expected, 'returned 0' );
});

test( 'if the function has cycled once, it will return 1 the next time', function(assert) {
  var actual = run();
  var expected = 1;
  assert.equal(actual, expected, 'returned 1' );
});

test( 'start calls the run function', function(assert) {
  var actual = increment;
  var expected = run() - 1;
  assert.equal(actual, expected, 'start called run function');
});

test( 'Reset resets run to 0', function(assert) {
  reset();
  var actual = increment;
  var expected = 0;
  assert.equal(actual, expected, 'reset, reset to 0');
});

test( 'start button called start with a click', function(assert) {
  document.getElementById("start").click();
  var actual = increment;
  var expected = run() - 1;
  assert.equal(actual, expected, 'start button works');
});

test( 'reset button called reset with a click', function(assert) {
  document.getElementById("reset").click();
  var actual = increment;
  var expected = 0;
  assert.equal(actual, expected, 'reset button works');
});



test( 'function setTimeout is called after other tests', function(assert) {
  actual = increment === 0;

  document.getElementById("start").click();
  var timeOut = setTimeout(testCont, 2000);

  function testCont() {
    test( 'Start runs continously', function(assert) {
      console.log(increment);
      var actual = increment > 5;
      assert.ok(actual, 'start runs');
    });
  };

  assert.ok(actual, 'called after other tests');
});
