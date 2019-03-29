const assert = require('assert');

// example test for square root
// with example failure

describe('principle square root', function() {
  it('should give something positive that you can square to get the arg', function() {
    const ps4 = Math.sqrt(4);
    const ps1 = Math.sqrt(1);
    const ps0 = Math.sqrt(0);
    assert.equal(ps4 * ps4, 4);
    assert.equal(ps1 * ps1, 1);
    assert.equal(ps0 * ps0, 0);
    assert(ps4 > 0);
    assert(ps1 > 0);
    // we forgot that the rule will not apply here
    assert(ps0 > 0);
  });
});
