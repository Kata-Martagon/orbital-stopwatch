
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
  var actual = start();
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
  var expected = start() - 1;
  assert.equal(actual, expected, '');
});
