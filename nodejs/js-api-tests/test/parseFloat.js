var assert = require("assert");

describe("parseFloat()", function() {
  it("parse some invalid", function() {
    assert.equal(isNaN(parseFloat("")), true);
    assert.equal(isNaN(parseFloat("1")), false);
    assert.equal(parseFloat("1"), 1);
    assert.equal(isNaN(parseFloat("a")), true);
  });
});
